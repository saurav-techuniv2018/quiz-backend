module.exports = {
  questionsUrl: 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions',
  answerForQuestionUrl: questionId => `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/${questionId}`,
};
