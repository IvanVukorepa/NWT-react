import React, { Component } from 'react';
import { Link } from 'gatsby'

import '../styles/cssreset.css'
import '../styles/details.css'

function Rate(props) {
    if(props){
        let sum = 0;
        props.forEach(element => {
            sum+=element;
        });
        return (sum/props.length).toFixed(2);
    }
    return null;
}

function FavoriteText(props) {
    if(props.favorite === false)
        return <div className="favoriteAdd" onClick={props.this.handleFavoriteClick}>ADD to favorite</div>;
    return <div className="favoriteAdd" onClick={props.this.handleFavoriteClick}>Favorite item</div>
}

function RateText(props) {
    if(props.rated === false)
        return(
            <div>
                <input type="number" min="1" max="5" onChange={e => props.this.handleInputChange(e)}/> 
                <div className="rateButton" onClick={e => props.this.handleRateClick(e, props.this.state.product)}>Rate</div>
            </div>
        )
    return <div>Thank you for the rating</div>
}

class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            product: {},
            comments: [],
            rated: Boolean,
            rate: null
        }
    }

    componentDidMount = () => {
        this.setState({
            product: this.props.location.state.props,
            comments: this.props.location.state.props.comments,
            rated: this.props.location.state.rated
        });
    }

    handleRateClick = (e, product) => {
        let rate = parseInt(this.state.rate);

        if(rate >= 1 && rate <= 5){
            product.rated.push(rate);
            this.setState({
                product: product,
                rated: true
            })

        }
        else
            alert("Invalid value\nValid values are 1-5")
            
    }

    handleFavoriteClick = () => {
        let product = this.state.product;
        product.favorite = !product.favorite;
        this.setState({
            product: product
        });
    }

    handleInputChange = (e) => {
        this.setState({
            rate: e.target.value
        });
    }

    render(){
        return(
        <div className="body">
            <Link className="backButton" to="/" state={{product: this.state.product, isRated: this.state.rated}}>Go Back</Link>
            <div className="details">
                <div className="detailsHeader">
                <div className="detailsTitle">{this.state.product.name}</div>
                <div className="detailsRating">Ocjena {Rate(this.state.product.rated)} od 5</div>
                </div>
                <div className="detailsBody">
                <img className="detailsImage" src={this.state.product.imgUrl} alt="as"/>
                <div className="detailsDescription">
                    {this.state.product.text}
                </div>
                </div>
                <div className="favorite">
                    <FavoriteText favorite={this.state.product.favorite} this={this}/>
                <div className="rate">
                    <RateText rated={this.state.rated} this={this}/>
                </div>
                </div>
                <div className="detailsComments">
                    Recenzije:
                    {this.state.comments.map(comment => {
                        return(
                        <div key={comment.id} className="detailsComment">
                            <div className="detailsCommentUserName">{comment.username}</div>
                            <div className="detailsCommentRating">{comment.rating}</div>
                            <div className="detailsCommentText">
                                {comment.comment}
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
        );
    }
}

export default Details;

