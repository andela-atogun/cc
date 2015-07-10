var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var _ = require('lodash')


function isAuthenticated (req, res, next) {

  if(req.method === "GET"){
    return next();
  }
  if (req.isAuthenticated()){
    return next();
  }
  return res.redirect('/#login');
}

//Register the authentication middleware
router.use('/posts', isAuthenticated);
// router.use('/users', isAuthenticated);
router.route('/posts')
  //creates a new post
  .post(function(req, res){

    var post = new Post();
    post.text = req.body.text;
    post.created_by = req.body.created_by;
    post.save(function(err, post) {
      if (err){
        return res.send(500, err);
      }
      return res.json(post);
    });
  })
  //get all posts
  .get(function(req, res){
    Post.find(function(err, posts){
      if(err){
        return res.send(500, err);
      }
      return res.send(200,posts);
    });
  });

router.route('/posts/:id')
  //get specified post
  .get(function(req, res){
    Post.findById(req.params.id, function(err, post){
      if(err)
        res.send(err);
      res.json(post);
    });
  })
  //update specified post
  .put(function(req, res){
    Post.findById(req.params.id, function(err, post){
      if(err)
        res.send(err);
      post.created_by = req.body.created_by;
      post.text = req.body.text;

      post.save(function(err, post){
        if(err)
          res.send(err);

        res.json(post);
      });
    });
  })
  .delete(function(req, res) {
    Post.remove({
      _id: req.params.id
    }, function(err) {
      if (err)
        res.send(err);
      res.json("deleted :(");
    });
  });

router.route('/users')
  .get(function (req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(500,err);
      }
      return res.send(200,users);
    });
  });
  router.route('/users/me')
    .get(function (req, res){
      console.log(req);
      res.send(req.user || null);
    })
    .put(function (req, res) {
      User.findById(req.user._id, function(err, user) {
        if (err) {
          return res.send(err)
        }
        console.log(user.username)
        user.username = req.body.username;

        user.save(function(err, post){
          if(err)
            res.send(err)
          return res.json(user);
        })
      })
    })

module.exports = router;
