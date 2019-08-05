let mysql = require("../config/mysql");
let connection = mysql.mysqlConnection();
let DBHelper = require("../config/functions");

exports.dashboard = ()=>{
const schoolsCount = `select count(*) cnt from schools`;
const usersCount = `select count(*) cnt from users `;
const studentsCount = `select count(*) cnt from students`;
const templateRequest = `select count(*) cnt from template_request where resolved = 0 `;
const creditsCount = `select count(if(type=1,type,null)) email, count(if(type=2,type,null)) mobile, count(if(type=3,type,null)) voice from notify_log `;
}
exports.listOfschools = function () {
    const sql = 'select * from schools where isDeleted=0';
    return DBHelper.getSql(connection, sql)
}
exports.addSchool = function (req) {
    req.user_name += 'admin@';
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
exports.editSchool = function (req,id) {
    const sqlObj = DBHelper.genUpdate("schools",req);
    sqlObj.sql += ' where id = ? ';
    sqlObj.valueArr.push(id);
    return DBHelper.getSql(connection, sqlObj.sql,sqlObj.valueArr);
}
exports.editSchoolPassword = function (req,id) {
    return DBHelper.getSql(connection, 'select user_id from schools where id = ? ', [id],0)
    .then((res)=>{
        const sqlObj = DBHelper.genUpdate("users",req);
        sqlObj.sql += ' where id = ? ';
        sqlObj.valueArr.push(res.user_id);
        return DBHelper.getSql(connection, sqlObj.sql,sqlObj.valueArr);
    })
}
exports.deleteSchool = function (id) {
    return DBHelper.getSql(connection, 'select user_id from schools where id = ? ', [id],0)
    .then((res)=>{
        return DBHelper.getSql(connection, `delete from users where id = ?`,[res.user_id])
    })
    .then(()=>{
        return DBHelper.getSql(connection, 'delete from schools where id = ? ', [id])
    })
}