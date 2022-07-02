import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from 'bcryptjs';
import { Board } from '../entities/board.entity';
import {
  WriteBoardDTO,
  EditBoardDTO,
  SearchBoardDTO,
  DeleteBoardDTO,
} from './board.dto';
import { Repository, Like } from 'typeorm';
import { SendNoticeDTO } from 'src/notice/notice.dto';
import { NoticeService } from 'src/notice/notice.service';
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly noticeService: NoticeService,
  ) {}

  public async searchBoards(search: SearchBoardDTO): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository.find({
      where: {
        id: search.id,
        writer: search.writer,
        title: Like(`%${search.title ?? ''}%`),
      },
      order: {
        updateDate: 'DESC',
      },
      skip: ((search.page ?? 1) - 1) * 10,
      take: 10,
    });

    return boards;
  }

  public async createBoard(write: WriteBoardDTO): Promise<Board> {
    const board = await this.boardRepository.create();

    // Encode User Password
    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(write.password, salt);

    board.title = write.title;
    board.content = write.content;
    board.writer = write.writer;
    board.password = password;

    const result = await this.boardRepository.save(board);
    const send: SendNoticeDTO = {
      text: result.title.concat(result.content),
    };

    this.noticeService.SendNotice(send);
    return result;
  }

  public async updateBoard(write: EditBoardDTO): Promise<Board> {
    const board = await this.checkBoard(write.id, write.password);

    board.title = write.title;
    board.content = write.content;

    const result = await this.boardRepository.save(board);
    const send: SendNoticeDTO = {
      text: result.title.concat(result.content),
    };

    this.noticeService.SendNotice(send);
    return result;
  }

  public async deleteBoard(data: DeleteBoardDTO): Promise<Board> {
    const board = await this.checkBoard(data.id, data.password);

    return this.boardRepository.remove(board);
  }

  private async checkBoard(id: number, password: string): Promise<Board> {
    const board: Board = await this.boardRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!board) throw new NotFoundException(`Can't find Board with id ${id}`);

    const passwordCheck = await Bcrypt.compare(password, board.password);
    if (!passwordCheck) {
      throw new NotFoundException(`password is incorrect.`);
    }

    return board;
  }
}
