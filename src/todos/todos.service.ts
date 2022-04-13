import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';
import { Todo } from './entity/todo.entity';
import { title } from 'process';

@Injectable()
export class TodosService {

  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository
  ) { }

  async getTodos(filter: FilterTodoDto): Promise<Todo[]> {
    return await this.todoRepository.getTodos(filter);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<void> {
    return await this.todoRepository.createTodo(createTodoDto);
  }

  async getTodoById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }
  
  async updateTodo(id: string, updateTodo): Promise<void> {
    const { title, sequence } = updateTodo;
    
    const todo = await this.getTodoById(id);
    todo.title = title;
    todo.sequence = sequence;

    await todo.save();
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await this.todoRepository.delete(id);
    
    if(result.affected == 0) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }
}