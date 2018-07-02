import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';

import { fetchPostsByCat } from '../actions'

class Category extends Component {
    state = { posts: []}
    componentDidMount() {

        const { match, dispatch } = this.props
        const category = match.params.id;
        dispatch(fetchPostsByCat(category));
    }
    render() {
        let { posts, sortBy } = this.state;
        const { itemsZ } = this.props;
        return (
            <div className="col-lg-12">
                <a href="/form" className="btn btn-primary" style={{ marginBottom: 20 }}>Add New Post</a>
                <p style={{ marginBottom: 0 }}>Sort By:</p>
                <select className="form-control" onChange={this.handleChange}>
                    <option value="comments">
                        No. of Comments
                    </option>
                    <option value="date">
                        Date
                    </option>
                </select>
                {itemsZ.map((post, index) => (
                    <PostItem postObj={post} key={post.id} index={index} />
                ))}
            </div>
        )
    }

}

const mapStateToProps = (store, props) => {
    const { postsReducer } = store;
    const { isFetching, mappedItems } = postsReducer;
    let itemsZ = [];
    Object.entries(mappedItems).forEach(([key, value]) => itemsZ.push(value));
    return {
        isFetching, itemsZ
    }
}

export default connect(mapStateToProps)(Category)