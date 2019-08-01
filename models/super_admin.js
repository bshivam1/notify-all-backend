let mysql = require("../config/mysql");
let connection = mysql.mysqlConnection();
let DBHelper = require("../config/functions");

exports.listOfschools = function () {
    const sql = 'select * from schools where isDeleted=0';
    return DBHelper.getSql(connection, sql)
}
exports.addSchool = function (req) {
    return userNameAvailability(req.user_name)
        .then(() => {
            //Make user credentials for school management
            const initializeUser = {
                user_name: req.user_name,
                password: req.password,
                type: 'school_management'
            }
            const sql = DBHelper.genInsert('users', initializeUser);
            return DBHelper.getSql(connection, sql.sql, sql.valueArr);
        })
        .then((r) => {
            // Make obj to insert into school
            const initializeSchool = {
                school_name: req.school_name,
                state: req.state,
                city: req.city,
                email_credits: req.email_credits || 0,
                mobile_credits: req.mobile_credits || 0,
                voice_credits: req.voice_credits || 0,
                user_id: r.insertId
            }
            const sql = DBHelper.genInsert('schools',initializeSchool);
            return DBHelper.getSql(connection, sql.sql, sql.valueArr);
        })
}
function userNameAvailability(user_name) {
    const sql = 'select * from users where user_name = ? ;';
    return DBHelper.getSql(connection, sql, [user_name])
        .then((r) => {
            if (r.length == 0) { return true };
            throw 'User name not available';
        })
}
exports.editSchool = function (req) {
    
}