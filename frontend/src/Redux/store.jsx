import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk"
import  {userreducer} from "./User/UserReducer"
import  {postreducer} from "./Posts/PostReducer"

const rootReducer = combineReducers({
    posts:postreducer,
    users:userreducer
});
const store =legacy_createStore(rootReducer,applyMiddleware(thunk))


export {store}