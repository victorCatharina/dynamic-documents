import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  apiKey: any;

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma successfully connected to the database.');
    } catch (error) {
      this.logger.warn(`Could not connect to database at startup: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected from the database.');
  }
}
