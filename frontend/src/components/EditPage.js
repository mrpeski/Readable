import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class EditPage extends Component {
    // id - UUID should be fine, but any unique id will work
    // timestamp - timestamp in whatever format you like, you can use Date.now() if you like
    // title - String
    // body - String
    // author - String
    // category: Any of the categories listed in categories.js.Feel free to extend this list as you desire.

    state = {

        data: {
            id: Math.round(Math.random() * 10000),
            timestamp: Date.now(),
            title: '',
            body: '',
            author: '',
            category: 'react',
        },
        categories: '',
    }

    componentDidMount() {
        let requestHeaders = new Headers();
        requestHeaders.append('Authorization', '234ec567785');
        // /categories
        fetch('http://localhost:3001/categories', { headers: requestHeaders, }).then((result) => {
            result.json().then((categories) => { this.setState({ categories }) });
        });

        const { match } = this.props
        let requestHeaders2 = new Headers();
        requestHeaders2.append('Authorization', '234ec567785');
        const url = 'http://localhost:3001/posts/' + match.params.id;
        fetch(url, { headers: requestHeaders2 }).then((res) => {
            res.json().then((post) => (this.setState((prevState) => {
                return {
                    ...prevState,
                    data: post
                }
            })));
        });
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name
        this.setState((prevState) => {
            return {
                ...prevState,
                data: { ...prevState.data, [name]: target.value }
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.state.data;
        data = JSON.stringify(data);
        const requestHeaders = new Headers();
        requestHeaders.append('Authorization', '234ec567785');
        requestHeaders.append('method', 'POST');
        requestHeaders.append('body', data);


        fetch('http://localhost:3001/posts', { headers: requestHeaders }).then((res) => {
            console.log(res);
            console.log("Done!");
        });

    }

    render() {
        let { categories } = this.state;
        categories = (categories) ? categories.categories : [];
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            value={this.state.data.title}
                            name="title" placeholder="Title" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="author"
                            value={this.state.data.author}
                            placeholder="Author" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <select className="form-control" name="category"
                            value={this.state.data.category}
                            placeholder="Category" onChange={this.handleChange}>
                            {categories.map((cat, index) => (
                                <option value={cat.name} key={index}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" name="body" style={{ width: 500, height: 300 }}
                            value={this.state.data.body}
                            onChange={this.handleChange}></textarea>
                    </div>
                    <button className="btn btn-primary" >Add New</button>
                </form>
            </div>
        )
    }

}

export { EditPage }