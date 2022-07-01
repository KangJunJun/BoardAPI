import {
  Body,
  Controller,
  Logger,
  Post,
  Get,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Response, ResponseMessage } from '../util/response.util';
import { Board } from 'src/entities/board.entity';
import {
  WriteBoardDTO,
  EditBoardDTO,
  SearchBoardDTO,
  DeleteBoardDTO,
} from './board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  public async writeBoard(@Body() write: WriteBoardDTO): Promise<Response> {
    try {
      const board: Board = await this.boardService.createBoard(write);

      return new ResponseMessage().success().body(board).build();
    } catch (err) {
      Logger.error(err);
      return new ResponseMessage().error(err).build();
    }
  }

  @Put()
  public async editBoard(@Body() write: EditBoardDTO): Promise<Response> {
    try {
      const board: Board = await this.boardService.updateBoard(write);

      return new ResponseMessage().success().body(board).build();
    } catch (err) {
      Logger.error(err);
      return new ResponseMessage().error(err).build();
    }
  }

  @Get()
  public async getBoards(@Query() query: SearchBoardDTO): Promise<Response> {
    const boards = await this.boardService.searchBoards(query);

    if (!boards) {
      return new ResponseMessage().error(999, 'Load Error').build();
    }

    return new ResponseMessage().success().body(boards).build();
  }

  @Delete()
  public async deleteBoard(@Body() data: DeleteBoardDTO): Promise<Response> {
    try {
      const result: Board = await this.boardService.deleteBoard(data);

      return new ResponseMessage().success().body(result).build();
    } catch (err) {
      Logger.error(err);
      return new ResponseMessage().error(err).build();
    }
  }
}
