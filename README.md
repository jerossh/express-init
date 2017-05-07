# 技术栈

本应用由 express + jade + mongodb + stylus(optional)

本应用已包含了大部分 express 需要的资源

- favicon 图标
- 数据库连接
- 多媒体表格
- 响应压缩
- 离线策略
- 安全策略
- 缓存策略
- 开发者模式
- 自动化

## 如何使用

```
git clone https://github.com/jerossh/express-init.git
cd express-init
git remote remove origin
```
然后你可以添加到自己的仓库

```
git remote add origin 你仓库的地址
```

开始项目之前

```
bower install
npm install || yarn
gulp
```

## 更新历史

* 2016-11-28   v0.0.1  init
* 2017-01-18   v0.1.0  优化 gulp 策略
* 2017-04-07   v0.2.0  优化缓存策略， 增加 yarn 的支持

## License
MIT
