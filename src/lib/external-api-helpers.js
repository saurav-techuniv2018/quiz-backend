const rp = require('request-promise');

const externalApiConstants = require('../constants/external-api');

const getQuestionsHelper = () => new Promise((resolve, reject) => {
  rp({
    method: 'GET',
    url: externalApiConstants.questionsUrl,
  })
    .then(json => JSON.parse(json).allQuestions)
    .then((questions) => {
      const questionIdsPromiseArray = questions.map(question =>
        rp({
          method: 'GET',
          url: externalApiConstants.answerForQuestionUrl(question.questionId),
        }));

      Promise.all(questionIdsPromiseArray)
        .then((answers) => {
          const questionsWithAnswers = [];

          for (let i = 0; i < questions.length; i += 1) {
            const options = Object.keys(questions[i])
              .filter(key => key.match(/^option\d+$/))
              .map(key => questions[i][key]);

            questionsWithAnswers.push({
              id: questions[i].questionId,
              question: questions[i].question,
              correctAnswer: JSON.parse(answers[i]).answer,
              options,
            });
          }
          resolve(questionsWithAnswers);
        })
        .catch(reject);
    })
    .catch(reject);
});

module.exports = { getQuestionsHelper };
