const school_admin = require('../models/school_admin');

module.exports = function (app, passport) {
    app.get('/sa/staffs/:id', function (req, res) {
        school_admin.getStaffs(req.params.id)
            .then((r) => {
                res.status(200).json({
                    message: "success",
                    data: r
                })
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({
                    message: e
                })
            })
    });
    app.post('/sa/staffs/:id', function (req, res) {
        school_admin.getStaffs(req.params.id,req.body)
            .then((r) => {
                res.status(200).json({
                    message: "success"
                })
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({
                    message: e
                })
            })
    });
    app.get('/sa/templates/:id', function (req, res) {
        school_admin.getStaffs(req.params.id)
            .then((r) => {
                res.status(200).json({
                    message: "success"
                })
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({
                    message: e
                })
            })
    });
    app.post('/sa/templates/:id', function (req, res) {
        school_admin.getStaffs(req.params.id,req.body)
            .then((r) => {
                res.status(200).json({
                    message: "success"
                })
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({
                    message: e
                })
            })
    });
}
