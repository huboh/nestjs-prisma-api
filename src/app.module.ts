import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleConfig } from './configs';
import { AuthModule, DatabaseModule, PostsModule, UsersModule } from "./modules";

const ConfigModule_ = ConfigModule.forRoot(configModuleConfig);

@Module({
  imports: [ConfigModule_, DatabaseModule, AuthModule, PostsModule, UsersModule],
})
export class AppModule { }
