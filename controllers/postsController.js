const posts = require("../data/posts");

// Index
const index = (req, res) => {
    res.json(posts);
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
    res.json("Aggiungo un nuovo post ai miei dati");
}

// Update
const update = (req, res) => {
    const postID = req.params.id;
    res.json("Aggiorno tutti i dati di un post con id " + postID);
}

// Modify
const modify = (req, res) => {
    const postID = req.params.id;
    res.json("Aggiorno solo alcuni elementi di un post con id " + postID);
}

// Destroy
const destroy = (req, res) => {
    const postID = req.params.id;
    res.json("Elimino il post con id " + postID);
}

module.exports = {
    index,
    show,
    create,
    update,
    modify,
    destroy
}