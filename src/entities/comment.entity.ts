import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({
    name: 'comment_id',
  })
  id: number;

  @Column({ name: 'board_id', type: 'int' })
  boardId: number;

  @Column({ name: 'parent_id', default: null })
  parentId?: number;

  // @Column({ default: 0 })
  // depth: number;

  // @Column({ default: 0 })
  // sorts: number;

  @Column({ length: 500 })
  comment: string;

  @Column({ length: 20 })
  writer: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createDate: Date;

  @Column({ default: false })
  isDelete: boolean;

  @ManyToOne(() => Board, (board) => board.comments)
  @JoinColumn({ name: 'board_id' })
  board!: Board;

  // @OneToMany(() => Comment, (comment) => comment.parent)
  // children?: Comment[];

  // @ManyToOne(() => Comment, (comment) => comment.children, {
  //   nullable: true,
  //   createForeignKeyConstraints: false,
  // })
  // @JoinColumn({ name: 'parent_Id' })
  // parent?: Comment;

  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: Comment | null;
  //parentId?: number | null;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children?: Comment[];
}
