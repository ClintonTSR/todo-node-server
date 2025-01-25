import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_CONNECTION_NAME } from './constants/db.contants';
import { Repository } from "typeorm";
import { Todo } from './entities/todo.entity';
import { buildPaginator, Cursor, PagingQuery, PagingResult, PaginationOptions } from 'typeorm-cursor-pagination';
import { DEFAULT_PAGING_ORDER, DEFAULT_PAGING_SIZE } from './constants/pagination.constant';
import { PagingQueryDto } from 'src/common/paginator.dto';

@Injectable()
export class TodoService {
  
  constructor(@InjectRepository(Todo, DB_CONNECTION_NAME) private readonly todoRepo: Repository<Todo>) {
  }

  create(dto: CreateTodoDto) {
    return this.todoRepo.save(dto);
  }

  async findAll(query: PagingQueryDto<Todo>): Promise<PagingResult<Todo>> {
    const qb = this.todoRepo.createQueryBuilder('todo');

    const paginator = buildPaginator({
      entity: Todo,
      paginationKeys: [query.orderBy ?? 'createdAt'],
      query: {
        limit: query.limit ?? DEFAULT_PAGING_SIZE,
        order: query.order ?? DEFAULT_PAGING_ORDER,
        beforeCursor: query.beforeCursor,
        afterCursor: query.afterCursor,
      },
    });

    const { data, cursor } = await paginator.paginate(qb);

    return {
      data,
      cursor,
    };
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
