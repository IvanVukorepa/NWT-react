import React, { Component } from 'react';
import { Link } from 'gatsby'

import '../styles/Product.css'


function FavoriteText(props) {
    if(props.favorite === false)
        return <div className="favoriteAdd" onClick={ e => props.this.handleFavoriteClick(e)}>ADD to favorite</div>;
    return <div className="favoriteAdd" onClick={ e => props.this.handleFavoriteClick(e)}>Favorite item</div>
}

function RateText(props) {
    if(props.rated === false)
        return(
            <div className="rate">
                <input type="number" min="1" max="5"  onChange={e => props.this.handleInputChange(e)}/> 
                <div className="rateButton" onClick={e => props.this.handleRateClick(props.this.state.product)}>Rate</div>
            </div>
        )
    return <div>Thank you for the rating</div>
}

function Rate(props) {
    let sum = 0;
    props.forEach(element => {
        sum+=element;
    });
    return (sum/props.length).toFixed(2);
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRates: [],
            rate: null,
            disabled: false
        }
    }

    componentDidMount() {
        this.setState({
            allRates: this.props.product.rated,
            disabled: this.props.product.isRated === undefined ? false : this.props.product.isRated
        });
    }

    handleFavoriteClick = (e) => {
        this.props.handleFavoriteClick(this.props.product);
        e.preventDefault();
    }

    handleRateClick = () => {
        
        let rate = parseInt(this.state.rate);
        if(rate >= 1 && rate <= 5){
            this.props.handleRateClick(this.props.product.id, rate);
            this.setState({
                disabled: true
            })
        }
        else
            alert("Invalid value\nValid values are 1-5")
        
    }

    handleInputChange = (e) => {
        this.setState({
            rate: e.target.value
        });
    }

    render() {
      return (
          <Link to="/details" state={{props: this.props.product, rated: this.state.disabled}}>
            <div className="product">
                <div className="productHeader">  
                    <div className="productTitle">
                        {this.props.product.name} 
                    </div>
                    <div className="productRate">
                        Ocjena {Rate(this.props.product.rated)} od 5
                    </div>
                </div>
                <div className="productBody">
                    <div className="productImage">
                        <img src={this.props.product.imgUrl} alt="not found"/>
                    </div>
                    <p className="productText">
                        {this.props.product.text}
                    </p>
                </div>
                <div className="favorite" onClick={e => {e.preventDefault()}}>
                    <FavoriteText favorite={this.props.product.favorite} this={this}/>
                    <div className="rate">
                        <RateText rated={this.state.disabled} this={this}/>
                    </div>
                </div>
            </div>
        </Link>
      );
    }
  }

  export default Product;