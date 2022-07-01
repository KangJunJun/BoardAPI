import { Module } from '@nestjs/common';

import { Notice } from 'src/entities/notice.entity';
import { NoticeService } from './notice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeController } from './notice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  providers: [NoticeService],
  exports: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
