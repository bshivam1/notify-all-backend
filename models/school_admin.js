let mysql = require("../config/mysql");
let connection = mysql.mysqlConnection();
let DBHelper = require("../config/functions");

exports.getStaffs = (school_id) => {
    const sql = 'select * from staffs where school_id = ? ';
    return DBHelper.getSql(connection, sql, [school_id]);
}

exports.getTemplates = (school_id) => {
    const sql = 'select * from template_request where school_id = ? ';
    return DBHelper.getSql(connection, sql, [school_id]);
}

exports.addStaff = (school_id, req) => {
    req.user_name += 'staff@';
    return userNameAvailability(req.user_name)
        .then(() => {
            const initializeUser = {
                user_name: req.user_name,
                password: req.password,
                type: 'staff'
            }
            const sql = DBHelper.genInsert('users', initializeUser);
            return DBHelper.getSql(connection, sql.sql, sql.valueArr);
        })
        .then((r) => {
            // Make obj to insert into staff
            const initializeStaff = {
                staff_name: req.name,
                class: req.class,
                section: req.section,
                school_id: school_id || 0,
                user_id: r.insertId
            }
            const sql = DBHelper.genInsert('staffs', initializeStaff);
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

exports.addTemplateRequest = (school_id, req) => {
    const insertOj = {
        school_id: school_id,
        template: req.template,
        type: req.type,
    }
    const sql = DBHelper.genInsert('template_requests', initializeStaff);
    return DBHelper.getSql(connection, sql.sql, sql.valueArr);
}

exports.editStaff = function (req,id) {
    const sqlObj = DBHelper.genUpdate("staffs",req);
    sqlObj.sql += ' where id = ? ';
    sqlObj.valueArr.push(id);
    return DBHelper.getSql(connection, sqlObj.sql,sqlObj.valueArr);
}

exports.editStaffPassword = function (req,id) {
    return DBHelper.getSql(connection, 'select user_id from staffs where id = ? ', [id],0)
    .then((res)=>{
        const sqlObj = DBHelper.genUpdate("users",req);
        sqlObj.sql += ' where id = ? ';
        sqlObj.valueArr.push(res.user_id);
        return DBHelper.getSql(connection, sqlObj.sql,sqlObj.valueArr);
    })
}

exports.deleteSchool = function (id) {
    return DBHelper.getSql(connection, 'select user_id from staffs where id = ? ', [id],0)
    .then((res)=>{
        return DBHelper.getSql(connection, `delete from users where id = ?`,[res.user_id])
    })
    .then(()=>{
        return DBHelper.getSql(connection, 'delete from staffs where id = ? ', [id])
    })
}