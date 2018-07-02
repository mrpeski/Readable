export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';


export const editComment = (id, body) => {
    return {
        type: EDIT_COMMENT,
        id: id,
        body: body
    }
}

export const sortPosts = (by) => {
    return {
        type: SORT_POSTS,
        by: by
    }
}

export const receiveComment = (json) => {
    return {
        type: RECEIVE_COMMENT,
        comment: json
    }
}
export const updateComment = (id, body) => {
    return {
        type: UPDATE_COMMENT,
        id: id,
        body: body
    }
}
export const receivePost = (json) => {
    return {
        type: RECEIVE_POST,
        post: json
    }
}
export function receiveCategories(json) {
    return {
        type: RECEIVE_CATEGORIES,
        categories: json,
        receivedAt: Date.now()
    }
}
export function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        posts: json,
        receivedAt: Date.now()
    }
}
export function receiveComments(json) {
    return {
        type: RECEIVE_COMMENTS,
        comments: json,
        receivedAt: Date.now()
    }
}

export const upvote = ( post, index, id ) => {
    return { type: UPVOTE, post, index, id };
}
export const downvote = ( post, index, id ) => {
    return { type: DOWNVOTE, post, index, id };
}

export const fetchPostsCat = () => { 
    return dispatch => {
            const requestHeaders = new Headers();
            requestHeaders.append('Authorization', '234ec567785');
            fetch('http://localhost:3001/categories', { headers: requestHeaders })
            .then((result) => { 
                result.json().then( json => dispatch(receiveCategories(json)));
        });
    }
}
export const fetchPost = (id) => { 
    return dispatch => {
            const requestHeaders = new Headers();
            requestHeaders.append('Authorization', '234ec567785');
            fetch(`http://localhost:3001/posts/${id}`, { headers: requestHeaders })
            .then((result) => { 
                result.json().then( json => dispatch(receivePost(json)));
        });
    }
}
export const fetchPosts = () => { 
    return dispatch => {
            const requestHeaders = new Headers();
            requestHeaders.append('Authorization', '234ec567785');
            fetch('http://localhost:3001/posts', { headers: requestHeaders })
            .then((result) => { 
                result.json().then( json => dispatch(receivePosts(json)));
        });
    }
}
export const fetchPostsByCat = (category) => { 
    return dispatch => {
            const requestHeaders = new Headers();
            requestHeaders.append('Authorization', '234ec567785');
            const url = 'http://localhost:3001/' + category + '/posts';
            fetch(url, { headers: requestHeaders, }).then((result) => {
                result.json().then((posts) => dispatch(receivePosts(posts)));
            });
    }
}

export const fetchComment = (id) => { 
    return dispatch => {
            const requestHeaders = new Headers();
            requestHeaders.append('Authorization', '234ec567785');
        fetch(`http://localhost:3001/comments/${id}`, { headers: requestHeaders })
            .then((result) => { 
                result.json().then( json => dispatch(receiveComment(json)));
        });
    }
}
export const fetchComments = (id) => { 
    return dispatch => {
            const requestHeaders = new Headers();
            requestHeaders.append('Authorization', '234ec567785');
        fetch(`http://localhost:3001/posts/${id}/comments`, { headers: requestHeaders })
            .then((result) => { 
                result.json().then( json => dispatch(receiveComments(json)));
        });
    }
}

