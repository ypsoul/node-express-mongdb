const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './public/')) 

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.get('/',async(req,res) => {
    res.render("main.html")
})                                                                                                             
app.get('/add',async(req,res) => {                                                 
    res.render("add.html")                                                     
})                                                          
app.get('/login',async(req,res)=>{                                                                                  
    //假设正确的登入账号  test   123456                                                                                                                                        
    //console.log(req.query.name,req.query.password)
    if(req.query.name === 'test'&&req.query.password ==='123456'){
        res.render('main.html',{message:'登入成功'})
    }else{
        res.render('main.html',{message:'账号或者密码错误'})
    }

})

app.listen(3000,()=>{
    console.log("localhost:3000")
})