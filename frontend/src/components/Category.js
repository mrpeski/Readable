import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Category extends Component {
    state = { posts: []}
    componentDidMount() {

        const { match } = this.props

        const requestHeaders = new Headers();
        requestHeaders.append('Authorization', '234ec567785');
        const url = 'http://localhost:3001/' + match.params.id + '/posts';
        fetch(url, { headers: requestHeaders, }).then((result) => {
            result.json().then((posts) => { this.setState({ posts }) });
        });
    }
    render() {
        let { posts, sortBy } = this.state;
        return (
            <div>
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
                {posts.map((post) => (
                    <div key={post.id}>
                        <span className="badge">{post.author}</span>
                        <Link to={"/posts/" + post.id}><h4>{post.title}</h4></Link>
                        <p>{post.body}</p>
                        <Link to={"/posts/" + post.id}><span>{post.commentCount} Comments {post.commentCount > 1}</span></Link>
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

export { Category }