import { IsString } from 'class-validator';

export class SendNoticeDTO {
  @IsString()
  readonly text: string;
}
