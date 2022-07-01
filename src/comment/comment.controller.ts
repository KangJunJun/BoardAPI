import { Body, Controller, Logger, Post, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Response, ResponseMessage } from '../util/response.util';
import { SearchCommentDTO, WriteCommentDTO } from './comment.dto';
import { Comment } from 'src/entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  public async getComments(
    @Query() query: SearchCommentDTO,
  ): Promise<Response> {
    try {
      const comments = await this.commentService.searchComments(query);

      if (!comments) {
        return new ResponseMessage().error(999, 'Load Error').build();
      }

      return new ResponseMessage().success().body(comments).build();
    } catch (err) {
      Logger.error(err);
      return new ResponseMessage().error(err).build();
    }
  }

  @Post()
  public async writeComment(@Body() write: WriteCommentDTO): Promise<Response> {
    try {
      const comment: Comment = await this.commentService.createComment(write);

      return new ResponseMessage().success().body(comment).build();
    } catch (err) {
      Logger.error(err);
      return new ResponseMessage().error(err).build();
    }
  }
}
