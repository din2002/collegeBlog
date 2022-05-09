const session = require('express-session')
const connection = require('../models/db')
const truncate = require('truncate');

exports.index = (req, res) => {
    connection.query(
        'SELECT * FROM posts',
        (error, results) => {
            res.render('index.ejs', {posts: results, verified: req.session.loggedin, Truncate: truncate});
        }
    );
}

exports.AI = (req, res) => {
    connection.query(
        'SELECT * FROM posts where category="AI"',
        (error, results) => {
            res.render('index.ejs', {posts: results, verified: req.session.loggedin, Truncate: truncate});
        }
    );
}

exports.Cybersecurity = (req, res) => {
    connection.query(
        'SELECT * FROM posts where category="Cybersecurity"',
        (error, results) => {
            res.render('index.ejs', {posts: results, verified: req.session.loggedin, Truncate: truncate});
        }
    );
}

exports.Blockchain = (req, res) => {
    connection.query(
        'SELECT * FROM posts where category="Blockchain"',
        (error, results) => {
            res.render('index.ejs', {posts: results, verified: req.session.loggedin, Truncate: truncate});
        }
    );
}

exports.WebTechnologies = (req, res) => {
    connection.query(
        'SELECT * FROM posts where category="Web Technologies"',
        (error, results) => {
            res.render('index.ejs', {posts: results, verified: req.session.loggedin, Truncate: truncate});
        }
    );
}
exports.Others = (req, res) => {
    connection.query(
        'SELECT * FROM posts where category="Others"',
        (error, results) => {
            res.render('index.ejs', {posts: results, verified: req.session.loggedin, Truncate: truncate});
        }
    );
}

exports.login = (req, res) => {
    if (req.session.loggedin)
    {
        res.redirect('/');
    } else {
        res.render('login.ejs', {verified: req.session.loggedin});
    }
}


exports.edit = (req, res) => {
    if (req.session.loggedin) {
        connection.query(
            'SELECT * FROM posts WHERE id = ?',
            [req.params.id],
            (error, results) => {
                res.render('edit.ejs', {post: results[0], verified: req.session.loggedin});
            }
        );
    }
}

exports.update = (req, res) => {
    if (req.session.loggedin) {
        connection.query(
            'UPDATE posts SET title = ? , img_url = ? , content = ?, category = ? WHERE id = ?',
            [req.body.title,req.body.img_url, req.body.content,req.body.category, req.params.id],
            (error, results) => {
                res.redirect('/');
            }
        );
    }
}

exports.delete = (req, res) => {
    if (req.session.loggedin) {
        connection.query(
            'DELETE FROM posts WHERE id = ?',
            [req.params.id],
            (error, results) => {
                res.redirect('/');
            }
        );
    } else {
        res.send('something went wrong !');
    }
}

exports.new_get = (req, res) => {
    
    if(req.session.loggedin) {
        res.render('new.ejs', {verified: req.session.loggedin});
    } else {
        res.redirect('/login');
    }
}

exports.new_post = (req, res) => {
    console.log(req.body.content.replace(/\n/g, "<br/>"))
    connection.query(
        'INSERT INTO posts(title, img_url, content, post_date,category) VALUES(?, ?, ?, NOW(),?)',
        [req.body.title,req.body.img_url, req.body.content.replace(/\n/g, "<br/>"), req.body.category],
        (error, results) => {
            res.redirect('/');
        }
    );
}

exports.post = (req, res) => {
    connection.query(
        'SELECT * FROM posts WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.render('read.ejs', {post: results[0], verified: req.session.loggedin});
        }
    );
}