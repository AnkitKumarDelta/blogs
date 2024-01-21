const express = require('express');
const app = express();
const blog = require('./models/blogs');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.listen(3000);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));  // Add this line for parsing form data

app.get('/blog',async(req,res)=>{
let newblog = await blog.find({});
//console.log(newblog);
res.render('index.ejs',{newblog});
});

app.get('/create',(req,res)=>{
    res.render('new.ejs');
});

app.post('/blog',async(req,res)=>{
let{username,title,content}=req.body;
let newBlog = await blog.create({
    username:username,
    title:title,
    content:content
});
res.redirect('/blog');
});

app.delete('/blog/delete/:id',async(req,res)=>{
    let id1=req.params.id;
 await blog.deleteOne({id:id1});
res.redirect('/blog');
});

app.get('/edit/:id',async(req,res)=>{
    let id2=req.params.id;
    let found=await blog.findOne({id:id2});
   // console.log(found);
    //res.send(found);
res.render('edit.ejs',{id2,found});
});

app.put('/blog/:id', async (req, res) => {
    const username1 = req.body.username;
    const blogId = req.params.id;
    const title1 = req.body.title;
    const content1 = req.body.content;
    await blog.updateOne({id:blogId}, {$set:{username:username1,title:title1, content:content1 }});
    res.redirect('/blog');
  });

  

