import { RECEIVE_COMMENT, RECEIVE_COMMENTS } from '../actions'

let initialState = {
    comment: {},
    isFetching: false,
    comments: []
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {
                isFetching: false,
                comment: action.comment,
            })
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                comments: action.comments,
            })
        default:
            return state;
        }
    }

export { commentsReducer }