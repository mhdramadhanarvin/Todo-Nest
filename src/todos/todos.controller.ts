import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
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
  @UsePipes(ValidationPipe)
  createTodo(@Body() payload: CreateTodoDto) {
    this.todosService.createTodo(payload);
    return this.todosService.getAllTodo();
  }

  @Put('/:id')
  updateTodo(@Param('id') id: string, @Body() payload: UpdateTodoDto) {
    this.todosService.updateTodo(id, payload);
    return this.todosService.getTodo(id);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string) {
    this.todosService.deleteTodo(id);
  }
}
