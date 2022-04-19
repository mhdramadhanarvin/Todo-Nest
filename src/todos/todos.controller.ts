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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';
import { UUIDValidationPipe } from './pipes/uuid-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtGuard } from 'src/guard/jwt.guard';
import { User } from 'src/users/entity/user.entity';

@Controller('todos')
@UseGuards(JwtGuard)
export class TodosController {
  constructor(private todosService: TodosService) { }

  @Get()
  async getAllTodos(
    @GetUser() user,
    @Query() filter: FilterTodoDto
  ): Promise<Todo[]> {
    return this.todosService.getTodos(user, filter);
  }

  @Get('/:id')
  async getTodos(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<Todo> {
    return this.todosService.getTodoById(user, id);
  }

  @Post()
  async createTodo(
    @GetUser() user: User,
    @Body() payload: CreateTodoDto
  ): Promise<void> {
    return this.todosService.createTodo(user, payload);
  }

  @Put('/:id')
  async updateTodo(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateTodoDto
  ): Promise<void> {
    return this.todosService.updateTodo(user, id, payload);
  }

  @Delete('/:id')
  async deleteTodo(
    @GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<void> {
    return this.todosService.deleteTodo(user, id);
  }
} 