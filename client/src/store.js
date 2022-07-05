import { createStore, combineReducers, applyMiddleware } from "redux";
// combineReducers - combine all together
// apply middleware - add mw to app
import thunk from "redux-thunk";
// thunk i the middleware itself
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  //this will contain the reducers
  userLogin: userLoginReducer,
});

const initialState = {};
const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
