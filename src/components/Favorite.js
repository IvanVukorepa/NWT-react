import React, { Component } from 'react';
import '../styles/Favorite.css'

function Rate(props) {
    let sum = 0;
    props.forEach(element => {
        sum+=element;
    });
    return (sum/props.length).toFixed(2);
}

class Favorite extends Component {
    
    removeFromFavorites = () => {
        this.props.removeFromFavorites(this.props.favorite)
    }

    render() {
        return(
        <div className="favoritesList">
            <div className="favoriteImageContainer">
                <img className="favoriteImage" src={this.props.favorite.imgUrl} alt="not found"/>
            </div>
            <div className="favoriteBody">
                <div className="favoriteTitle">{this.props.favorite.name}</div>
                <div className="favoriteRate"> Ocjena {Rate(this.props.favorite.rated)} od 5</div>
            </div>
            <div className="buttonRemove" onClick={this.removeFromFavorites}>Remove</div>
        </div>
        );
    }
}

export default Favorite;