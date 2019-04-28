const { LibraryTest } = require('./module')
const mongoose =  require('mongoose');
const express = require('express')
const path = require('path')
const app = express()

const bodyParser = require('body-parser')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './public')) 
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/admin',async(req,res)=>{
    LibraryTest.find({},async(err,docs)=>{
        res.render('index.html',{docs})
        console.log(docs)
    })
})
app.get('/uphtml/:id',async(req,res)=>{
    var id =req.params.id;
    LibraryTest.find({_id:id},async(err,docs)=>{
        res.render('uphtml.html',{id})
    })
})


// 添加
app.get('/add', async(req,res)=>{
    console.log(req)
    const a1 = new LibraryTest({
        bookeName:req.query.bookeName,
        author:req.query.auther,
        publicationDate:req.query.publicationDate,
        lend:false,
    })
    a1.save()
})

// 查找
app.get('/find',async(req,res)=>{
    LibraryTest.find({bookeName:'222'},function(err,docs){
        if(err) return;
        console.log(docs)
    })
})

//更新
app.get('/updata',async(req,res)=>{
    var id = req.query.id;
    LibraryTest.find({_id:id},function(err,docs){
        console.log(docs)
        docs[0].author = req.query.author,
        docs[0].bookeName = req.query.bookName,
        docs[0].save()
    })
})

//删除
app.get('/delete/:id',async(req,res)=>{
    var id =req.params.id;
    console.log(id,"id")
    LibraryTest.find({_id:id},function(err,docs){
        if(err) return;
        if(docs){
            docs.forEach(function(ele){
                ele.remove()
            })
        }
    })
})


app.listen(3456,()=>{
    console.log("localhost:3456")
})
