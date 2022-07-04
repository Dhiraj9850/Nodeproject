const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//view usertable
exports.view = (req, res) => {

    //DB connection
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id' + connection.threadId);

        connection.query('SELECT * FROM usertable WHERE status = "active"',(err, rows)=> {
           connection.release();
           if(!err){
               res.render('home',{rows});
           }else{
               console.log(err);
           }
           console.log('the data from the usertable table:\n',rows);
        });
    });
}

//find usertable by the search
exports.find = (req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id' + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT * FROM usertable WHERE first_name LIKE ? OR last_name LIKE?',['%' + searchTerm +'%','%' + searchTerm +'%'],(err, rows)=> {
           connection.release();
           if(!err){
               res.render('home',{rows});
           }else{
               console.log(err);
           }
           console.log('the data from the usertable table:\n',rows);
        });
    });
}
exports.form = (req,res)=>{
    res.render('addUser')
}

//creating the usertable
exports.create = (req,res) =>{
    const{first_name,last_name,email,phone} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id' + connection.threadId);

        // let searchTerm = req.body.search;

        connection.query('INSERT INTO usertable SET first_name = ?,last_name = ?,email = ?,phone = ?',[first_name,last_name,email,phone],(err, rows)=> {
           connection.release();
           if(!err){
               res.render('addUser',{alert:'user added successfully'});
           }else{
               console.log(err);
           }
           console.log('the data from the usertable table:\n',rows);
        });
    });
  
}

//edit usertable
exports.edit = (req,res) =>{
    
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id' + connection.threadId);

        connection.query('SELECT * FROM usertable WHERE id = ?',[req.params.id],(err, rows)=> {
           connection.release();
           if(!err){
               res.render('editUser',{rows});
           }else{
               console.log(err);
           }
           console.log('the data from the usertable table:\n',rows);
        });
    });
}

//update usertable

exports.update = (req, res) => {
    const { first_name, last_name,email, phone} = req.body;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id' + connection.threadId);

        connection.query('UPDATE usertable SET first_name = ?,last_name = ?,email = ?,phone = ? WHERE id = ?',[first_name,last_name,email,phone,req.params.id] , (err, rows)=> {
           connection.release();
           if(!err){
            pool.getConnection((err, connection) => {
                if (err) throw err;
                console.log('connected as Id' + connection.threadId);
        
                connection.query('SELECT * FROM usertable WHERE id = ?',[req.params.id],(err, rows)=> {
                   connection.release();
                   if(!err){
                       res.render('editUser',{rows,alert:`${first_name} ${last_name} has been updated successfully`});
                   }else{
                       console.log(err);
                   }
                   console.log('the data from the usertable table:\n',rows);
                });
            });
           }else{
               console.log(err);
           }
           console.log('the data from the usertable table:\n',rows);
        });
    });
 
  }

//delete usertable

exports.delete = (req,res) =>{
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id' + connection.threadId);

        connection.query('UPDATE usertable SET status = ? WHERE id = ?',['removed',req.params.id],(err, rows)=> {
           connection.release();
           if(!err){
               res.redirect('/');
           }else{
               console.log(err);
           }
           console.log('the data from the beer table:\n',rows);
        });
    });


     
       
}

exports.viewall = (req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected as Id' + connection.threadId);

        connection.query('SELECT * FROM usertable WHERE id = ?',[req.params.id],(err, rows)=> {
           connection.release();
           if(!err){
               res.render('viewUser',{rows});
           }else{
               console.log(err);
           }
           console.log('the data from the usertable table:\n',rows);
        });
    });
}