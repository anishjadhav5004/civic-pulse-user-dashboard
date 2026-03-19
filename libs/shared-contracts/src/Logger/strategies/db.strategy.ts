import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ilogger } from '../Logger.interface';
import { InfLog } from '../entity/inf-log.entity';
import { LogParams } from '../type';

@Injectable()
export class DbStrategy implements Ilogger {
  constructor(
    @InjectRepository(InfLog)
    private readonly logRepository: Repository<InfLog>,
  ) {}

  async error(message: string, params?: LogParams): Promise<void> {
    await this.saveLog('error', message, params);
  }

   async warn(message: string, params?: LogParams): Promise<void> {
    await this.saveLog('warn', message, params);
  }

  async info(message: string, params?: LogParams): Promise<void> {
    await this.saveLog('info', message, params);
  }

  private async saveLog(level: string, message: string, params?: LogParams): Promise<void> {
    const logEntry = this.logRepository.create({
      moduleCode: params?.moduleCode || 'GENERAL',
      api: params?.api || 'N/A',
      log: message,
      error: level === 'error',
      createdAt: new Date().toISOString()
    });
    await this.logRepository.save(logEntry).catch(console.error);
  }
}
