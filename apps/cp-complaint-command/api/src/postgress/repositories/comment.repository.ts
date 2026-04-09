import { ComplaintComment } from "../entities/cc-complaint-comment.entity";

export abstract class ICommentRepository {
    abstract saveComment(comment: ComplaintComment): Promise<ComplaintComment>;
    abstract deleteComment(uid: string): Promise<boolean>;
}
