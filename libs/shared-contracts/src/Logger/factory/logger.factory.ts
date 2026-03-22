import { Injectable } from '@nestjs/common';
import { ConsoleStrategy } from '../strategies/console.strategy';
import { DbStrategy } from '../strategies/db.strategy';
import { ILogger } from '../utility/Logger.interface';
import { Env, LoggerType } from '../utility/type';
import { LevelGateStrategy } from '../strategies/levelGate.strategy';

@Injectable()
export class LoggerFactory {
  private readonly strategies: Map<Env, ILogger[]>;

  constructor(
    private readonly consoleStrategy: ConsoleStrategy,
    private readonly dbStrategy: DbStrategy,
  ) {
    // gatedConsole wraps ConsoleStrategy (IDebugLogger) — debug works
    const gatedConsole = new LevelGateStrategy(
      this.consoleStrategy,
      LoggerType.DEBUG,
    );

    // gatedDb wraps DbStrategy (ILogger) — debug call hits isDebugLogger check → skipped
    const gatedDb = new LevelGateStrategy(this.dbStrategy, LoggerType.INFO);

    // Build once, reuse forever
    this.strategies = new Map<Env, ILogger[]>([
      ['prod', [gatedDb]],
      ['dev', [gatedConsole, gatedDb]],
    ]);
  }

  create(env: Env = 'prod'): ILogger[] {
    return this.strategies.get(env)!;
  }
}
