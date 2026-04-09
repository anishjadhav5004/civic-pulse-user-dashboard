import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddComplaint } from '../commands/add-complaint.command';
import { Complaint } from '../../../postgress/entities/cc-complaint.entity';
import { ComplaintAddress } from '../../../postgress/entities/cc-complaint-address.entity';
import { ComplaintAttachment } from '../../../postgress/entities/cc-complaint-attachment.entity';
import { LocationService } from '../../../services/location.service';
import { IComplaintRepository } from '../../../postgress/repositories/complaint.repository';

@CommandHandler(AddComplaint)
export class CreateComplaintHandler implements ICommandHandler<AddComplaint> {
  constructor(
    private readonly locationService: LocationService,
    private readonly repository: IComplaintRepository,
  ) {}

  async execute(command: AddComplaint) {
    const complaint = command.complaint;

    const address: ComplaintAddress = new ComplaintAddress();

    // Fetch detailed address data using reverse geocoding
    const geocode = await this.locationService.reverseGeocode(
      complaint.address.latitude,
      complaint.address.longitude,
    );

    address.latitude = parseFloat(complaint.address.latitude);
    address.longitude = parseFloat(complaint.address.longitude);
    address.areaName = geocode.area_name;
    address.cityName = geocode.city_name;
    address.districtName = geocode.district_name;
    address.stateName = geocode.state_name;
    address.pincode = geocode.pincode;
    address.countryCode = geocode.country_code;

    const newComplaint: Complaint = new Complaint();

    newComplaint.complaintNumber = complaint.complaintNumber;
    newComplaint.complaintTitle = complaint.complaintTitle;
    newComplaint.visibility = complaint.visibility;
    newComplaint.createdAt = complaint.createdAt;
    newComplaint.priority = complaint.priority;
    newComplaint.description = complaint.description;
    newComplaint.reportedBy = complaint.reportedBy;
    const canEditUntilDate = new Date(complaint.createdAt);
    canEditUntilDate.setMinutes(canEditUntilDate.getMinutes() + 5);
    newComplaint.canEditUntil = canEditUntilDate;

    // 1. Save Address via the custom repository
    const savedAddress = await this.repository.saveAddress(address);

    // Link the saved address to the complaint
    newComplaint.addressUid = savedAddress.uid;

    // 2. Save Complaint via the custom repository
    const savedComplaint = await this.repository.saveComplaint(newComplaint);

    // 3. Save Attachments (Insta-style)
    if (complaint.attachments && complaint.attachments.length > 0) {
      const attachmentEntities = complaint.attachments.map((att, index) => {
        const attachment = new ComplaintAttachment();
        attachment.complaintUid = savedComplaint.uid;
        attachment.fileUrl = att.fileUrl;
        
        if (att.fileType !== undefined) attachment.fileType = att.fileType;
        if (att.fileSizeKb !== undefined) attachment.fileSizeKb = att.fileSizeKb;
        if (att.isThumbnail !== undefined) attachment.isThumbnail = att.isThumbnail;
        if (att.displayOrder !== undefined) attachment.displayOrder = att.displayOrder;
        
        return attachment;
      });

      await this.repository.saveAttachments(attachmentEntities);
    }

    return savedComplaint;
  }
}
