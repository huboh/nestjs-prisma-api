import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./service";

@Global()
@Module({
  exports: [DatabaseService],
  providers: [DatabaseService],
})
export class DatabaseModule { }