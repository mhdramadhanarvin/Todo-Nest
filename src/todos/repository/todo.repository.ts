import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { FilterTodoDto } from "../dto/filter-todo.dto";
import { Todo } from '../entity/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    async getTodos(filter: FilterTodoDto): Promise<Todo[]> {
        const { title } = filter;

        const query = this.createQueryBuilder('todo');

        if (title) {
            query.andWhere('lower(todo.title) LIKE :title', { 
                title: `%${title.toLowerCase()}%` 
            });
        }

        return await query.getMany();
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<void> {
        const { title, sequence } = createTodoDto;

        const todo = this.create();
        todo.title = title;
        todo.sequence = sequence;

        try {
            await todo.save();
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}