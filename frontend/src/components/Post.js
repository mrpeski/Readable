import React, { Component } from 'react';
import { ddate } from '../Util'
import CommentItem from './CommentItem'
import { connect } from 'react-redux';

import {
    updateComment, fetchComments, fetchPost
} from '../actions'

class Post extends Component {
   
    
    componentDidMount = () => {
        const { match, dispatch } = this.props
        dispatch(fetchPost(match.params.id));
        dispatch(fetchComments(match.params.id));
    }

    render() {
        let {post, comments} = this.props;
        comments = (Array.isArray(comments)) ? comments : [];
        return (
            <div>
                <h3>{post.title}</h3>
                <span>{ddate(post.timestamp)}</span> | 
                <span> {post.author}</span> | 
                <span> {post.voteScore}</span>
                <p>{post.body}</p>
                <a href={"/edit/post/" + post.id }>Edit</a>
                <button className="btn btn-link">Delete</button>
                <ol>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <CommentItem  comment={comment}/>
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


const mapStateToProps = (store, props) => {
    const { postsReducer, commentsReducer } = store;
    const { isFetching, post } = postsReducer;
    const { comments } = commentsReducer;
 
    return {
        isFetching, post, comments
    }
}

export default connect(mapStateToProps)(Post)