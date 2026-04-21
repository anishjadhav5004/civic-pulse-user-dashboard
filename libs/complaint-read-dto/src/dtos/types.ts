export enum CrPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/** Embedded attachment — plain type, no validation decorators */
export class CrAttachment {
  uid: string;
  complaintUid: string;
  fileUrl: string;
  fileType: string | null;
  fileSizeKb: number | null;
  isThumbnail: boolean;
  displayOrder: number | null;
  uploadedAt: Date;
  isActive: boolean;
}

/** One entry in the complaint's status history */
export class CrStatusHistory {
  status: string;
  modifiedBy: string | null;
  remarks: string | null;
  assignedTo: string | null;
  assignedAt: Date | null;
  slaDeadline: Date | null;
  isEscalated: boolean;
  escalationLevel: number;
  createdAt: Date;
}
