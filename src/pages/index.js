import React, { Component } from 'react';

import Product from '../components/Product.js'
import Favorite from '../components/Favorite.js';

import '../styles/index.css'
import '../styles/cssreset.css'


var jsonData = require('../products.json');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      favorites: [],
      filteredProducts: []
    }
  }

  handleFavoriteClick = (product) => {
      let pr = this.state.allProducts.map((p) =>{
          if(p.id === product.id)
            p.favorite = !p.favorite;
          return p;
      })
      let fav = this.state.favorites;
      let f = fav.find((el) => el.id === product.id);
      if(f === undefined){
        fav.push(product);
      }
      else{
        var index = fav.indexOf(f);
        fav.splice(index, 1);
      }
      this.setState({
        filteredProducts: pr,
        favorites: fav
      });
  }

  handleRateClick = (id, rate) => {
    let products = this.state.filteredProducts;

    var index = products.findIndex(product => product.id === id);

    products[index].rated.push(rate);
    products[index].isRated = true;

    this.setState({
      filteredProducts: products
    })
  }

  filterProducts = (e) => {
      let string = e.target.value;
      let products = this.state.allProducts;
      let filteredProducts = products.filter((el) => {
        return el.name.toLowerCase().includes(string.toLowerCase()) === true;
      });
      this.setState({
        filteredProducts: filteredProducts
      });
  }

  componentDidMount() {
    let products = jsonData;

    if(this.props.location.state){
      var product = this.props.location.state.product;
      if(product){
        let p = products.find((el) => el.id === product.id);
        var index = products.indexOf(p);
        product.isRated = this.props.location.state.isRated;
        products[index] = product;
      }
    }

    let fav = products.filter((e) => {
      return e.favorite === true;
    })

    this.setState({
      allProducts: products,
      favorites: fav,
      filteredProducts: products
    })
  }

  render() {
    return (
      <div className="App">

        <div className="appBody">
          <div className="search">
            <input className="searchInput" placeholder="Search" onChange={(e) => this.filterProducts(e)}/>
          </div>
          <div className="products">
            {this.state.filteredProducts.map((product) =>{
                return (
                <Product key={product.id} product={product} handleFavoriteClick={this.handleFavoriteClick} handleRateClick={this.handleRateClick}/>
                );
            })}
          </div>
          <div className="favorites">
            <div className="favoritesHeader">Favoriti</div>
            {this.state.favorites.map((favorite) => {
              return <Favorite key={favorite.id} favorite={favorite} removeFromFavorites={this.handleFavoriteClick}/>
            })} 
          </div>
        </div>     
      </div>
    );
  }
}

export default App;
