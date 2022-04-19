import { User } from 'src/users/entity/user.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    sequence: number; 

    @ManyToOne(() => User, (user) => user.todos)
    user: User;
} 