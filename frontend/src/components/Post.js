import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class Post extends Component {
    // constructor() {
    //     super();
    //     this.match = this.props.match; 
    // }
    state = {
        post: {},
        comments: {}
    }
    componentDidMount = () => {
        
        const { match } = this.props
        const requestHeaders = new Headers();
        requestHeaders.append('Authorization', '234ec567785');
        const url = 'http://localhost:3001/posts/' + match.params.id;
        fetch(url, { headers: requestHeaders }).then((res) => {
            res.json().then((post) => ( this.setState({ post })));
        });
        const commentUrl = url + '/comments'
        fetch(commentUrl, { headers: requestHeaders }).then((res) => {
            res.json().then((comments) => (this.setState({ comments })));
        });
    }
    render() {
        let {post, comments} = this.state;
        comments = (Array.isArray(comments)) ? comments : [];
        console.log(comments)
        return (
            <div>
                <h3>{post.title}</h3>
                <span>{post.timestamp}</span>
                <span>{post.author}</span>
                <p>{post.body}</p>
                <a href="">Edit</a>
                <button className="btn btn-link">Delete</button>
                <ol>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <p>{comment.body}</p>
                            <div>{comment.author}</div>
                            <a href="">Edit</a>
                            <button className="btn btn-link">Delete</button>
                        </li>
                    ))}
                </ol>
                <form>
                    <h5>Add Comment</h5>
                    <div className="form-group">
                        <textarea className="form-control" style={{ height: 250}}></textarea>  
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export { Post }