# ACGN 精美卡片页面
一个图文卡片式静态页面，可用作于（ACGN）动漫、游戏（GameSpot/IGN 游戏评分）、音乐、电影及文字阅读书籍收藏等页面。
#### 预览
[预览 Demo](https://app.2broear.com/acg/)
## 构成&依赖
#### 主文件
- index.html
  + acg.css
- acg.js
  + acg.json
#### 依赖项
jquery.min.js
  + lazyload.js（可选）
## 新增&修改
#### 已存在对象
通过 acg.json 添加修改已存在条目（在对应 json 文件中修改对象）
```
newItem = [{
  "id" : "id",  //图片名对应 id
  "src" : "src",  //链接 src
  "title" : "title",  //标题
  "subtitle" : "subtitle",  //小标题（可选）
  "description" : "description"  //描述
}]
```
#### 新增对象
通过 acg.js 新增 jsonObj 对象，再通过 acg.json 新增同名 json 对象
``` javascript
jsonObj = [{
  "newItem" : {
    "en" : "newItem",  //英文（对应class/json等）
    "cn" : "新项目"  //中文（大标题）
  }
}]
```
## 其他
~~移动适配后期空了会加上~~ 已适配
