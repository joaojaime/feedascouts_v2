import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';

const rootReducer = combineReducers({
    recipe: recipeReducer
});

export default rootReducer

// the key name will be the data property on the state object