const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const hbs = require('hbs');
// vcxz
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(session({secret: "#$%^&*#$%^&*(key",resave:true,saveUninitialized:true}));

//defining view path
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

mongoose.connect('mongodb://127.0.0.1:27017/chanana',{
    useNewUrlParser:true,
    useCreateIndex: true,
    useAndModify:false,
  })
// hello

mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
});

var userschema = new mongoose.Schema({
    name :String,
    phone :String,
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    password : {
        type:String,
        required: true
    },
    role:Number
});

var complaintschema = new mongoose.Schema({
    assignedto: String,
    customername :String,
    phone :{
        type:String,
        required:true
    },
    customercomplaint : String,
    customeraddress: String,
    status:Number
});
//0 for admin
//1 for emp

//0 status complaint pending
//1 status complaint done
var users =  mongoose.model('users', userschema,'users');
var complaints = mongoose.model('complaints',complaintschema,'complaints');
app.post('/check',async function (req, res) {
    const user = await users.findOne({email:req.body.username,password:req.body.password});
    console.log(user.name);
    console.log(user.phone);
    if(user == null)
    {
        res.status(400).send();
    }
    else
    {
        req.session.login = 1;
        req.session.email = user.email;
        req.session.name = user.name;
        req.session.role = user.role;
        req.session.phone = user.phone;
        if(user.role == 0)
        {
            res.status(200).send();
        }
        else
        {
            res.status(202).send();
        }
    }
})

app.get('/adduser',checkSignInAndPriviledge,(req,res)=>{
    res.render('form');
})

app.get('/adminpanel',checkSignInAndPriviledge,(req,res)=>{
    res.render('panel',{
        email:req.session.email,
        name:req.session.name,
    });
})

app.get('/emppanel',checkSignIn,(req,res)=>{
    res.render('emppanel',{
        email:req.session.email,
        name:req.session.name,
    })
})

app.get('/empcomplaints',(req,res)=>{
    
})

app.post('/adduser',checkSignInAndPriviledge,(req,res)=>{
    console.log(req.body);
    users.create({
        name:req.body.user,
        email:req.body.username,
        phone:req.body.phoneno,
        role:req.body.role,
        password:req.body.password,
    },function(error,result){
        if(error)
        {
            console.log(error);
            res.status(400).send();
        }
        else
        {
            res.status(200).send();
        }
    });
})


app.get('/userlist',checkSignInAndPriviledge,(req,res)=>{
    res.render('userlist');
})


app.get('/getuserdata',checkSignInAndPriviledge,async (req,res)=>{
    let allusers = await users.find({});
    res.send(allusers);
})

app.post('/submitcomplaint',checkSignInAndPriviledge,async (req,res)=>{

    console.log(req.body.customername);
    let complaint = new complaints({
        assignedto:req.body.assignedto,
        customername:req.body.customername,
        phone:req.body.customerphone,
        customercomplaint:req.body.customercomplaint,
        customeraddress:req.body.customeraddress,
        status:req.body.complaintstatus
    })

    await complaint.save();

    res.status(200).send();
})

app.get('/complaints',checkSignInAndPriviledge,(req,res)=>{
    res.render('complaints');
})

app.get('/getcomplaints/:type',checkSignInAndPriviledge,async (req,res)=>{
    console.log(req.params.type);
    if(req.params.type == "all"){
        let allcomplaints = await complaints.find({});
        res.status(200).send(allcomplaints);
        return ;
    }
    else if(req.params.type == "pending"){
        let allcomplaints = await complaints.find({status:0});
        res.status(200).send(allcomplaints);
        return ;
    }
    else
    {
        let allcomplaints = await complaints.find({status:1});
        res.status(200).send(allcomplaints);
        return ;
    }
})

app.get('/searchbyname/:name',checkSignInAndPriviledge,async (req,res)=>{
    console.log(req.params.name);
    let allcust = await complaints.find({"customername": {$regex:req.params.name}})
    console.log(allcust);
    res.send(allcust);
})
function checkSignIn(req, res,next){
    console.log(req.session.login);
    if(req.session.login === 1){
       next();
    } else {
        res.send('not logged in');
    }
}

app.get('/report',checkSignIn,(req,res)=>{
    res.render('complaintforemp');
})

app.get('/assignedwork',checkSignIn,async (req,res)=>{
    let allcomplaints = await complaints.find({"assignedto": req.session.email});
    res.send(allcomplaints);
})

app.get('/workdone',checkSignIn,async (req,res)=>{
    console.log(req.query.id);
    await complaints.findOneAndUpdate({_id:req.query.id}, { status: 1 });
})
function checkSignInAndPriviledge(req,res,next){
   console.log(req.session.login);
   if(req.session.login === 1 && req.session.role == 0){
      next();
   } else {
       res.send('not allowed');
   }
}

app.get('/logout',function(req,res){
    req.session.destroy(function(){
       console.log("user logged out.");
    });
    res.redirect('/');
 });

app.listen(3000,()=>{
    console.log('server is up');
});
