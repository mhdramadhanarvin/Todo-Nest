import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'password',
  database: 'todo-nest',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true
};
