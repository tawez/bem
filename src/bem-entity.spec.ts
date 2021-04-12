// Lib
import { Env } from './env';

// Module
import { BEMEntity } from './bem-entity';

describe('BEMEntity', () => {
  const env = new Env({
    prefix: 'x-',
    elementSeparator: '__',
    modifierSeparator: '--',
    valueSeparator: '-'
  });

  describe('constructor()', () => {
    it('allows to define BEM block', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block');
      // Assert
      expect( entity.block ).toEqual('block');
    });

    it('takes first word as block', () => {
      // Arrange
      const entity = new BEMEntity(env, '  block  or  something  ');
      // Assert
      expect( entity.block ).toEqual('block');
    });

    it('sets block to empty string if no valid value is given', () => {
      // Arrange
      const entity = new BEMEntity(env, '  ');
      // Assert
      expect( entity.block ).toEqual('');
    });

    it('allows to define BEM element', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block', 'element');
      // Assert
      expect( entity.element ).toEqual('element');
    });

    it('takes first word as element', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block', '  element  or something  ');
      // Assert
      expect( entity.element ).toEqual('element');
    });

    it('sets element to empty string if no valid value is given', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block', '  ');
      // Assert
      expect( entity.element ).toEqual('');
    });
  });

  describe('as()', () => {
    it('returns class for defined BEM block', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block');
      // Assert
      expect(entity.as()).toEqual('x-block');
    });

    it('returns class for defined BEM element', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block', 'element');
      // Assert
      expect(entity.as()).toEqual('x-block__element');
    });

    it('allows to add element', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block');
      // Assert
      expect(
        entity.as('element')
      ).toEqual('x-block__element');
      expect(
        entity.as({ element: 'element' })
      ).toEqual('x-block__element');
    });

    it('allows to override element', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block', 'element');
      // Assert
      expect(
        entity.as('another')
      ).toEqual('x-block__another');
      expect(
        entity.as({ element: 'different' })
      ).toEqual('x-block__different');
      expect(
        entity.as()
      ).toEqual('x-block__element');
    });

    it('takes first word as element', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block');
      // Assert
      expect(
        entity.as('  another  element  ')
      ).toEqual('x-block__another');
      expect(
        entity.as({ element: '  different  element  ' })
      ).toEqual('x-block__different');
    });

    it('ignores empty element', () => {
      // Arrange
      const entity = new BEMEntity(env, 'block');
      // Assert
      expect(
        entity.as('')
      ).toEqual('x-block');
      expect(
        entity.as('  ')
      ).toEqual('x-block');
      expect(
        entity.as({ element: '' })
      ).toEqual('x-block');
      expect(
        entity.as({ element: '  ' })
      ).toEqual('x-block');
    });

    describe('can add modifier classes', () => {
      it('given as simple non empty value', () => {
        // Arrange
        const block = new BEMEntity(env, 'block');
        // Assert
        expect(
          block.as({ modifiers: 'class1' })
        ).toEqual('x-block x-block--class1');
        expect(
          block.as({ modifiers: '  class1  class2  ' })
        ).toEqual('x-block x-block--class1 x-block--class2');
        expect(
          block.as({ modifiers: '' })
        ).toEqual('x-block');
        expect(
          block.as({ modifiers: '  ' })
        ).toEqual('x-block');
        expect(
          block.as({ modifiers: undefined })
        ).toEqual('x-block');
        expect(
          block.as({ modifiers: null })
        ).toEqual('x-block');
      });

      it('given as object of keys with non empty values', () => {
        // Arrange
        const block = new BEMEntity(env, 'block');
        // Act
        const classes = block.as({
          modifiers: {
            'class1': '  extra  value  ',
            '  class2  ': 123,
            'class3': -456,
            '  class4  class5  ': true,
            'class6': 0,
            'class7': '',
            'class8': '  ',
            'class9': false,
            'class10': null,
            'class11': undefined,
          }
        });
        // Assert
        expect(classes).toEqual('x-block x-block--class1-extra x-block--class2-123 x-block--class3--456 x-block--class4 x-block--class5');
      });

      it('given as array of valid values', () => {
        // Arrange
        const block = new BEMEntity(env, 'block');
        // Act
        const classes = block.as({
          modifiers: [
            'class1',
            '  class2  class3  ',
            '',
            '  ',
            undefined,
            null,
            {
              'class4': '  non  empty  ',
              '  class5  ': 123,
              'class6': -456,
              '  class7  class8  ': true,
              'class9': 0,
              'class10': '',
              'class11': '  ',
              'class12': false,
              'class13': null,
              'class14': undefined,
            }
          ]
        });
        // Assert
        expect(classes).toEqual('x-block x-block--class1 x-block--class2 x-block--class3 x-block--class4-non x-block--class5-123 x-block--class6--456 x-block--class7 x-block--class8');
      });

    });

    describe('can add extra classes', () => {
      it('given as simple non empty value', () => {
        // Arrange
        const block = new BEMEntity(env, 'block');
        // Assert
        expect(
          block.as({ extra: 'class1' })
        ).toEqual('x-block class1');
        expect(
          block.as({ extra: '  class1  class2  ' })
        ).toEqual('x-block class1 class2');
        expect(
          block.as({ extra: '' })
        ).toEqual('x-block');
        expect(
          block.as({ extra: '  ' })
        ).toEqual('x-block');
        expect(
          block.as({ extra: undefined })
        ).toEqual('x-block');
        expect(
          block.as({ extra: null })
        ).toEqual('x-block');
      });

      it('given as object of keys with non empty values', () => {
        // Arrange
        const block = new BEMEntity(env, 'block');
        // Act
        const classes = block.as({
          extra: {
            'class1': '  non  empty  ',
            '  class2  ': 123,
            'class3': -456,
            '  class4  class5  ': true,
            'class6': 0,
            'class7': '',
            'class8': '  ',
            'class9': false,
            'class10': null,
            'class11': undefined,
          }
        });
        // Assert
        expect(classes).toEqual('x-block class1 class2 class3 class4 class5');
      });

      it('given as array of valid values', () => {
        // Arrange
        const block = new BEMEntity(env, 'block');
        // Act
        const classes = block.as({
          extra: [
            'class1',
            '  class2  class3  ',
            '',
            '  ',
            undefined,
            null,
            {
              'class4': '  non  empty  ',
              '  class5  ': 123,
              'class6': -456,
              '  class7  class8  ': true,
              'class9': 0,
              'class10': '',
              'class11': '  ',
              'class12': false,
              'class13': null,
              'class14': undefined,
            }
          ]
        });
        // Assert
        expect(classes).toEqual('x-block class1 class2 class3 class4 class5 class6 class7 class8');
      });
    });
  });
});
