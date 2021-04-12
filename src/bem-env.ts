// Lib
import {
  Env,
  EnvSettings,
} from './env';
import { BEMEntity } from './bem-entity';

// Module
export class BEMEnv {
  readonly env: Env;

  constructor(settings: EnvSettings | BEMEnv) {
    this.env = new Env(settings instanceof BEMEnv ? settings.env : settings);
  }

  entity(block: string, element?: string) {
    return new BEMEntity(this.env, block, element);
  }
}
