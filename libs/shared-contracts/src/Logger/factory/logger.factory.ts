import { Injectable } from '@nestjs/common';
import { ConsoleStrategy } from '../strategies/console.strategy';
import { DbStrategy } from '../strategies/db.strategy';
import { Ilogger } from '../Logger.interface';
import { LogTarget } from '../type';

@Injectable()
export class LoggerFactory {
  private readonly strategies: Map<LogTarget, Ilogger[]>;

  constructor(
    private readonly consoleStrategy: ConsoleStrategy,
    private readonly dbStrategy: DbStrategy,
  ) {
    // Build once, reuse forever
    this.strategies = new Map<LogTarget, Ilogger[]>([
      ['console', [this.consoleStrategy]],
      ['db', [this.dbStrategy]],
      ['both', [this.consoleStrategy, this.dbStrategy]],
    ]);
  }

  create(target: LogTarget = 'console'): Ilogger[] {
    return this.strategies.get(target)!;
  }
}
