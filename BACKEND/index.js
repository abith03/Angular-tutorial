const express =require('express');
const bodyparser = require('body-parser');
const cors = require ('cors');
const mysql = require('mysql2')



const app = express();

app.use(cors());
app.use(bodyparser.json());


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'simpledb',
    port:3306
})

db.connect(err=>{
    if(err){console.log(err,'dberr');}
    console.log('database connected...');


})


app.get('/medicine',(req,res)=>{
    let qr = 'SELECT * FROM `medicine`';

    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all medicine data',
                data:result
            })
        }
    });
});


app.get('/medicine/:id',(req,res)=>{

    let gID = req.params.id;

    let qr = `SELECT * FROM medicine where id = ${gID}`;

    db.query(qr,(err,result)=>{

        if(err)  {console.log(err);}

        if(result.length>0)
        {
            res.send({
              message:'get single data',
              data:result
              });
        }
        else
        {
            res.send({
                message:'data not found'
            });
        }
    });
  }); 


app.post ('/medicine',(req,res)=>{
    console.log(req.body,'createdata');
    
    let name = req.body.name;
    let price = req.body.price;
    let date = req.body.date;

    let qr = `insert into medicine(name,price,date)
                values('${name}','${price}','${date}')`;

console.log(qr,'qr')              

    db.query(qr,(err,result)=>{
        if(err){console.log(err);} 
        res.send({
                message:'data inserted'
            });
    });        
    
});

app.put('/medicine/:id',(req,res)=>{

    console.log(req.body,'updatedata');


    let gID = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let date = req.body.date;

    let qr =`update medicine set name ='${name}',price='${price}',date='${date}'
              where id = ${gID}`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message:'data updated'
        });
    });

});


app.delete('/medicine/:id',(req,res)=>{
    let qID = req.params.id;

    let qr = `delete from medicine  where id = '${qID}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send({
            message:'data deleted'
        })
    });
})
        


app.listen(3000,()=>{
    console.log(`server runnning.. ${3000}`);
});