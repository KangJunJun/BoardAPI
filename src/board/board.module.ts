import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { NoticeModule } from '../notice/notice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), NoticeModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
