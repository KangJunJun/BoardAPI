import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { NoticeModule } from '../notice/notice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), NoticeModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
