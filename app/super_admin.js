const super_admin = require('../models/super_admin');
module.exports = function (app, passport) {
    app.get('/ping', function (req, res) {
        res.status(200).json({ message: "success" });
    });
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
}