const express = require('express');
const app = express();
const mysql =  require('mysql');
const cors = require('cors');
const PORT = 3001 | process.env.PORT;

const {encrypt,decrypt} = require('./encryptionhandler');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'passwordmgr'
});

app.get('/',(req,res)=>{
    res.send("Server work");
});
app.post("/addpassword",(req,res)=>{
  const {password,websitename} = req.body;
  const hashedPwd = encrypt(password);
  db.query("INSERT INTO passwords (password,websitename,iv) VALUES (?,?,?)",
  [hashedPwd.password,websitename,hashedPwd.iv],
  (err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Added to DB");
    }
    res.send();
  })
});

app.get('/showpasswords',(req,res)=>{
   db.query('SELECT * FROM passwords',(err,result)=>{
     if(err)
     {
         console.log(err);
     }    
     else{
        res.send(result);
     }
   })
});

app.post('/decryptpassword',(req,res)=>{
    res.send(decrypt(req.body));
});

app.listen(PORT,()=>{
    console.log("Server Works");
});