var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb+srv://root:root@ama-ylzfp.mongodb.net/test?retryWrites=true';

router.post('/admin_login', function (req, res, next) {
  get_data(url, "ama", "admin", admin_login,{"id":req.body.username});
  function admin_login(result){
    if(result[0].password == req.body.password){
      req.session.student = result[0];
      res.redirect("/dashboard.html");
    }else{
      res.redirect("/");
    }
  }
      
});

router.get('/get_admin', function (req, res) {
  res.send(req.session.admin);
});

var get_data = function (url, db_name, collection, fun, query) {
  mongo.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(db_name);
      dbo.collection(collection).find(query).toArray(function (err, result) {
          if (err) throw err;
          db.close();
          fun(result);
      });
  });
};

module.exports = router;

