# schame中的required：true
schame中的required：true在find方法中是不起作用的，所以要在路由中单独验证参数有没有提供

# findOne 和 find的一点区别
findOne 如果没有找到，返回null
find如果没有找到，返回[]


# 修改资料的时候注意
let params = {}
如果有参数有添加，没有参数就不添加，这种形式才正确
if(){

}

# 分页查询
分页查询的时候如果不传pageSize和pageNo的话，
find()
.limit()
.skip()
还是会查询所有