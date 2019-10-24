const createShoppingList = (menu) => {
    let shoppingList = [];
    
    menu.recipes.map( item => {
        let multiplier = item.menuNrPeople/item.recipe.nrPeople
        
        item.recipe.ingredients.map( ing => {
            let newQt
            let newIng

            if(ing.isQb){
                newQt = "q.b."
            }else{
                newQt = ing.qtd * multiplier;
            }
            newIng = {...ing, qtd: newQt};

            //insert into shoppinglist
            shoppingList = addToShoppingList(shoppingList, newIng);
        })
    })

    console.log('shoppinglist: ', shoppingList)
    return shoppingList;
}

const addToShoppingList = (shoppingList, newIng) => {
    let oldIng = shoppingList.find( x => x.name === newIng.name && x.measure === newIng.measure);

    if(oldIng)
    {
        if(newIng.quantity !== 'q.b.'){
            newIng.quantity += oldIng.quantity;
            let oldIngIdx = shoppingList.indexOf(oldIng);
            shoppingList[oldIngIdx] = newIng;
        }
    }
    else
    {
        shoppingList.push(newIng);
    }

    return shoppingList;
}

export default createShoppingList;