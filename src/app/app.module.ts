import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from '../board/board.module';
import { CommentModule } from 'src/comment/comment.module';
import { NoticeModule } from 'src/notice/notice.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BoardModule,
    CommentModule,
    NoticeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
