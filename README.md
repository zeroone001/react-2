# mongoose
## Model
作为Schema实例生成Model 具有抽象行为能力，可以对数据库进行增删改查。
· 1 创建model

const Mytest = new Schema({
    name: String,
    age: Number
})
// 怒填一坑 此处第一个参数在mongoose会默认添加s 
// 若查询已存在的model（不是使用mongoose新建的）填写第三个参数为已存在的model
// 若不需要则可不填写第三个参数
let Model = mongoose.model('myTest', Mytest, 'myTest')
// 新建
let mytest = new Model({
    name: '测试',
    ang: 12
})
// 新建后需要调用save方法
mytest.save(function (err) {
    if (err) {
        console.log('保存失败',err)
    } else {
        console.log('保存成功')
    }
})
2 查询

find() 参数: 查询条件, 控制返回字段, 查询参数, 回调函数(err, data)
findById()
findOne()
const Mytest = new Schema({
    name: String,
    age: Number
})
let Model = mongose.model('myTest', Mytest)
// 查询所有年龄大于等于10的内容。
model.find({age: {$get: 10}},function (err, docs) {}) 
// _id会默认输出 若不需要_id第二参数中{_id:0}
## Schema
用于定义数据库的结构。类似创建表时的数据定义，每个Schema会映射到mongodb中的一个collection，Schema并不具备操作数据库的能力
let Schema = mongoose.Schema
// 创建定义数据库结构
const Mytest = new Schema({
    name: String, 
    age: 'number', 
    sports: {
        basketBall: String,
    },
    math: Mixed,
    headImg: Buffer,
    something: Array,
    birthday: Date,
    some: Boolean
})
创建Schema对象时，声明字段类型有两种方法，一种是首字母大写的字段类型，另一种是引号包含的小写字段类型;

## 条件关键词|含义|条件关键词|含义
------|--------|------|------
$or | 或关系|$slice | 查询字段集合中的元素（比如从第几个之后，第N到第M个元素
$nor | 或关系取反 |$gte | 大于等于
$lt | 小于|$lte | 小于等于
$ne | 不等于|$in | 在多个值范围内
$nin | 不在多个值范围内|$all | 匹配数组中多个值
$regex | 正则，用于模糊查询|$size | 匹配数组大小
$maxDistance | 范围查询，距离（基于LBS）|$mod | 取模运算
$near | 邻域查询，查询附近的位置（基于LBS）|$exists| 字段是否存在
$elemMatch | 匹配内数组内的元素|$within| 范围查询（基于LBS）
$box | 范围查询，矩形范围（基于LBS）|$center| 范围醒询，圆形范围（基于LBS）
$centerSphere | 范围查询，球形范围（基于LBS）

## 文档更新
共有以下几种方式
update() updateMany() updateOne()
find() + save() findOne() + save()
findByIdAndUpdate() fingOneAndUpdate()
文档删除
共以下几种方法
remove() findOneAndRemove() findByIdAndRemove()

remove分两种 一种为文档remove 一种为Model的remove
model.remove(conditions, function (err,wirteOpResult){}) 
// conditions查询条件 remove 中的回调函数不能省略，否则删除不会成功,如果强行没有回调强制执行需要用到exec()
model.remove(conditions).exec()
findOneAndRemove 会删除符合条件的第一条数据 
model.remove(conditions, options, function(err, doc){})
// doc为删除的文档 同remove方法回调函数不能省略，强行没有回调函数则需要执行exec()
findByIdAndRemove(id, options, callback) 相当于findOneAndRemove({_id: id}......)

## 前后中间件
前：pre() 后：post(),在执行某些操作时可以执行的函数，在Schema上指定。
在以下操作中触发执行 中间件
init validate save remove count find findOne findOneAndRemove findOneAndUpdate insertMany update

let schema = new mongoose.Schema({age: Number......})
schema.pre('find', function (next) {
    // do something
    console.log('我是pre')
    next()
})
schema.post('find', function (doc){
    console.log('我是post')
})
let model = mongoose.model('test', schema)
model.find({_id: id},function (error,doc){
    if (!error) {
        console.log(doc[0])
    }
})
// 我是pre 
// 我是post
// {_id: xxxxx, name: 'xxx', age: 12}

## 查询后数据处理
操作|含义
---|---
sort('字段')|排序字段 正为从小到大 负为从大到小
skip(n)|跳过n个显示其他
limit(n)|限制显示n个
select({age:1,_id:0})|显示字段 1为现实，0为不显示
exec(callback)|执行
countDocuments(callback)|计数
distinct(x)|显示去重后的x [1,2]

let model = mongoose.model('test', schema)
// 按照age从小到大排序 
model.find(.....).sort('age').exec(function(err, docs){})
model.find(.....).sort({age: 'asc'}).exec(function(err, docs){})
// 从大到小排序 
model.find().sort('-age').exec(function(err,docs){})
model.find().sort({age: -1}).exec(function(err,docs){})
==除去distinct操作外，其余操作后立即断开数据库连接会报错==

## 文档验证
对Schema中定义的字段进行验证，防止某些操作对数据库的影响。如缺少/未设置字段也可以保存成功等操作
常用验证操作 | 含义
----|----
required| 必须填写
default | 默认值
validate | 自定义匹配
min | 最小值(只适用于数字)
max | 最大值(只适用于数字)
match | 正则匹配(只适用于字符串)
enum | 枚举类型(只适用于字符串)
minlength | 字符串最小长度 
maxlength | 字符串最大长度

const Schema = new mongoose.Schema({
    age: {
        type: Number,
        default: 18,
        min: 0,
        max: 120,
    },
    name: {
       type: String,
       required: true,
       validate: function (arg) {
           if (arg.length > 3) {
               return true
           } else {
               return false
           }
       },
}
})
