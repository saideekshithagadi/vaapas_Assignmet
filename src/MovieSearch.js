import React, { Component } from 'react';

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      movies: [],
      dogImage: '',
      loading: false,
      error: null,
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    this.setState({ loading: true, error: null });
    fetch(`https://openlibrary.org/search.json?q=${this.state.query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ movies: data.docs, loading: false });
        this.fetchDogImage();
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  fetchDogImage = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ dogImage: data.message });
      })
      .catch((error) => {
        console.error('Error fetching dog image:', error);
      });
  };

  render() {
    const { query, movies, dogImage, loading, error } = this.state;

    return (
      <div>
        <input
          type="text"
          value={query}
          onChange={this.handleInputChange}
          placeholder="Enter movie name"
        />
        <button onClick={this.handleSearch}>Search</button>
        <br/>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {dogImage && <img src={dogImage} alt="A random dog" />}
        <ul>
          {movies.map((movie) => (
            <li key={movie.key}>
              <h3>{movie.title}</h3>
              <p>Author: {movie.author_name?.join(', ')}</p>
              <p>First Published: {movie.first_publish_year}</p>
            </li>
          ))}
        </ul>
       
      </div>
    );
  }
}

export default MovieSearch;
