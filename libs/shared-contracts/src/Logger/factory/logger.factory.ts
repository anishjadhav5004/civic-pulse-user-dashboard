import { Injectable } from '@nestjs/common';
import { ConsoleStrategy } from '../strategies/console.strategy';
import { DbStrategy } from '../strategies/db.strategy';
import { Ilogger } from '../Logger.interface';
import { Env } from '../type';

@Injectable()
export class LoggerFactory {
  private readonly strategies: Map<Env, Ilogger[]>;

  constructor(
    private readonly consoleStrategy: ConsoleStrategy,
    private readonly dbStrategy: DbStrategy,
  ) {
    // Build once, reuse forever
    this.strategies = new Map<Env, Ilogger[]>([
      ['prod', [this.dbStrategy]],
      ['dev', [this.consoleStrategy, this.dbStrategy]],
    ]);
  }

  create(env: Env = 'prod'): Ilogger[] {
    return this.strategies.get(env)!;
  }
}
