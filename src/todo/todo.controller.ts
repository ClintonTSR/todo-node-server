import { Controller, Get, Post, Body, Patch, Param, Delete, Put, InternalServerErrorException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { toTodoDto } from './dto/todo.transformer';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todoService.create(createTodoDto);
    return toTodoDto(todo);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const updatedResult = await this.todoService.update(id, updateTodoDto);

    if (updatedResult.affected === 1) {
      const todo = await this.todoService.findOne(id);
      return toTodoDto(todo);
    }

    throw new InternalServerErrorException({
      action: '@TodoController:update',
      message: 'Unable to update the todo',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
