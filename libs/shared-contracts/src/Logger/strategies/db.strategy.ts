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

  error(message: string, params?: LogParams): void {
    this.saveLog('error', message, params);
  }

  warn(message: string, params?: LogParams): void {
    this.saveLog('warn', message, params);
  }

  info(message: string, params?: LogParams): void {
    this.saveLog('info', message, params);
  }

  private saveLog(level: string, message: string, params?: LogParams): void {
    const logEntry = this.logRepository.create({
      moduleCode: params?.moduleCode || 'GENERAL',
      api: params?.api || 'N/A',
      log: message,
      error: level === 'error',
      createdAt: new Date().toISOString()
    });
    this.logRepository.save(logEntry).catch(console.error);
  }
}
