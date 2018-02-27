const externalApiConstants = require('../../src/constants/external-api');

describe('externalApiConstants', () => {
  describe('questionsUrl', () => {
    test('should return correct url', () => {
      expect(externalApiConstants.questionsUrl)
        .toEqual('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions');
    });
  });

  describe('answerForQuestionUrl', () => {
    describe('should return correct url', () => {
      test('based on the questionId passed', () => {
        expect(externalApiConstants.answerForQuestionUrl(3))
          .toEqual('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/3');
      });
    });
  });
});

