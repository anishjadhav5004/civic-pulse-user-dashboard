import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * InfLog — persisted log entry.
 *
 * Fixes from original:
 *  - Added @PrimaryGeneratedColumn (TypeORM requires a PK — without it the
 *    repository will throw at runtime)
 *  - api, log, error, timestamp were bare class fields with no @Column
 *    decorator, so TypeORM silently ignored them
 *  - timestamp replaced with @CreateDateColumn so DB sets it automatically
 *  - Index on (moduleCode, level) for fast filtered queries
 */
@Entity('inf_log')
@Index(['moduleCode', 'level'])
export class InfLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'module_code', default: 'GENERAL' })
  moduleCode: string;

  @Column({ nullable: true })
  api: string;

  @Column({ type: 'text' })
  log: string;

  @Column({ length: 10 })
  level: string; // 'debug' | 'info' | 'warn' | 'error'

  @Column({ default: false })
  error: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}