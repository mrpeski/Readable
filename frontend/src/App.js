import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import {Category} from './components/Category';
import {Post} from './components/Post';
import {FormPage} from './components/FormPage';


class App extends Component {
  state = {
    categories: {}
  }
  componentDidMount = () => {
      const requestHeaders = new Headers();
      requestHeaders.append('Authorization', '234ec567785');

      fetch('http://localhost:3001/categories', { headers: requestHeaders }).then((result) => {
        result.json().then((categories) => { this.setState({ categories }) });
      });
  }
  render() {
    return (
      <div className="App">
          <div className="navbar">
            <Link to="/" className="nav-link">Home</Link>
          </div>
          <div className="container">
            <div className="row">
              <Route exact path="/" component={Home}/>
              <Route exact path="/posts/:id" component={Post}/>
              <Route exact path="/:id/posts" component={Category}/>
              <Route exact path="/form" component={FormPage}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
