import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ddate } from '../Util'

import {
 upvote, downvote
} from '../actions'


class PostItem extends Component {
    handleUpvote = (e) => {
        e.preventDefault();
        const { dispatch, postObj, index } = this.props
        dispatch(upvote( postObj, index, postObj.id ));
    }
    handleDownvote = (e) => {
        const { dispatch, postObj, index } = this.props
        dispatch(downvote( postObj, index, postObj.id ));
    }
    render () {
        console.log(this.props)
        const {postObj} = this.props;
        return (
        <div key={postObj.id} style={{ backgroundColor: 'whitesmoke', paddingTop: 12, paddingBottom: 24, paddingLeft: 12, paddingRight: 12, marginBottom: 30, marginTop: 30,borderWidth: 1}}>
            <div style={{ float: "left", textAlign: 'center', fontSize: 40, padding: 30, margin: 12}}><b>{postObj.voteScore}</b></div>
            <span className="badge">{postObj.author}</span>
            <Link to={"/posts/" + postObj.id}><h4>{postObj.title}</h4></Link>
            <p>{postObj.body}</p>
            <Link to={"/posts/" + postObj.id}><span>{postObj.commentCount} Comments {postObj.commentCount > 1}</span></Link>
            <br/>
            <button onClick={this.handleUpvote} className="btn btn-default"> Upvote </button>
            <button onClick={this.handleDownvote} className="btn btn-default"> Downvote </button>
        </div>
        );
    }
}

const mapStateToProps = (store, props) => {
    // const { postsReducer } = store;
    // const { post } = postsReducer;
    const { postObj } = props;
    return {
        postObj
    }
}

export default connect(mapStateToProps)(PostItem);