// Module
export type EnvSettings = {
  prefix?: string
  elementSeparator: string
  modifierSeparator: string
  valueSeparator: string
}

export class Env {
  readonly prefix: string;
  readonly elementSeparator: string;
  readonly modifierSeparator: string;
  readonly valueSeparator: string;

  constructor(settings: EnvSettings | Env) {
    this.prefix = settings.prefix || '';
    this.elementSeparator = settings.elementSeparator;
    this.modifierSeparator = settings.modifierSeparator;
    this.valueSeparator = settings.valueSeparator;
  }
}
