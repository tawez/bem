// Lib
import { BEMEnv } from './bem-env';

// Module
import { bemEnv } from './index';

describe('bemEnv', () => {
  it('allows to define BEM environment', () => {
    // Arrange
    const bem: BEMEnv = bemEnv({
      prefix: 'x-',
      elementSeparator: '__',
      modifierSeparator: '--',
      valueSeparator: '-'
    });
    // Assert
    expect(bem instanceof BEMEnv).toBe(true);
  });
});
