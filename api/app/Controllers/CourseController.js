const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

let count = 0;

class CourseController {
    constructor() {
        console.log('Constructor of CourseController is called.');
    }

    async allGECoursesForTerm(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT cb.term             term,
                               cb.subject          subject,
                               cb.catalog          catalog,
                               cb.course_title     course_title,
	                       cb.department       department,
                               cb.units
                        FROM 
                            course_base cb
                        WHERE 
	                    cb.ge_designation IS NOT NULL AND
                            cb.term = ? 
	                ORDER BY cb.term, cb.subject, cb.catalog, cb.units
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.term, ctx.params.subject]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in CourseController::allCourses", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }



    async allCoursesBySubject(ctx) {
        return new Promise((resolve, reject) => {
            console.log()
                        let query = `SELECT * FROM course_catalog WHERE subject = ? AND catalog = ?`;
            console.log(query);
            dbConnection.query({
                sql: query,
                values: [ctx.params.subject, ctx.params.catalog]
            }, (error, tuples) => {
                if (error) {
                    return reject(`Error when trying to retrieve course descriptions for ${subject} --- 
                                        in courseDescriptionsForSubject. The error msg: ${error}`);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            })
        }).catch(err => {
            console.log(`Error in courseDescriptionsForSubject for subject ${subject}: ${err}`);
            ctx.body = {error: err};
            ctx.status = "Failed";
        });
    }

    async allCoursesForTerm(ctx) {
        return new Promise((resolve, reject) => {
            console.log();
            const subject = ctx.params.term;
            let query = `SELECT * FROM course_catalog WHERE term = ?`;
            console.log(query);
            dbConnection.query({
                sql: query,
                values: [subject]
            }, (error, tuples) => {
                if (error) {
                    return reject(`Error when trying to retrieve course descriptions for ${term} --- 
                                        in courseDescriptionsForSubject. The error msg: ${error}`);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            })
        }).catch(err => {
            console.log(`Error in courseDescriptionsByTerm for subject ${term}: ${err}`);
            ctx.body = {error: err};
            ctx.status = "Failed";
        });
    }

    async allCourses(ctx) {
        return new Promise((resolve, reject) => {
            console.log();
            let query = `SELECT * FROM course_catalog`;
            console.log(query);
            dbConnection.query({
                sql: query,
                values: [subject]
            }, (error, tuples) => {
                if (error) {
                    return reject(`Error when trying to retrieve course descriptions --- 
                                        in allCourses. The error msg: ${error}`);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            })
        }).catch(err => {
            console.log(`Error in allCourses: ${err}`);
            ctx.body = {error: err};
            ctx.status = "Failed";
        });
    }

    async allCoursesByCatalog(ctx) {
        return new Promise((resolve, reject) => {
            console.log();
            const subject = ctx.params.catalog;
            let query = `SELECT * FROM course_catalog WHERE catalog = ?`;
            console.log(query);
            dbConnection.query({
                sql: query,
                values: [subject]
            }, (error, tuples) => {
                if (error) {
                    return reject(`Error when trying to retrieve course descriptions for ${catalog} --- 
                                        in allCoursesByCatalog. The error msg: ${error}`);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            })
        }).catch(err => {
            console.log(`Error in allCoursesByCatalog for subject ${term}: ${err}`);
            ctx.body = {error: err};
            ctx.status = "Failed";
        });
    }


}


module.exports = CourseController
