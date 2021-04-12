// Lib
import { BEMEntity } from './bem-entity'

// Module
import { BEMEnv } from './bem-env';

describe('BEMEnv', () => {
  it('defines BEM environment with given settings', () => {
    // Arrange
    const bem = new BEMEnv({
      prefix: 'x-',
      elementSeparator: '__',
      modifierSeparator: '--',
      valueSeparator: '-'
    });
    // Assert
    expect(bem.env.prefix).toEqual('x-');
    expect(bem.env.elementSeparator).toEqual('__');
    expect(bem.env.modifierSeparator).toEqual('--');
    expect(bem.env.valueSeparator).toEqual('-');
  });

  it('defines BEM environment basing on given BEMEnv instance', () => {
    // Arrange
    const referenceBem = new BEMEnv({
      prefix: 'x-',
      elementSeparator: '__',
      modifierSeparator: '--',
      valueSeparator: '-'
    });
    // Act
    const bem = new BEMEnv(referenceBem);
    // Assert
    expect(bem.env.prefix).toEqual('x-');
    expect(bem.env.elementSeparator).toEqual('__');
    expect(bem.env.modifierSeparator).toEqual('--');
    expect(bem.env.valueSeparator).toEqual('-');
  });


  it('allows to define new BEM entity', () => {
    // Arrange
    const bem = new BEMEnv({
      prefix: 'x-',
      elementSeparator: '__',
      modifierSeparator: '--',
      valueSeparator: '-'
    });
    // Act
    const block = bem.entity('block', 'element');
    // Assert
    expect(block instanceof BEMEntity).toBe(true);
  });
});
