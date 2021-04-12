// Lib
import { Env } from './env';

// Module
describe('Env', () => {
  it('is created according to given settings', () => {
    // Arrange
    const env = new Env({
      prefix: 'x-',
      elementSeparator: '__',
      modifierSeparator: '--',
      valueSeparator: '-'
    });
    // Assert
    expect(env.prefix).toEqual('x-');
    expect(env.elementSeparator).toEqual('__');
    expect(env.modifierSeparator).toEqual('--');
    expect(env.valueSeparator).toEqual('-');
  });

  it('assign empty string to `prefix` if not given', () => {
    // Arrange
    const env = new Env({
      elementSeparator: '__',
      modifierSeparator: '--',
      valueSeparator: '-'
    });
    // Assert
    expect(env.prefix).toEqual('');
  });

  it('is created basing on given Env instance', () => {
    // Arrange
    const referenceEnv = new Env({
      prefix: 'x-',
      elementSeparator: '__',
      modifierSeparator: '--',
      valueSeparator: '-'
    });
    // Act
    const env = new Env(referenceEnv);
    // Assert
    expect(env.prefix).toEqual('x-');
    expect(env.elementSeparator).toEqual('__');
    expect(env.modifierSeparator).toEqual('--');
    expect(env.valueSeparator).toEqual('-');
  });
});
