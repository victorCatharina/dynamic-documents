import 'dotenv/config';
import * as path from 'path';
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient as MssqlPrismaClient } from '@prisma/client';

const isSqlite =
  process.env.DATABASE_PROVIDER === 'sqlite' ||
  process.env.USE_TEST_DB === 'true' ||
  process.env.DATABASE_URL?.startsWith('file:');

function getPrismaClientClass(): typeof MssqlPrismaClient {
  if (isSqlite) {
    try {
      const generatedPath = path.resolve(process.cwd(), 'src/generated/prisma-test');
      return require(generatedPath).PrismaClient;
    } catch {
      try {
        return require('../generated/prisma-test').PrismaClient;
      } catch {
        return MssqlPrismaClient;
      }
    }
  }
  return MssqlPrismaClient;
}

const SelectedPrismaClient = getPrismaClientClass();

@Injectable()
export class PrismaService extends SelectedPrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  apiKey: any;

  constructor() {
    if (isSqlite) {
      const sqlitePath = path.resolve(process.cwd(), 'prisma/tmp/test.db');
      super({
        datasources: {
          db: {
            url: `file:${sqlitePath}`,
          },
        },
      });
    } else {
      super();
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log(
        `Prisma successfully connected to the ${isSqlite ? 'SQLite (test/temp)' : 'MSSQL'} database.`,
      );
    } catch (error: any) {
      this.logger.warn(`Could not connect to database at startup: ${error?.message || error}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected from the database.');
  }
}
