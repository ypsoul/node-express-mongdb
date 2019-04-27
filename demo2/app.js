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

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/all',async(req,res)=>{
    LibraryTest.find({},async(err,docs)=>{
        console.log(docs);
        res.render('index.html',docs)
    })

})
// 添加
app.get('/add', async(req,res)=>{
    // res.send("www")
    const a1 = new LibraryTest({
        bookeName:"22244",
        author:"yinpsseng",
        publicationDate:"2019-02-01",
        lend:false,
    })
    a1.save( res => console.log(res))
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
    LibraryTest.find({bookeName:'222'},function(err,docs){
        docs[0].author = 'ylsd',
        docs[0].save()
    })
})

//删除
app.get('/delete',async(req,res)=>{
    LibraryTest.find({bookeName:'222'},function(err,docs){
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