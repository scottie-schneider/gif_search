import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';
import axios from 'axios';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cats') => {
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC`)
    .then(response => {
      this.setState( {
        gifs: response.data.data,
        loading: false
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch}/>
          </div>
        </div>
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs}/>
          }
        </div>
      </div>
    );
  }
}
