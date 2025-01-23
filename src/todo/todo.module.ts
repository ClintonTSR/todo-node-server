import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONNECTION_NAME } from './constants/db.contants';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Todo],
    DB_CONNECTION_NAME)],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
