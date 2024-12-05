const { log } = require("console");
const posts = require("../data/posts");

// Index
const index = (req, res) => {
    let postDaVisualizzare = posts;

    const queryString = req.query;
    if(queryString.tag !== undefined){
        //faccio un filtro
        const post = posts.filter((curPost) => curPost.tags.includes(queryString.tag));
        res.json(post);
    }else{
        res.json(postDaVisualizzare);
    } 
}

// Show
const show = (req, res) => {
    const postID = parseInt(req.params.id);
    const post = posts.find(p => p.id === postID);
    if(post){
        res.json(post);
    }else{
        res.statusCode = 404;
        res.json({
            error : true,
            messagge : 'post non trovato'
        })
    }
}

// Create
const create =  (req, res) => {
    const newPost = req.body;

    newPost.id = posts[posts.length - 1].id + 1;
    posts.push(newPost);

    res.statusCode = 201;
    res.json(newPost);
}

// Update
const update = (req, res) => {
    const postID = parseInt(req.params.id);
    const postToUpdate = req.body;
    // Indice elemento da modificare
    const indexToUpdate = posts.findIndex(curPost => curPost.id === postID);
    // Aggiorno la chiave id dell'elemento da aggiornare
    postToUpdate.id = postID;
    
    if(indexToUpdate === -1){
        res.statusCode = 404;
        res.json({
            error : true,
            messagge : "elemento non trovato"
        })
    }else{
        posts[indexToUpdate] = postToUpdate;
        res.json(postToUpdate);
    }
}

// Modify
const modify = (req, res) => {
    const postID = parseInt(req.params.id);
    const postToModify = req.body;
    
    const post = posts.find(curPost => curPost.id === postID);

    if(post){
        if(postToModify.title !== undefined) post.title = postToModify.title;
        if(postToModify.content !== undefined) post.content = postToModify.content;
        if(postToModify.image !== undefined) post.image = postToModify.image;
        if(postToModify.tags !== undefined) post.tags = postToModify.tags;

        res.json({
            post,
            messagge : "Post modificato con successo"
        })
    }else{
        res.statusCode = 404;
        res.json({
            error : true,
            messagge : "Post non trovato"
        })
    }
}

// Destroy
const destroy = (req, res) => {
    const postID = parseInt(req.params.id);
    const indexElementoDaCancellare = posts.findIndex((curPost) => curPost.id === postID);
    if(indexElementoDaCancellare !== -1){
        posts.splice(indexElementoDaCancellare, 1);
        console.log(posts);
        res.sendStatus(204);
    }else{
        res.statusCode = 404;
        res.json({
            error : true,
            messagge : 'Post non trovato'
        })
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    modify,
    destroy
}