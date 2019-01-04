# mongoose
条件关键词|含义|条件关键词|含义
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

文档更新
共有以下几种方式
update() updateMany() updateOne()
find() + save() findOne() + save()
findByIdAndUpdate() fingOneAndUpdate()
