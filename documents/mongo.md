## win 打开数据库
```
cd C:\Program Files\MongoDB\Server\3.2\bin
mongod -dbpath "C:\Program Files\MongoDB\Server\3.2\data\db"
```

## 使用 mongodump 导出 和 mongorestore 导入
先打开
```
cd /usr/bin/podApp/apps/newMingpian
```
```
mongodump -h localhost -d mingpian -c users -o e:\data\mingpian\usrs.dat
mongorestore -h localhost -d mingpian --directoryperdb 数据所在目录
mongorestore -h localhost -d mingpian --directoryperdb mingpian
```
这种是直接生成有中文乱码的 bson 文件

## 使用 mongoexport 导出 和 mongoimport 导入
```
mongoexport -d mingpian -c users  -o e:\data\mingpian\usrs.dat
mongoimport -d mingpian -c users  --file usrs.dat


mongoexport -d mingpian -c cards -o e:\data\mingpian\cards.dat
mongoimport -d mingpian -c cards  --file cards.dat
```
无法导入

尝试使用csv 格式

```
mongoexport -d mingpian -c users --csv -f classid,name,age -o students_csv.dat  
```



## 其他使用命令
```
show dbs
use dbname

db.dropDatabase()         // 删除当前数据库
db.collection.drop()      // 删除集合
show collections
db.collectionname.find()
```

## 1
```js
db.users.update({'name':'谱咖集团'},{$set:{'password':'$2a$07$3mkroQ4w9roepQEpYgyULuHUqO0D8x8F4S9CpUlKFwIbazJ.6Wgae'}})
```
