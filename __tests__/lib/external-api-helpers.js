const externalApiHelpers = require('../../src/lib/external-api-helpers');

describe('externalApiHelpers', () => {
  describe('getQuestionsHelper', () => {
    test('should return a Promise', () => {
      expect(externalApiHelpers
        .getQuestionsHelper()
        .catch((e) => { throw e; }))
        .toBeInstanceOf(Promise);
    });

    test('should return an Array', () => {
      externalApiHelpers.getQuestionsHelper()
        .then((result) => {
          expect(Array.isArray(result)).toEqual(true);
        })
        .catch((e) => { throw e; });
    });

    test('should return an array of questions with options', () =>
      externalApiHelpers.getQuestionsHelper()
        .then((result) => {
          if (result.length > 0) {
            expect(result[0]).toEqual(expect.objectContaining({
              id: expect.any(Number),
              question: expect.any(String),
              correctAnswer: expect.any(String),
              options: expect.any(Array),
            }));
          }
        })
        .catch((e) => { throw e; }));
  });
});
