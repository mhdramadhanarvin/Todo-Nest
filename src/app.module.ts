import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { TodosModule } from './todos/todos.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    TodosModule, 
    UsersModule, 
    AuthModule
  ], 
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
