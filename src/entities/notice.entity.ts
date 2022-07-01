import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn({
    name: 'notice_id',
  })
  id: number;

  @Column({ length: 40 })
  keyword: string;

  @Column({ length: 20 })
  user: string;
}
