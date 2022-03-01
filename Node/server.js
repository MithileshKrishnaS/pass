const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const saltRounds = 10;
var keys=[];
const bcrypt = require ('bcrypt');
const crypto = require ('crypto-js');
const app = express();
var port = process.env.PORT||8081;
var mysql = require('mysql');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )
app.listen(port, () => console.log(`listening on port ${port}!`));
app.all("*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.use(cors(
    {
        origin: "*",
    }
))

var con = mysql.createConnection({
    host: "SG-mysql-5758-mysql-master.servers.mongodirector.com",
    user: "sgroot",
    password: "CS3U5,XdhoWqXP8G",
    database:"mysql1"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/",(req,res)=>{
    res.send('server running');
})

//insert
app.post('/saveKey', function(req, res){
    var data=req.body.key;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data, salt, function(err, hash) {
            let sql="INSERT INTO keysName SET keyName = '"+hash+"'";
            con.query(sql,data,(err,result)=>{
                if (err) throw err
                res.send("data added")
            }) 
        });
      });
});

//display
app.get('/alldetails', function(req, res){
    let sql='SELECT * FROM userpass';
    con.query(sql,(err,result)=>{
        if (err) throw err
        console.log('displayed');
        res.json(result)
    })
});

//send each
app.get('/eachdetails', function(req, res){
    var key=req.query.key;
    let sql='SELECT * FROM userpass';
    var data=[];
    var final=[]
    con.query(sql,(err,result)=>{
        if (err) throw err
        data=result;
        for(let i=0;i<data.length;i++)
        {
            if(data[i].keyName===key)
            {
                var bytes  = crypto.AES.decrypt(data[i].password, 'qwertyuiop');
                var originalText = bytes.toString(crypto.enc.Utf8);
                data[i].password=originalText;
                final.push(data[i]);
            }      
        }
        res.json(final)
    })
});

//login
app.get('/login/:key', function(req, res){
    var key=req.params.key;
    let sql='SELECT * FROM keysName';
    var login={
        key:'',
        index:''
    }
    con.query(sql,(err,result)=>{ 
        if (err) throw err
        keys=result;
        for(let i=0;i<keys.length;i++)
        {
            bcrypt.compare(key,keys[i].keyName).then(result=>{
            
                if(result===true)
                {
                    login.key=keys[i].keyName;
                    login.index=i;
                    res.send(login)
                }          
            });
        }
    })
});

//display
app.get('/getKeys', function(req, res){
    let sql='SELECT * FROM keysName';
    con.query(sql,(err,result)=>{ 
        if (err) throw err
        console.log('displayed');
        keys=result;
        console.log(keys[0].keyName)
        console.log(keys.length)
        res.send(result)
    })
});

app.post('/savePass', function(req, res){
    console.log(req.body)
    var pass=req.body.password;
    const hash=crypto.AES.encrypt(req.body.password, 'qwertyuiop').toString();
    var bytes  = crypto.AES.decrypt(hash, 'qwertyuiop');
    var originalText = bytes.toString(crypto.enc.Utf8);
    let sql=`INSERT INTO userpass (keyName,website,password) VALUES ('${req.body.keyName}', '${req.body.website}', '${hash}')`
    con.query(sql,(err,result)=>{
        if (err) throw err
        let sql='SELECT * FROM userpass';
        con.query(sql,(err,result)=>{ 
            if (err) throw err
            console.log('displayed');
            keys=result;
            console.log(keys[0].keyName)
            console.log(keys.length)
            res.send(result)
        })
    }) 
});

//delete
app.post('/deleteItem', function(req, res){
    var data=req.body;
    let sql=`DELETE FROM userpass WHERE keyName = ${data.key} AND website = ${data.name};`
    con.query(sql,data,(err,result)=>{
        if (err) throw err
        res.send("data removed");
    })
})
