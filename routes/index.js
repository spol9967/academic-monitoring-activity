var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb+srv://root:root@ama-ylzfp.mongodb.net/test?retryWrites=true';
const nodemailer = require("nodemailer");




router.post('/update', function (req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    var id = req.body.id;

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var dbo = db.db("mydb");
        dbo.collection('customers').updateOne({ "_id": objectId(id) }, { $set: item }, function (err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            console.log(item);
            db.close();
            var data = [];

            mongo.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var query = {};
                dbo.collection("customers").find(query).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    db.close();
                    res.render('admin', { data: result });
                });
            });
        });
    });
});

router.post('/delete', function (req, res, next) {
    var id = req.body.id;
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('customers').deleteOne({ "_id": objectId(id) }, function (err, result) {
            if (err) throw err;
            db.close();
            console.log('Item deleted');
            var data = [];

            mongo.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var query = {};
                dbo.collection("customers").find(query).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    res.render('admin/directory', { data: result });
                });
            });
        });
    });
});

router.post('/login', function (req, res, next) {
    var isUser = false;
    var allowUser = false;
    var title = req.body.username;
    var content = req.body.password;
    console.log(title, content, req.body);

    var login_data = function (result) {
        console.log(result);
        for (let i = 0; i < result.length; i++) {
            if (title == result[i].title) {
                isUser = true;
            }
        }
        if (isUser) {
            req.session.user = true;
            allowUser = true;

        }
        res.redirect('/student5.html');
    }
    get_data(url, "mydb", "customers", login_data, {});
});
router.post('/add_leave', function (req, res, next) {
    console.log(req.body);
    get_data(url, 'ama', 'leave', leave, { id: req.body.id })
    function leave(leave) {
        if (leave.length) {
            console.log(leave);
            res.send(false);
        } else {
            insert_data(url, 'ama', 'leave', req.body);
            res.send(true);
        }
    }

});
router.post('/add_leave_staff', function (req, res, next) {
    console.log(req.body);
    get_data(url, 'ama', 'leave_staff', leave, { id: req.body.id })
    function leave(leave) {
        if (leave.length) {
            console.log(leave);
            res.send(false);
        } else {
            insert_data(url, 'ama', 'leave_staff', req.body);
            res.send(true);
        }
    }
});
router.get('/get_leave', function (req, res, next) {
    get_data(url, 'ama', 'leave', leave, {})
    function leave(leave) {
        res.send(leave);
    }
});
router.get('/get_leave_staff', function (req, res, next) {
    get_data(url, 'ama', 'leave_staff', leave, {})
    function leave(leave) {
        res.send(leave);
    }
});
router.post('/delete_leave', function (req, res, next) {
    console.log(req.body.id);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ama");
        dbo.collection('leave').deleteOne({ "_id": objectId(req.body.id) }, function (err, result) {
            if (err) throw err;
            db.close();
            console.log('Item deleted');
            res.redirect("student-leave.html");
        });
    });
});
router.post('/delete_leave_staff', function (req, res, next) {
    console.log(req.body.id);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("ama");
        dbo.collection('leave_staff').deleteOne({ "_id": objectId(req.body.id) }, function (err, result) {
            if (err) throw err;
            db.close();
            console.log('Item deleted');
            res.redirect("student-leave.html");
        });
    });
});


router.get('/logout', function (req, res, next) {
    req.session.user = false;
    req.session.student = null;
    req.session.staff = null;
    req.session.admin = null;
    res.redirect('/');
});

router.get('/get_notification', function (req, res, next) {
    get_data(url, 'ama', 'noti', function (result) { res.send(result); }, {});
});

router.post('/add_notification', function (req, res, next) {
    insert_data(url, 'ama', 'noti', req.body);
    res.redirect("add-data.html");
});

router.post('/add_report', function (req, res, next) {
    insert_data(url, 'ama', 'report', req.body);
    res.redirect("staff.html");
});

router.get('/get_report_stu', function (req, res, next) {
    var student = req.session.student.id;
    function report(report) {
        res.send(report);
    }
    get_data(url, 'ama', 'report', report, { "id": student })

});

router.get('/get_report_sta', function (req, res, next) {
    var staff = req.session.staff.id;
    function report(report) {
        res.send(report);
    }
    get_data(url, 'ama', 'report', report, { "id": staff })

});

var get_data = function (url, db_name, collection, fun, query) {
    var return_data;
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

var insert_data = function (url, db_name, collection, data) {

    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        dbo.collection(collection).insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}


module.exports = router;
