// Lib
import {
  firstWord,
  joinClasses,
  splitToWords,
} from './utils';
import type { Env } from './env';

// Module
type SimpleRawEntry = string | null | undefined;
type ComplexRawEntryValue = SimpleRawEntry | number | boolean;
type RawEntry = SimpleRawEntry | Record<string, ComplexRawEntryValue>;
type EntryValue = string | true;
type Entries = Record<string, EntryValue>;
type Options = string | {
  element?: string
  modifiers?: RawEntry | RawEntry[]
  extra?: RawEntry | RawEntry[]
};

export class BEMEntity {
  readonly env: Env;
  readonly block: string;
  readonly element: string;

  constructor(env: Env, block?: string, element?: string) {
    this.env = env;
    this.block = firstWord(block) || '';
    this.element = firstWord(element) || '';
  }

  private baseClass(rawElement?: string): string {
    const element = firstWord(rawElement) || this.element;
    return `${this.env.prefix}${this.block}${element && (this.env.elementSeparator + element) || ''}`;
  }

  private get modifierClassPrefix(): string {
    return `${this.baseClass()}${this.env.modifierSeparator}`;
  }

  private elementFromOptions(options?: Options): string | undefined {
    if (typeof options === 'string') {
      return options;
    }
    return options && options.element;
  }

  private getEntriesFromOptions(optionsKey: 'modifiers' | 'extra', options?: Options): Entries {
    if (!options || typeof options === 'string') {
      return {};
    }
    const entries = options[optionsKey];
    if (!entries) {
      return {};
    }
    if (Array.isArray(entries)) {
      return this.getValidEntries(entries);
    }
    return this.getValidEntries([entries]);
  }

  private getValidEntries(rawEntries: RawEntry[]): Entries {
    return rawEntries.reduce((validEntries: Entries, rawEntry: RawEntry) => {
      if (!rawEntry) {
        return validEntries;
      }
      if (typeof rawEntry === 'string') {
        splitToWords(rawEntry).forEach((word: string) => {
          validEntries[word] = true;
        });
        return validEntries;
      }
      Object.entries(rawEntry).forEach(([key, rawValue]) => {
        const value: string | true = rawValue && (rawValue === true || firstWord('' + rawValue)) || '';

        if (value) {
          splitToWords(key).forEach((word: string) => {
            validEntries[word] = value;
          });
        }
      });
      return validEntries;
    }, {});
  }

  private modifiersFromOptions(options?: Options): string[] {
    const prefix = this.modifierClassPrefix;
    const entries = this.getEntriesFromOptions('modifiers', options);
    return Object.entries(entries).map(([key, value]) => {
      if (value === true) {
        return `${prefix}${key}`;
      }
      return `${prefix}${key}${this.env.valueSeparator}${value}`;
    });
  }

  private extraFromOptions(options?: Options): string[] {
    return Object.keys(this.getEntriesFromOptions('extra', options));
  }

  as(options?: Options): string {
    return joinClasses(
      this.baseClass(this.elementFromOptions(options)),
      ...this.modifiersFromOptions(options),
      ...this.extraFromOptions(options),
    );
  }
}
