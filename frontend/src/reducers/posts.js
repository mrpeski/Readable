import { combineReducers } from "redux"
import { } from "../actions"


const posts = {
    id: null,
    timestamp: null,
    title: null,
    body: null,
    author: null,
    category: null,
    voteScore: null
}

const postsReducer = (state = posts, action) => {
    switch (action.type) {
        case '':
            return posts;
        default:
            return posts;
    }
}

export { postsReducer }