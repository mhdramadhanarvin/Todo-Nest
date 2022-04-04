import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAllTodos(@Query('title') title: string, @Query('sequence') sequence: number) { 
    return this.todosService.getTodos(title, sequence);
  }

  @Get('/:id')
  getTodos(@Param('id') id: string) {
    return this.todosService.getTodo(id);
  }

  @Post()
  createTodo(@Body('title') title: string, @Body('sequence') sequence: number) {
    this.todosService.createTodo(title, sequence); 
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
