import React, { Component } from 'react';
import './App.css';
import MovieSearch from './MovieSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Movie Search</h1>
        <MovieSearch />
      </div>
    );
  }
}

export default App;
