const express=require('express');
const port=8000;
const path=require('path');
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());// this is middleware
app.use(express.static('assets'));

var contactList=[
    {name:"shruti",
     phone:"7407077977"
    },
    {
        name:"beauty",
        phone:"346797789"
    },
    {
        name:"sweety",
        phone:"893896785876"
    }

];
app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"CONTACT LIST",
            contact_list: contacts
            // contact_list: contactList
        });

    });
    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"let play baby!!"
    });
});

app.post('/create-contact',function(req,res){
    //return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // return res.redirect('/');
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error on creating a contact!');
            return;
        }
        console.log('*********',newContact);
        res.redirect('back');
    });


});

app.get('/delete-contact',function(req,res){
    //console.log(req.body);
    // for(var i=0; i<contactList.length;i++){
    //     if(contactList[i].name === req.body.name){
    //         contactList.splice(i,1);
    //         break;
    //     }
    // }
    // deleting contact using query params

    // console.log(req.query);
    // let phone=req.query.phone;
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!= -1){
        
    //     contactList.splice(contactIndex,1);

    // }
    // return res.redirect('back');
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting a contact from db");
            return;
        }
        return res.redirect('back');
    });

});
// app.get('/',function(req,res){
//     //res.send('<h1>cool!! it is running</h1>');
//     return res.render('home');
// });

app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('Yup! my express server is up and running :',port);
});