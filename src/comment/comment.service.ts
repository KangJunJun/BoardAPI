import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchCommentDTO, WriteCommentDTO } from './comment.dto';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { NoticeService } from 'src/notice/notice.service';
import { SendNoticeDTO } from 'src/notice/notice.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly noticeService: NoticeService,
  ) {}

  public async searchComments(search: SearchCommentDTO): Promise<Comment[]> {
    const comments: Comment[] = await this.commentRepository.find({
      where: {
        boardId: search.boardId,
      },
      order: {
        parentId: 'ASC',
        createDate: 'ASC',
      },
      skip: ((search.page ?? 1) - 1) * 10,
      take: 10,
    });

    return comments;
  }

  public async createComment(write: WriteCommentDTO): Promise<Comment> {
    const parent: Comment = await this.commentRepository.findOne({
      where: {
        id: write.parentId,
      },
    });

    if (parent.parentId)
      throw new NotFoundException(`Only comments in comments are allowed..`);

    const comment: Comment = await this.commentRepository.create();

    comment.boardId = write.boardId;
    comment.parentId = write.parentId;
    comment.comment = write.comment;
    comment.writer = write.writer;

    let result = await this.commentRepository.save(comment);

    if (write.parentId === null) {
      result.parentId = result.id;
      result = await this.commentRepository.save(comment);
    }

    const send: SendNoticeDTO = {
      text: result.comment,
    };

    this.noticeService.SendNotice(send);

    return result;
  }
}
