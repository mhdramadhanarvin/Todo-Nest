import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { Request } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    // this.todosService.create(createTodoDto);
    return createTodoDto
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }
}
