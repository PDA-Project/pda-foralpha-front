import { createStore, combineReducers } from 'redux';
import quizReducer from './redux/quizReducer'; // 실제 파일 위치에 따라 경로를 조정
const rootReducer = combineReducers({
  quiz: quizReducer,
  // 다른 리듀서들도 추가 가능
});
const store = createStore(rootReducer);
export default store;
