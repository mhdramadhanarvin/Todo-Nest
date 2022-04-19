import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';
import { Todo } from './entity/todo.entity';
import { title } from 'process';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class TodosService {

  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository
  ) { }

  async getTodos(user: User, filter: FilterTodoDto): Promise<Todo[]> {
    return await this.todoRepository.getTodos(user, filter);
  }

  async createTodo(user: User, createTodoDto: CreateTodoDto): Promise<void> {
    return await this.todoRepository.createTodo(user, createTodoDto);
  }

  async getTodoById(user: User, id: string): Promise<Todo> {
    return await this.todoRepository.getTodoById(user, id);
  }
  
  async updateTodo(user: User, id: string, updateTodo): Promise<void> {
    return await this.todoRepository.updateTodo(user, id, updateTodo); 
  }

  async deleteTodo(user: User, id: string): Promise<void> { 
    const result = await this.todoRepository.delete({ id, user });
    
    if(result.affected == 0) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }
}