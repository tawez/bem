// Module
import {
  firstWord,
  joinClasses,
  splitToWords,
} from './utils';

describe('utils', () => {
  describe('joinClasses', () => {
    it('concatenates given strings', () => {
      expect(
        joinClasses('class1', 'class2')
      ).toBe('class1 class2');
    });

    it('removes unnecesary white characters', () => {
      expect(
        joinClasses('class1  ', '  class2', '  class3\t\t', 'class4\n\nclass5')
      ).toBe('class1 class2 class3 class4 class5');
    });

    it('omits falsy and empty values', () => {
      expect(
        joinClasses('class1', '', '  \n\t  ', undefined, null, 'class2'),
      ).toBe('class1 class2');
    });
  });

  describe('splitToWords', () => {
    it('splits given string to words', () => {
      expect(
        splitToWords('  \nthis\t  but\n\tnot that  ')
      ).toEqual(['this', 'but', 'not', 'that']);
    })

    it('returns empty array if there is nothing to split', () => {
      expect(
        splitToWords()
      ).toEqual([]);
      expect(
        splitToWords('  \n\t  ')
      ).toEqual([]);
    })
  })

  describe('firstWord', () => {
    it('returns first word in the given string', () => {
      expect(
        firstWord('  \nthis\t  but\n\tnot that  ')
      ).toEqual('this');
    });

    it('returns undefined if there is no words in thr given string', () => {
      expect(
        firstWord()
      ).toEqual(undefined);
      expect(
        firstWord('  ')
      ).toEqual(undefined);
    });
  })
});
