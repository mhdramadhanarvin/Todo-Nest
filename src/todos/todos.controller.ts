import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAllTodos() {
    return this.todosService.getAllTodo();
  }

  @Get('/:id')
  getTodos(@Param('id') id: string) {
    return this.todosService.getTodo(id);
  }

  @Post()
  createTodo(@Body('title') title: string, @Body('sequence') sequence: number) {
    this.todosService.createTodo(title, sequence);
    return this.todosService.getAllTodo();
  }

  @Put('/:id')
  updateTodo(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('sequence') sequence: number,
  ) {
    this.todosService.updateTodo(id, title, sequence);
    return this.todosService.getTodo(id);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string) {
    this.todosService.deleteTodo(id);
  }
}
