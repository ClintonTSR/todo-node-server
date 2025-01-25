import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { DB_CONNECTION_NAME } from './todo/constants/db.contants';
import { Todo } from './todo/entities/todo.entity';
import { UserModule } from './user/user.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
 imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            name: DB_CONNECTION_NAME,
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                synchronize: true, //configService.get('NODE_ENV') === 'development',
                entities: [Todo],

            }),
        }),
        UserModule,
        TodoModule,
        LoggerModule.forRoot(),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
