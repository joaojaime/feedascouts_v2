import React, { Component } from 'react';

import firebase from 'firebase/app';
import { RecipeCard } from './RecipeCard';
import RecipeModal from '../recipe-modal/RecipeModal';

class RecentRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipesList: [],
            loaded: false,
            showModal: false
        }
    }

    componentDidMount(){
        let recipesList = [];
    
        const db = firebase.firestore();
        db.collection('recipes').get().then(response => {
            response.docs.forEach(item => {
                let aux = {
                    recipe: item.data(),
                    menuNrPeople: 0,
                    id: item.id
                }
                recipesList.push(aux);
            });

            this.setState({
                loaded: true,
                recipesList: recipesList,
            });
        });
    }

    handleInfoBtn = (id) => {

        const db = firebase.firestore();
        db.collection("recipes").doc(id)
            .get()
            .then( (response) => {
                let recipe; 
                recipe = {
                    ...response.data(),
                    id: response.id
                };

                this.setState({ 
                    showModal: true,
                    currModalRecipe: recipe 
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }

    handleModalClose = () => {
        this.setState({ 
            showModal: false
        });
    }

    renderRecipesForSelection = () => 
        this.state.recipesList.map( item => 
            <RecipeCard key={item.recipe.id} recipeObj={item} handleClick={this.handleInfoBtn} /> )

    render() { 

        let loaded = this.state.loaded;
        let showModal = this.state.showModal;

        return (
            <>
            <h4>Últimas receitas adicionadas</h4>
            {loaded && this.renderRecipesForSelection()}
            {
                showModal &&
                <RecipeModal show={true} recipe={this.state.currModalRecipe} handleClose={this.handleModalClose} />
            }
            </>
        );
    }
}
 
export default RecentRecipes;