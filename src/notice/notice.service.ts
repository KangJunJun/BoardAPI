import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/entities/notice.entity';
import { SendNoticeDTO } from './notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  public async SendNotice(search: SendNoticeDTO): Promise<Notice> {
    const nociteList: Notice[] = await this.noticeRepository.find();
    const noticeUser: string[] = [];

    for (const notice of nociteList) {
      if (search.text.includes(notice.keyword)) {
        noticeUser.push(notice.user);
      }
    }

    const set = new Set(noticeUser);
    const uniqueUser = [...set];
    if (uniqueUser) {
      // nocite to Send function
      for (const receiver of uniqueUser) {
        console.log(receiver);
      }
    }

    return;
  }
}
