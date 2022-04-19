import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { FilterTodoDto } from "../dto/filter-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { Todo } from '../entity/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async getTodos(user: User, filter: FilterTodoDto): Promise<Todo[]> {
    const { title } = filter;

    const query = this.createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId: user.id });

    if (title) {
      query.andWhere('lower(todo.title) LIKE :title', {
        title: `%${title.toLowerCase()}%`
      });
    }

    return await query.orderBy('todo.sequence', 'ASC').getMany();
  }

  async getTodoById(user: User, id: string): Promise<Todo> {
    const todo = await this.findOne(id, { where: { user } });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }  

  async createTodo(user: User, createTodoDto: CreateTodoDto): Promise<void> {
    const { title, sequence } = createTodoDto;

    const todo = this.create();
    let countData = await this.createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId: user.id })
      .getCount()+1;
      
    todo.title = title;
    todo.sequence = sequence || countData;
    todo.user = user;
    try {
      await todo.save();
    } catch (e) {
      if (e.code == 'ER_DUP_ENTRY') {
        throw new ConflictException(`Duplicate todo with sequence ${sequence}`)
      }
      throw new InternalServerErrorException(e)
    }
  } 

  async updateTodo(user: User, id: string, updateTodo: UpdateTodoDto): Promise<void> {
    const { title, sequence } = updateTodo;
    
    const todo = await this.getTodoById(user, id);
    todo.title = title;
    todo.sequence = sequence || todo.sequence;

    try {
      await todo.save();
    } catch (e) { 
      if (e.code == 'ER_DUP_ENTRY') {
        throw new ConflictException(`Duplicate todo with sequence ${sequence}`)
      }
      throw new InternalServerErrorException(e)
    }
  }
}