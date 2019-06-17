import React, { Component } from 'react';

import firebase from 'firebase/app';
import RecipeModal from '../recipe-modal/RecipeModal';
import { MenuCard } from './MenuCard';

class RecentMenus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menusList: [],
            loaded: false,
            showModal: false
        }
    }

    componentDidMount(){
        let menusList = [];
    
        const db = firebase.firestore();
        db.collection('menus').get().then(response => {
            response.docs.forEach(item => {
                menusList.push(
                    {
                        ...item.data(),
                        id: item.id
                    }
                );
            });

            this.setState({
                loaded: true,
                menusList: menusList,
            });
        });
    }

    handleModalClose = () => {
        this.setState({ 
            showModal: false
        });
    }

    renderMenusList = () => 
        this.state.menusList.map( item => 
            <MenuCard key={item.id} menu={item} /> )

    render() { 

        let loaded = this.state.loaded;
        let showModal = this.state.showModal;

        return (
            <>
            <h4>Últimas ementas editadas</h4>
            {loaded && this.renderMenusList()}
            {
                showModal &&
                <RecipeModal show={true} recipe={this.state.currModalRecipe} handleClose={this.handleModalClose} />
            }
            </>
        );
    }
}
 
export default RecentMenus;