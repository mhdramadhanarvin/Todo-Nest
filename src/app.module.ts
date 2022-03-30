import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './services/todos/todos.module';
import { TodosController } from './services/todos/todos.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { getEnvPath } from './common/helper/env.helper';
import configuration from './config/configuration';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    TodosModule,
    ConfigModule.forRoot({
      load: [configuration],
      // envFilePath,
      // isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(TodosController);
  }
}
