import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';
import firebase from 'firebase/app';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormBS from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {withRouter} from 'react-router-dom';
import TeamsStep from './TeamsStep';
import RecipesStep from './recipes-step/RecipesStep';
import createShoppingList from '../../scripts/createShoppingList';

class Menus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesSelected: [],
            recipesForSelection: [],
            recipesList: [],
            loaded: false,
            menuNrPeopleList: []
        }
    }

    componentDidMount(){
        let recipesList = [];
    
        const db = firebase.firestore();
        db.collection('recipes').get().then(response => {
            response.docs.forEach(item => {
                let aux = {
                    recipe: item.data(),
                    menuNrPeople: 0
                }
                recipesList.push(aux);
            });

            this.setState({
                loaded: true,
                recipesList: recipesList,
                recipesForSelection: recipesList
            });

            console.log('recipes: ', recipesList)
        });
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

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        const onSubmit = async values => {
            await sleep(300)

            createShoppingList( {...values, recipes: recipesSelected} );

            const firestore = firebase.firestore();
            firestore.collection('menus').add({
              ...values, 
              recipes: recipesSelected
            }).then(() => {
                window.alert('Ementa criada com sucesso!');
                this.props.history.replace("/");
            }).catch(err => {
                window.alert('Erro: ', err)
            });
        }

        return ( 
            <>
            <Form
            onSubmit={onSubmit}
            initialValues={{ }}
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
                    <h1 className=''>Criar Ementa</h1>
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
                    variant='outline-secondary' type='button'
                    className=''
                    >
                        Cancelar
                    </Button>
                </form>
            )}
            />
            </>
        );
    }
}
 
export default withRouter(Menus);