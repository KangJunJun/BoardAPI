import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchCommentDTO {
  @IsNumber()
  @IsOptional()
  readonly boardId: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  readonly page: number;
}

export class WriteCommentDTO {
  @IsNumber()
  readonly boardId: number;

  @IsNumber()
  @IsOptional()
  readonly parentId?: number;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly writer: string;
}
