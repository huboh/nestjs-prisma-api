import { NestApp } from "src/types";
import { PrismaClient } from "@prisma/client";
import { getPrismaClientConfig } from "src/configs";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable({})
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super(getPrismaClientConfig());
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: NestApp) {
    this.$on('beforeExit', async () => await app.close());
  }
}
