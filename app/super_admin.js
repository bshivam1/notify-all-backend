const super_admin = require('../models/super_admin');
module.exports = function (app, passport) {
    app.get('/a/dashboard', function (req, res) {
        super_admin.dashboard()
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
    //To get school list
    app.get('/a/schools', function (req, res) {
        super_admin.listOfschools()
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
    //To add new school
    app.post('/a/school', function (req, res) {
        super_admin.addSchool(req.body)
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
    })
    //To change school details
    app.put('/a/school/:id', function (req, res) {
        super_admin.editSchool(req.body,req.params.id)
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
    })
    //To update school management password
    app.put('/a/school/password/:id', function (req, res) {
        super_admin.editSchoolPassword(req.body,req.params.id)
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
    })
    //To delete school and user permanently
    app.delete('/a/school/:id', function (req, res) {
        super_admin.deleteSchool(req.params.id)
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
    })
}