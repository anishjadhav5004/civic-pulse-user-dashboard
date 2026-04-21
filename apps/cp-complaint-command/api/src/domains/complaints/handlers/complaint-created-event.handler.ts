import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ComplaintCreatedEvent } from '../events/complaint-created.event';
import { CrComplaintDto, CrAttachment } from '@civic-pulse-user-dashboard/complaint-read';

@EventsHandler(ComplaintCreatedEvent)
export class ComplaintCreatedEventHandler implements IEventHandler<ComplaintCreatedEvent> {
  private readonly logger = new Logger(ComplaintCreatedEventHandler.name);

  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly rmqClient: ClientProxy,
  ) {}

  async handle(event: ComplaintCreatedEvent): Promise<void> {
    this.logger.log(`Dispatching ComplaintCreatedEvent to RabbitMQ for complaint ${event.complaint.uid}`);

    const { complaint, attachments, address } = event;

    // Map attachments to the lean CrAttachment shape
    const attachmentPayload: CrAttachment[] = (attachments ?? []).map((a) => ({
      uid: a.uid,
      complaintUid: a.complaintUid,
      fileUrl: a.fileUrl,
      fileType: a.fileType ?? null,
      fileSizeKb: a.fileSizeKb ?? null,
      isThumbnail: a.isThumbnail ?? false,
      displayOrder: a.displayOrder ?? null,
      uploadedAt: a.uploadedAt,
      isActive: a.isActive ?? true,
    }));

    // Build the lean denormalized payload — only what the read side needs
    const payload: CrComplaintDto = {
      uid: complaint.uid,
      complaintNumber: complaint.complaintNumber,
      complaintTitle: complaint.complaintTitle,
      description: complaint.description ?? null,
      category: complaint.category ?? null,
      status: 'pending',                          // initial status on creation
      visibility: complaint.visibility,
      priority: complaint.priority as any,
      canEditUntil: complaint.canEditUntil ?? null,
      reportedBy: complaint.reportedBy,
      username: null,                             // TODO: populate from user service
      // Location — from saved address if provided
      wardNumber: address?.wardNumber ?? null,
      city: address?.cityName ?? null,
      state: address?.stateName ?? null,
      pincode: address?.pincode ?? null,
      // Ward officials — not available at creation yet
      nagarsevakName: null,                       // TODO: populate from ward_dtl lookup
      wardAdmin: null,
      wardAdminUid: null,
      mayorName: null,
      createdAt: complaint.createdAt,
      history: [{
        status: 'pending',
        modifiedBy: complaint.reportedBy,
        remarks: 'Complaint created',
        assignedTo: null,
        assignedAt: null,
        slaDeadline: null,
        isEscalated: false,
        escalationLevel: 0,
        createdAt: complaint.createdAt,
      }],
      attachments: attachmentPayload,
    };

    // send() is request-response — waits for ack from the read service
    // Must subscribe to trigger execution (Observable is lazy)
    this.rmqClient
      .send('complaint_created', payload)
      .subscribe({
        next: (ack) => this.logger.log(`Read service acknowledged complaint "${payload.uid}": ${JSON.stringify(ack)}`),
        error: (err) => this.logger.error(`Read service failed to process complaint "${payload.uid}"`, err),
      });
  }
}
