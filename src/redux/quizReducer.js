const initialState = {
    quizIid: null,
    // 다른 상태 프로퍼티들
  };
  const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_QUIZ_IID':
        return {
          ...state,
          quizIid: action.quizIid,
        };
      // 다른 액션 타입들에 대한 처리
      default:
        return state;
    }
  };

export default quizReducer;