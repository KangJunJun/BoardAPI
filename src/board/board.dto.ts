import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchBoardDTO {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly writer: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  readonly page: number;
}

export class WriteBoardDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly writer: string;

  @IsString()
  readonly password: string;
}

export class EditBoardDTO extends WriteBoardDTO {
  @IsNumber()
  readonly id: number;
}

export class DeleteBoardDTO {
  @IsNumber()
  readonly id: number;
  @IsString()
  password: string;
}
