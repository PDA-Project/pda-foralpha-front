export const SET_QUIZ_IID = 'SET_QUIZ_IID';

export const setQuizIid = (quizIid) => {
  return {
    type: SET_QUIZ_IID,
    quizIid,
  };
};