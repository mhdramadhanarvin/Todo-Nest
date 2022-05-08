import { Module } from '@nestjs/common'; 
import { TodosModule } from './todos/todos.module'; 
import { UsersModule } from './users/users.module'; 
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({}),
    DatabaseModule,
    TodosModule, 
    UsersModule, 
    AuthModule
  ], 
})
export class AppModule {}
