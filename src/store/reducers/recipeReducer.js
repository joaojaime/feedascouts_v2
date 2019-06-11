const initState = {}

const recipeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_RECIPE':
      console.log('create recipe success');
      return state;
    case 'CREATE_RECIPE_ERROR':
      console.log('create recipe error');
      return state;
    default:
      return state;
  }
};

export default recipeReducer;