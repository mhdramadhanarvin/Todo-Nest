import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {
  constructor(private configService: ConfigService) {}

}
