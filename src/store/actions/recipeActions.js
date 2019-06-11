import firebase from 'firebase/app';

export const createRecipe = (recipe) => {
    return (dispatch, getState) => {
      // make async call to database
      const firestore = firebase.firestore();
      firestore.collection('recipes').add({
        ...recipe
      }).then(() => {
        dispatch({ type: 'CREATE_RECIPE' }, recipe);
      }).catch(err => {
        dispatch({ type: 'CREATE_RECIPE_ERROR' }, err);
      });
    }
  };