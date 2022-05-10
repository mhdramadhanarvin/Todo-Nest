import { Module } from '@nestjs/common'; 
import { TodosModule } from './todos/todos.module'; 
import { UsersModule } from './users/users.module'; 
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({}),
    TypeOrmConfig,
    TodosModule, 
    UsersModule, 
    AuthModule
  ], 
})
export class AppModule {}
