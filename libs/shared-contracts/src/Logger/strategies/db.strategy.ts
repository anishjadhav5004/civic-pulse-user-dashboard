import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILogger } from '../utility/Logger.interface';
import { InfLog } from '../entity/inf-log.entity';
import { LogParams, LoggerType } from '../utility/type';

@Injectable()
export class DbStrategy implements ILogger {
  constructor(
    @InjectRepository(InfLog)
    private readonly logRepository: Repository<InfLog>,
  ) {}

  async error(message: string, params?: LogParams): Promise<void> {
    await this.saveLog(LoggerType.ERROR, message, params);
  }

  async warn(message: string, params?: LogParams): Promise<void> {
    await this.saveLog(LoggerType.WARN, message, params);
  }

  async info(message: string, params?: LogParams): Promise<void> {
    await this.saveLog(LoggerType.INFO, message, params);
  }

  private async saveLog(
    level: LoggerType,
    message: string,
    params?: LogParams,
  ): Promise<void> {
    const logEntry = this.logRepository.create({
      moduleCode: params?.moduleCode || 'GENERAL',
      api: params?.api || 'N/A',
      log: message,
      error: level === LoggerType.ERROR,
      createdAt: new Date().toISOString(),
      level: level,
    });
    await this.logRepository.save(logEntry).catch(console.error);
  }
}
