import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    updateComment, fetchComment
} from '../actions'

class CommentEditForm extends Component {
    state = {
        body: ''
    }
    componentDidMount(){
        const { dispatch, match, comment} = this.props;
        // console.log(comment)
        dispatch(fetchComment(match.params.id));
        this.setState({
            body: comment.body
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { comment } = nextProps;
        console.log(comment)
    }
    handleSubmit = () => {
        const { dispatch, comment } = this.props;
        dispatch(updateComment(comment.id))
    }

    handleChange = (e) => {
        let input;
        e.preventDefault()
        if (!input.value.trim()) {
            return;
        }
        this.setState({
            body: e.target.value
        })
    }

    render(){
        const { comment, store } = this.props;
        // console.log(comment, store);
        return(<div>
            <textarea value={comment.body}></textarea>
                <button onClick={this.handleSubmit}>Update</button>
            </div>)
    }
}

const mapStateToProps = (store, props) => {
    const { commentsReducer } = store;
    const { isFetching, comment } = commentsReducer;
    
    // Object.entries(mappedItems).forEach(([key, value]) => itemsZ.push(value));
    return {
        isFetching, comment, store
    }
}

export default connect(mapStateToProps)(CommentEditForm);