import { createStore, combineReducers } from "redux";
import quizReducer from "../redux/quizReducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
});

const store = createStore(rootReducer);

export default store;