import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

export default class Home extends Component {
    state = {
        categories: '',
        posts: [],
        comments: [],
        sortBy: 'comments',
    }

    handleChange = (e) => {
        var target = e.target
        this.setState({
            sortBy: target.value
        });
        this.sortPosts(this.state.sortBy)
    }

    sortPosts = (by) => {
        const {posts} = this.state;
        if (by === "date") {
            posts.sort(function (a, b) {
                return a.timestamp - b.timestamp;
            })
        } else {
            posts.sort(function (a, b) {
                return a.commentCount - b.commentCount;
            })
        }
        this.setState({posts:  posts})
    }

    componentDidMount = () => {
        const requestHeaders = new Headers();
        requestHeaders.append('Authorization', '234ec567785');

        fetch('http://localhost:3001/categories', { headers: requestHeaders }).then((result) => {
            result.json().then((categories) => { this.setState({ categories }) });
        });

        fetch('http://localhost:3001/posts', { headers: requestHeaders }).then((result) => {
            result.json().then((posts) => { this.setState({ posts }) });
        });

    }

    render() {
        console.log(this.state);
        let { posts, categories, sortBy }  = this.state;
        categories = (Array.isArray(categories.categories)) ? categories.categories : [];
        return (
            <div>
                <ul className="nav">
                    {categories.map((cat, index) => (
                        <Link to={cat.name + '/posts'} key={index}>{cat.name}</Link>
                    ))}
                </ul>

                <a href="/form" className="btn btn-primary">Add New Post</a>
                <p>Sort By:</p>
                <select className="form-control" onChange={this.handleChange}>
                    <option value="comments">
                        No. of Comments
                    </option>
                    <option value="date">
                       Date
                    </option>
                </select>
                {posts.map( (post) => (
                    <div key={post.id}>
                        <span className="badge">{ post.author }</span>
                        <Link to={"posts/"+ post.id }><h4>{ post.title }</h4></Link>
                        <p>{ post.body }</p>
                        <Link to={"posts/" + post.id}><span>{post.commentCount} Comments {post.commentCount > 1}</span></Link>
                        <p>==========================</p>
                        <b>VoteScore:{post.voteScore}</b> <button> Upvote </button>
                        <button> Downvote </button>
                        <p>==========================</p>
                    </div>
                ))}
                
            </div>
        )
    }
}