// Module
import { joinClasses } from './utils';

describe('utils', () => {
  describe('joinClasses', () => {
    it('concatenates given strings', () => {
      expect(
        joinClasses('class1', 'class2')
      ).toBe('class1 class2');
    });

    it('concatenates trimed strings', () => {
      expect(
        joinClasses('class1  ', '  class2', '  class3  ')
      ).toBe('class1 class2 class3');
    });

    it('omits falsy and empty values', () => {
      expect(
        joinClasses('class1', '', '  ', undefined, null, 'class2'),
      ).toBe('class1 class2');
    });
  });
});
