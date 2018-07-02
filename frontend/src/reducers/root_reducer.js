import { postsReducer } from './posts'
import { commentsReducer } from './comments'

import { combineReducers } from 'redux'


export default combineReducers({
    postsReducer, commentsReducer
})