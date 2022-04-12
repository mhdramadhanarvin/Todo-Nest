import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';
import { Todo } from './entity/todo.entity';

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

  // getTodo(id: string) {
  //   const todoIdx = this.findTodoById(id);
  //   return this.todos[todoIdx];
  // }

  // createTodo(createTodoDto: CreateTodoDto) {
  //   const { title, sequence } = createTodoDto;
  //   this.todos.push({
  //     id: uuidv4(),
  //     title,
  //     sequence,
  //   });
  // }

  // updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
  //   const { title, sequence } = updateTodoDto;
  //   const todoIdx = this.findTodoById(id);
  //   this.todos[todoIdx].title = title;
  //   this.todos[todoIdx].sequence = sequence;
  // }

  // findTodoById(id: string) {
  //   const todoIdx = this.todos.findIndex((todo) => todo.id === id);
  //   if (todoIdx === -1) {
  //     throw new NotFoundException(`Todo with id ${id} not found`);
  //   }
  //   return todoIdx;
  // }

  // deleteTodo(id: string) {
  //   const todoIdx = this.findTodoById(id);
  //   this.todos.splice(todoIdx, 1); 
  // }
}