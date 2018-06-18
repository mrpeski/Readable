import {combineReducers} from "redux"
import {} from "../actions"


posts = { 
    id: null,
    timestamp: null,
    title: null,
    body: null,
    author: null,
    category: null,
    voteScore: null	
}

postsReducer = (posts, action) => {
    switch(action.type){
        case "":
        default:
            return posts;
    }
}

export {postsReducer}