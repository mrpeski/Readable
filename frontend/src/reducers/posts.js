import {
    UPVOTE, DOWNVOTE, RECEIVE_CATEGORIES, 
    RECEIVE_POSTS, RECEIVE_POST, SORT_POSTS
} from '../actions'

const store = {
    isFetching: false,
    items: [],
    post: {},
    mappedItems: {},
    categories: [],
    lastUpdated: null,
}

const postsReducer = (state = store, action) => {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                categories: action.categories
            })
        case RECEIVE_POSTS:
            let obj = {};
            if (action.posts) {
                for (let post of action.posts) {
                    const post_id = post.id;
                    obj[post_id] = post;
                }
            }
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts,
                mappedItems: obj,
                lastUpdated: action.receivedAt
            })
        case SORT_POSTS:
        let posts = state.items;
                switch (action.by) {
                    case "date":
                        posts.sort(function (a, b) {
                            return a.timestamp - b.timestamp;
                        })
                        break;
                    case "votescore":
                        posts.sort(function (a, b) {
                            return a.voteScore - b.voteScore;
                        })
                        break;
                    default:
                        posts.sort(function (a, b) {
                            return a.commentCount - b.commentCount;
                        })
                        break;
                }
            let o = {};
            if (posts) {
                for (let post of posts) {
                    const post_id = post.id;
                    o[post_id] = post;
                }
            }
            return Object.assign({}, state, {
                mappedItems: o,
            })
               
        case RECEIVE_POST:
            return Object.assign({}, state, {
                post: action.post,
            })
        case UPVOTE:
            const voteScore = action.post.voteScore;
            const id = action.id;
            const items = state.mappedItems;
            items[id] = {
                ...items[id],
                voteScore: voteScore + 1
            }
            return {
                ...state,
                mappedItems: items
            }
        case DOWNVOTE:
            const vScore = action.post.voteScore;
            const pid = action.id;
            let itemsZ = state.mappedItems;
            itemsZ[pid] = {
                ...itemsZ[pid],
                voteScore: vScore - 1
            }
            return {
                ...state,
                mappedItems: itemsZ
            }
        default:
            return state;
    }
}

export { postsReducer }

