import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Comment } from './comment.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({
    name: 'board_id',
  })
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 500 })
  content: string;

  @Column({ length: 20 })
  writer: string;

  @Column({ length: 100 })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updateDate: Date;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];
}
