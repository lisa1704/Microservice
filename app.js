const mysql = require('mysql')
const bodyparser = require('body-parser')
const express = require('express')
var app = express()
// const port = process.env.PORT
var mysqlConnection = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'2580',
        database: 'productDB'

    }
)

app.use(bodyparser.json())



mysqlConnection.connect((err) => 
{
    if(!err)
    console.log("DB connection Succesful")
    else{
        console.log("DB connection Unsuccessful")
    }
})

app.listen(3000,()=>console.log("Server running on port no :3000"))

app.get('/rate',(req,res)=>
{
    mysqlConnection.query('SELECT * FROM rate',(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows)
        }
        else
        {
            console.log(err)
        }
    }
    )}
)

app.post('/rate',(req,res)=>
{   
    const params =req.body
    const {productId,rating, raterId}= req.body
    
    mysqlConnection.query('insert into rate values (uuid(),'+productId+','+rating+','+raterId+')',(err,rows,fields)=>{
        if(!err)
        {
            res.send("200 ok")
        }
        else
        {
            console.log(err)
        }
    }
    )}
)

app.put('/rate',(req,res)=>
{   
    const params =req.body
    const {productId,rating, raterId}= req.body

    mysqlConnection.query('UPDATE rate SET rating = ? WHERE raterId = ? AND productId = ?',[rating,raterId,productId],(err,rows,fields)=>{
        if(!err)
        {
            res.send("Updated Successfully")
        }
        else
        {
            console.log(err)
        }
    }
    )}
)