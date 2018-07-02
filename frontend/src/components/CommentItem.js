import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    editComment, fetchComment
} from '../actions'

class CommentItem extends Component {
    componentDidMount(){
        const {dispatch} = this.props;
    }

    handleEdit(){
        const {dispatch, comment} = this.props;
        dispatch(fetchComment(comment.id));
    }
    
    render() {
        const {comment} = this.props;
        console.log(comment);
        return (
           <div>
                <p>{comment.body}</p>
                <div>{comment.author}</div>
                <a href={`/edit/comment/${comment.id}`} onClick={this.handleEdit}>Edit</a>
                <button className="btn btn-link">Delete</button>
            </div>
        )
    }
}

// const mapStateToProps = (store, props) => {
    
//     return {
//         postObj
//     }
// }

export default connect()(CommentItem);
