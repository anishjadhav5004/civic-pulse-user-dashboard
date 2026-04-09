import { CreateCommentDto } from "@civic-pulse-user-dashboard/complaint-command";

export class AddComment {
    constructor(public readonly comment: CreateCommentDto) { }
}
