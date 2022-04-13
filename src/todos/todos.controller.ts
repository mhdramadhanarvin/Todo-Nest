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
import { Todo } from './entity/todo.entity';
import { UUIDValidationPipe } from './pipes/uuid-validation.pipe';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) { }

  @Get()
  async getAllTodos(
    @Query() filter: FilterTodoDto,
  ): Promise<Todo[]> {
    return this.todosService.getTodos(filter);
  }

  @Get('/:id')
  async getTodos(@Param('id', UUIDValidationPipe) id: string): Promise<Todo> {
    return this.todosService.getTodoById(id);
  }

  @Post()
  async createTodo(@Body() payload: CreateTodoDto): Promise<void> {
    return this.todosService.createTodo(payload);
  }

  @Put('/:id')
  async updateTodo(@Param('id', UUIDValidationPipe) id: string, @Body() payload: UpdateTodoDto): Promise<void> {
    return this.todosService.updateTodo(id, payload); 
  }

  @Delete('/:id')
  async deleteTodo(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.todosService.deleteTodo(id);
  }
}
