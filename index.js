const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8002;

const expresslayouts=require('express-ejs-layouts');
//db
const db=require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieparser());

app.use(express.static('assets'));
app.use(expresslayouts);
//extract styles ans scripts from sub pages into to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//use express router
app.use('/',require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        console.log(`Error:${err}`);
    }
    console.log(`server is running on port;${port}`);
});