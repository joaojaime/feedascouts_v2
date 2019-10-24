import React, { Component } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import firebase from 'firebase/app';

import Button from 'react-bootstrap/Button'

import {withRouter} from 'react-router-dom';
import TeamsStep from './TeamsStep';
import RecipesStep from './recipes-step/RecipesStep';
import createShoppingList from '../../scripts/createShoppingList';
import { downloadCSV } from '../../scripts/csvHelper';

class EditMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesSelected: [],
            recipesForSelection: [],
            recipesList: [],
            loaded: false,
            menuNrPeopleList: [],
            currMenu: {},
            currMenuId: this.props.match.params.id
        }
    }

    componentDidMount(){
        let currMenu = {};
        let recipesList = [];
        let recipesForSelection = []
        let recipesSelected = []
        const currMenuId = this.state.currMenuId
    
        const db = firebase.firestore();
        db.collection('menus').doc(currMenuId)
            .get()
            .then(response => {
                currMenu = {
                    ...response.data(),
                    id: response.id
                };

                recipesSelected = currMenu.recipes;
        });

        db.collection('recipes').get().then(response => {
            response.docs.forEach(item => {
                let aux = {
                    recipe: {
                        ...item.data(),
                        id: item.id
                    },
                    menuNrPeople: 0
                }
                recipesList.push(aux);
            });

            recipesForSelection = recipesList.filter( x => {
                let isEqual = false;
                for(let y of recipesSelected) { 
                    if (y.recipe.id == x.recipe.id){
                        isEqual = true;
                        break;
                    }
                }
                return !isEqual;
            });

            this.setState({
                loaded: true,
                currMenu: currMenu,
                recipesSelected: currMenu.recipes,
                recipesList: recipesList,
                recipesForSelection: recipesForSelection
            });
        });
    }

    handleCSVDownload = () => {

        if(!this.shoppingList){
            window.alert('Por favor, clicka em "Guardar" antes do download')
        }else{
            const data = {
                headers: [
                    'Nome', 'Qtd', 'Medida', 'Qb?'
                ],
                rows: this.shoppingList.map(ing => ([
                    ing.name,
                    ing.qtd,
                    ing.measure,
                    ing.qb
                ]))
              };
            downloadCSV('shopping_list.csv', data);
        }
    }

    handleRecipeNrPeople = (e) => {
        this.setState({ 
            menuNrPeopleList: {
                ...this.state.menuNrPeopleList,
                [e.target.name]: e.target.value
            }
        });
    }

    addRecipeToMenu = (name) => {
        const currName = name;
        let recipesForSelection = this.state.recipesForSelection;
        let recipesSelected = this.state.recipesSelected;
    
        let currRecipe = this.state.recipesList.find(x => x.recipe.name === currName);
        currRecipe.menuNrPeople = parseInt(this.state.menuNrPeopleList[name], 10);

        recipesForSelection = recipesForSelection.filter(x => x.recipe.name !== currRecipe.recipe.name);
        recipesSelected.push(currRecipe);

        this.setState({ 
            recipesForSelection: recipesForSelection,
            recipesSelected: recipesSelected
        });
    }

    rmvRecipeFromMenu = (name) => {
        const currName = name;
        
        let currRecipe = this.state.recipesList.find(x => x.recipe.name === currName);
        currRecipe.menuNrPeople = 0;

        this.setState({ 
            recipesForSelection: [...this.state.recipesForSelection, currRecipe],
            recipesSelected: [...this.state.recipesSelected.filter(x => x.recipe.name !== currRecipe.recipe.name)],
            menuNrPeopleList: {
                ...this.state.menuNrPeopleList,
                [name]: 0
            }
        });
    }

    render() {

        let recipesList = this.state.recipesList;
        let recipesForSelection = this.state.recipesForSelection;
        let recipesSelected = this.state.recipesSelected;
        let currMenu = this.state.currMenu;
        let currMenuId = this.state.currMenuId;

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)

            this.shoppingList = createShoppingList( {...values, recipes: recipesSelected} );

            const firestore = firebase.firestore();

            firestore.collection('menus').doc(currMenuId).update({
              ...values,
              recipes: recipesSelected
            }).then(() => {
                window.alert('Ementa editada com sucesso!');
                // this.props.history.replace("/menus");
            }).catch(err => {
                window.alert('Erro: ', err)
            });
        }

        return ( 
            <>
            <h1 className=''>Editar Ementa</h1>
            {
                this.state.loaded 
                &&
                <Form
                onSubmit={onSubmit}
                initialValues={{
                    name: currMenu.name,
                    creator: currMenu.creator,
                    teams: currMenu.teams
                }}
                mutators={{
                    ...arrayMutators
                }}
                render={({ 
                    handleSubmit, 
                    form: {
                        mutators: { push, pop }
                    }, // injected from final-form-arrays above, 
                    submitting, pristine, values
                }) => 
                (
                    <form onSubmit={handleSubmit}>
                        <TeamsStep values={values} push={push} />
                        <RecipesStep 
                            values={values} recipesList={recipesList} recipesForSelection={recipesForSelection} recipesSelected={recipesSelected} 
                            loaded={this.state.loaded}
                            addRecipeToMenu={this.addRecipeToMenu} rmvRecipeFromMenu={this.rmvRecipeFromMenu} handleRecipeNrPeople={this.handleRecipeNrPeople}
                        />
                        {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                        <Button
                        variant='primary' type='submit'
                        style={{marginRight: '5px'}}
                        >
                            Guardar
                        </Button>
                        <Button
                            variant='outline-primary' type='button' className='' style={{marginRight: '5px'}}
                            onClick={this.handleCSVDownload}
                        >
                            Download
                        </Button>
                        <Button
                            variant='outline-secondary' type='button' 
                            onClick={ () => this.props.history.replace("/menus") }
                        >
                            Cancelar
                        </Button>    
                    </form>
                )}
                />
            }
            </>
        );
    }
}
 
export default withRouter(EditMenu);