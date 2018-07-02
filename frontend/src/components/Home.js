import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from './PostItem';

import {
    fetchPostsCat,
    fetchPosts, upvote, fetchPost, sortPosts
} from '../actions'

class Home extends Component {

    state = {
        categories: '',
        posts: [],
        sortBy: 'comments',
    }

    handleChange = (e) => {
        const { dispatch } = this.props;
        var target = e.target
        this.setState({
            sortBy: target.value
        });
        dispatch(sortPosts(this.state.sortBy));
    }

    sortPosts = (by) => {
        const {itemsZ} = this.props;
        let posts = itemsZ;
        if (by === "date") {
            posts.sort(function (a, b) {
                return a.timestamp - b.timestamp;
            })
        } else if (by === "votescore") {
            posts.sort(function (a, b) {
                return a.voteScore - b.voteScore;
            })
        }
        else {
            posts.sort(function (a, b) {
                return a.commentCount - b.commentCount;
            })
        }
        this.setState({posts:  posts})
    }

    componentDidMount = () => {
        const { dispatch } = this.props
        dispatch(fetchPosts());
        dispatch(fetchPostsCat());
    }
    
    render() {
        const {isFetching, itemsZ, categories } = this.props;
        let { sortBy }  = this.state;
        const cats = (Array.isArray(categories.categories)) ? categories.categories : [];
        console.log(this.state);
        return (
            <div className="col-lg-12">
                <a href="/form" className="btn btn-primary" style={{ marginBottom: 20}}>Add New Post</a>
                <p style={{ marginBottom: 0 }}>Sort By:</p>
                <select className="form-control" onChange={this.handleChange}>
                    <option value="comments">
                        No. of Comments
                    </option>
                    <option value="votescore">
                        Votes
                    </option>
                    <option value="date">
                       Date
                    </option>
                </select>
                {itemsZ.map( (post, index) => (
                    <PostItem postObj={post} key={post.id} index={index}/>
                ))}
                
            </div>
        )
    }
}

const mapStateToProps = (store, props) => {
    const { postsReducer } = store;
    const { isFetching,lastUpdated, categories,  mappedItems, items } = postsReducer;
    let itemsZ = [];
    Object.entries(mappedItems).forEach(([key, value]) => itemsZ.push(value)); 
    return {
        isFetching, lastUpdated, categories, mappedItems, itemsZ, items
    }
}

export default connect(mapStateToProps)(Home);