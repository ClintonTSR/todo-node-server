import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_CONNECTION_NAME } from './constants/db.contants';
import { Repository } from "typeorm";
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  
  constructor(@InjectRepository(Todo, DB_CONNECTION_NAME) private readonly todoRepo: Repository<Todo>) {
  }

  create(dto: CreateTodoDto) {
    return this.todoRepo.save(dto);
  }

  findAll() {
    return this.todoRepo.find();
  }

  findOne(id: string) {
    return this.todoRepo.findOneBy({ id });
  }

  update(id: string, dto: UpdateTodoDto) {
    return this.todoRepo.update(id, {
      name: dto.name,
      description: dto.description,
      dueDate: dto.dueDate,
    });
  }

  remove(id: string) {
    return this.todoRepo.delete(id);
  }
}
