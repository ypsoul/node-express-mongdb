const mongoose =  require('mongoose')

mongoose.connect('mongodb://localhost:27017/library_test',{
    useCreateIndex:true,
    useNewUrlParser: true,
})
const conn = mongoose.connection
conn.on('connected',function(){
    console.log("数据库连接成功")
})
const LibrarySchema = new mongoose.Schema({
    bookeName:{type:String,unique:true},
    author:{type:String},
    publicationDate:{type:String},
    lend:{type:Boolean}
})


const LibraryTest = mongoose.model('LibraryTest',LibrarySchema)

module.exports = { LibraryTest }