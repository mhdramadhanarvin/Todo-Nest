import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos/todos.service';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { LoggerMiddleware } from './middleware/logger.middleware';  

@Module({
  imports: [
    TodosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule {}
