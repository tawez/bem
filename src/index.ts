// Lib
import { BEMEnv } from './bem-env';
import type { EnvSettings } from './env';

// Module
export function bemEnv(settings: EnvSettings | BEMEnv) {
  return new BEMEnv(settings);
}
