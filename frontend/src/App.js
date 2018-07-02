import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Post from './components/Post';
import {FormPage} from './components/FormPage';
import {EditPage} from './components/EditPage';
import CommentEditForm from './components/CommentEditForm';


class App extends Component {
  state = {
    categories: []
  }

  componentDidMount = () => {
      const requestHeaders = new Headers();
      requestHeaders.append('Authorization', '234ec567785');

      fetch('http://localhost:3001/categories', { headers: requestHeaders }).then((result) => {
        result.json().then((categories) => { this.setState({ categories }) });
      });
  }
  render() {
    const { categories } = this.state;
    const cats = (Array.isArray(categories.categories)) ? categories.categories : [];
    return (
      <div className="App">
          <div className="navbar">
          <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
            {cats.map((cat, index) => (
              <li className="nav-item">
                <Link to={'/' + cat.name + '/posts'} key={index} className="nav-link">{cat.name}</Link>
              </li>
            ))}
          </ul>
          </div>

          <div className="container">
            <div className="row">
              
              <Route exact path="/" component={Home}/>
              <Route exact path="/posts/:id" component={Post}/>
              <Route exact path="/:id/posts" component={Category}/>
              <Route exact path="/form" component={FormPage}/>
              <Route exact path="/edit/post/:id" component={EditPage}/>
              <Route exact path="/edit/comment/:id" component={CommentEditForm}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
