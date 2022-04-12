import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getAllTodos(
    @Query() filter: FilterTodoDto,
  ) {
    return this.todosService.getTodos(filter);
  }

  // @Get('/:id')
  // getTodos(@Param('id') id: string) {
  //   return this.todosService.getTodo(id);
  // }

  @Post()
  createTodo(@Body() payload: CreateTodoDto) {
    this.todosService.createTodo(payload); 
  }

  // @Put('/:id')
  // updateTodo(@Param('id') id: string, @Body() payload: UpdateTodoDto) {
  //   this.todosService.updateTodo(id, payload);
  //   return this.todosService.getTodo(id);
  // }

  // @Delete('/:id')
  // deleteTodo(@Param('id') id: string) {
  //   this.todosService.deleteTodo(id);
  // }
}
