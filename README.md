# CPP项目重构及总结
## 文档目录
[TOC]

## 文档规范
---
1. *directory/file*:斜体代表文件夹或者文件
2. 图片的描述一定在图片的上方
3. 待做标注为 `// TODO`

## 前言
---
本次重构主要针对架构、结构等方面，在已有基础上，对一些我觉得不太满意的地方做了不完全重构。

progress(进度查询，不包含详情页面)为主要重构部分，以小见大。

其中`Heder`、`Dialog`、`SideBar`组件，基础样式（*base.less*,*u-btn.less*等）几乎没有做过改动。

写得不好还望大神们指出_(:з」∠)

PS:原始项目为公司所有，所以无法给大家全貌展示了。


## 运行
---
-> 先下载本项目

-> 安装[fis3](http://fis.baidu.com/fis3/index.html)

-> 在bash中切换到*src*目录
```bash
fis3 release 
```

若想体验生产环境则
```bash
fis3 release prod 
```

-> 启动fis3服务器
```bash
fis3 server start
```

-> 输入路径`http://127.0.0.1:8080/progress`即可运行

## 项目架构
---
regularjs + requirejs + fis3 + less + git

### regularjs
作为组件级框架，在项目中发挥了巨大作用。大大提高了代码的可复用性，并且省去了很多dom操作。

但是社区不成熟，多数时候遇到问题都是去问海波大神本人，或者提issue。

### requirejs
原始项目中，对于js资源的引用，既用requirejs、也用script标签。

为了统一，本次重构只使用requirejs来进行js资源引用（除了requirejs的配置文件）。

除此之外，以往requirejs默认报错很不友好。

比如说某个模块中代码执行出错，requirejs是不会定位错误在哪行的。

后查了下得知可以加一段这样的代码：
```javascript
require.onError = function(err){
    throw err;
}
```

### fis3
一款构建工具（这么说有点轻描淡写，实际上用处很大），这次项目主要用了如下功能：资源定位、内容嵌入、mock、目录配置、包装模块、压缩打包等。

使用过程中遇到不少问题，目前为止感觉还远远没有掌握。

### less
一门CSS预处理语言，主要用到了嵌套、变量、mixin、@import，掌握很浅。

`// TODO`

### jQuery
原始项目中引入了jQuery，但是用到的地方其实很少。主要是用ajax,dom操作以及少量动画效果和工具函数。因此在本次重构中去掉了jQuery。

其中ajax用[这个库](https://github.com/yannxiao/ajax)取代。不过实践过程中还是发现个小问题：当设置`dataType`为`json`时，如果请求路径出错或者其它错误，会对错误信息作`JSON.parse`处理，从而报错，导致无法调用`error callback`。

不过总的思路还是找一个独立的ajax库取代。

而dom操作部分，由于本项目为内部系统，不需要考虑兼容性，因此我参考了[这里](http://youmightnotneedjquery.com/)。

## 目录结构
---
这是以前的目录结构：
![Alt text](./1454066712591.png)

这是现在的目录结构：
![Alt text](./1456404691074.png)

### page
*page*原本只是放页面，页面所需资源放到*widget*里面，个人觉得这样写起来麻烦（遇到资源引用时得写绝对路径或者较长的相对路径），找起来也麻烦（得找到*widget*里面对应的文件夹）。

因此，我的想法是，有一个*main*文件夹专门存「业务逻辑」，所有相关的资源都放在里面：
![Alt text](./1456402534055.png)

### static
用于存放静态资源，以前的结构是这样的：
![Alt text](./1456402782250.png)

*.idea*里是编辑器的配置，没必要提交，因此应该添加在*.gitigonore*中。

*regularui*存可复用的regular组件，我把它放在了*component*文件夹中，下面会讲到。

现在的结构是这样的：
![Alt text](./1456403104374.png)

### test
用于存放测试（主要是mock及本地测试）。

以前我把本地的测试也给提交了，现在把本地测试给ignore了。

### widget
以前的*widget*既放独立的业务组件，也放共用的。前面提到过，独立的组件最好就近存放，这样对于路径书写和查找都是更便捷的。

因此，现在的定位是存放共用的regular组件，独立的扔到*main*下。按我个人的喜好，文件夹命名为*component*：
![Alt text](./1456403651600.png)

其中*regularui*用于存放可复用的组件（即放到其它基于regular的项目也可以使用）。

我们在*main*中写业务的时候可能会发现某些组件可以共用，那么可以提出来，扔到*component*下。

### pagelet
我专门开了一个文件夹用于存放pagelet：
![Alt text](./1456404387641.png)

以前是放在这里的：
![Alt text](./1456404305518.png)

pagelet即页面中一块独立的内容（可能包含逻辑、样式、结构），跟组件的概念很像。优点是写法更加简洁，缺点是不灵活。

它的实现仰仗于fis3提供的**内容嵌入**feature：
```xml
<link rel="import" href="/pagelet/header.html?__inline">
```

### fis-conf
这是fis3的构建依据。

主要内容：目录配置、模块指定、插件配置、压缩打包。

### server.conf
用来重写url，主要用于mock。

但有个问题是：这个文件是共用的，我配置了一些本地测试的重写，提交的时候会一同提交上去。我并不希望本地测试相关的内容出现在仓库中，但暂时还没有去寻找解决办法。`// TODO`

## 页面结构
---
以前同事主要的写法是这样的：
```xml
<!DOCTYPE html>
<html>
<head>
    <link rel="import" href="/page/layout/index.html?__inline">
    <title>初审评价</title>
</head>

<body>

<div class="g-layout">
    <link rel="import" href="/page/layout/common.html?__inline">
    <div class="g-content-wrap">
        <link rel="import" href="/widget/committee/comment/index.html?__inline"/>
    </div>
</div>

</body>
</html>
```

整个页面就是由html和pagelet组成。

感觉有点过了。之前提到过，pagelet写法简洁，但不灵活。

对于头部和侧边栏这种固定不变的东西，用pagelet很好，但是对于业务组件的引入，我个人更倾向于这种写法：
```javascript
   require(['./component/index/app.js'], function (App) {
        var app = new App;
        app.$inject('.g-mn');
    })
```

所以现在的结构是：
```xml
<!DOCTYPE html>
<html>
<head>
    <title>进度查询</title>

    <!--包含meta信息以及公共样式引入-->
    <link rel="import" href="/pagelet/index.html?__inline">
    <style>
        .g-mn{
            padding:100px 30px 60px 210px;
        }
    </style>

</head>
<body>

<link rel="import" href="/pagelet/header.html?__inline">
<div class="g-bd">
    <link rel="import" href="/pagelet/sidebar.html?__inline">
    <div class="g-mn">

    </div>
</div>

<script src="/static/js/require.js"></script>
<!--data-framework是为了提高该脚本的优先级,去掉后会排到其它依赖的脚本后面(并不希望这样),详情见https://github.com/fex-team/fis3-postpackager-loader-->
<script data-framework src="/static/js/require-config.js"></script>

<script>
    require(['./component/index/app.js'], function (App) {
        var app = new App;
        app.$inject('.g-mn');
    })
</script>
</body>
</html>
```

除了公共部分，每个页面由一个大组件组成（命名为App），在底部的`<script>`标签中引入，存放于该业务下的*component*文件中：
![Alt text](./1456455048501.png)

还有，头部的`<style>`标签中的样式根据每个页面的情况来具体配置。

## HTML
---
感觉HTML的理解停留在很基础的阶段：标签。

`// TODO`

## CSS
---
### 结构
该有哪些文件？比如说之前看一篇外文就提到：`mixin`,`global varible`可以和`业务样式`分开来。

业务样式该如何组织？比如说现在有`reset`,`base`,`布局`，`模块`，`单元`等。

文件内的css该如何组织？

这块感觉跟空白似的，需要学习。

`// TODO`

### 规范
#### 命名
原来页面布局的类名是这样的：
![Alt text](./1454465748018.png)

并没有遵循NEC规范：
![Alt text](./1454465592148.png)

比较正统的写法应该为：
```html
<div class="g-hd">

</div>
<div class="g-bd">
    <div class="g-sd">

    </div>
    <div class="g-mn">
        
    </div>
</div>
```

参考：[lofter](http://www.lofter.com/dashboard/)。

#### 格式
 `// TODO`

#### 注释
`// TODO`

### 业务
`grid.less`用作栅格布局，但是我并没有看到有多少地方在用。

其它的没怎么看。

### 可参考资料
1. [NEC](http://nec.netease.com/)

## JS
---
### 结构
模块加载器 + 基础类库 + 基于regular的业务组件 

### 规范
#### 命名
组件大驼峰，函数小驼峰

变量小驼峰，私有变量前缀`_`

#### 格式
**缩进，换行，空格**都没怎么注意 `// TODO`

#### 注释
文件、组件没有采用注释规范 `// TODO`

对于函数，不严格地采用了[JSDoc](http://usejsdoc.org/) `// TODO`

## 组件
---
### 规范
所有业务组件都基于BaseComponent扩展，BaseComponent主要添加了$request方法用于发送、处理请求（即ajax），并扩展了Regular上的所有属性、方法（util、dom等）：
![Alt text](./1456411101537.png)

所有业务组件在config里面配置默认值：
![Alt text](./1456410707188.png)

统一在js文件头部添加css依赖（使用fis3的声明依赖，通过postpackager-loader 插件实现加载）：
```javascript
//@require app.less
```

模板通过fis3内容嵌入语法引入，模板后缀统一命名为`tpl`：
```javascript
__inline('app.tpl')
```

模板中的组件（即实例），既有用小驼峰命名的，也有基于[web component](http://w3c.github.io/webcomponents/spec/custom/#custom-tag-example)规范命名的，待统一：
```xml
<queryDepart />
<z-xtable />
```

`// TODO`

### 可参考资料
1. [雨森的PPT](http://rainfore.me/Shares/Regular%20UI%E5%BA%93%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B8%8E%E6%80%9D%E8%80%83/#/)

## 重构过程
---
jQuery操作替换(dom、ajax等)

业务组件中：`Regular` 替换为 `BaseComponent`

路径替换（因为改了目录结构），比如css中引用图片的路径

## 总结
---
CPP是我在网易实习时做的第一个项目，本来老早就说要总结、重构，结果拖了一个月，实在惭愧
_(:з」∠)

过程中还是遇到不少问题，并且发现自己在很多方面都存在缺陷：
1. 重构的学问
2. 对HTML、CSS掌握甚浅
3. 规范了解甚少

以上只是一些典型的，总之还有太多要学习！

`// TODO`

## 问题
---
1. 生产环境出了问题的话，测试不方便
2. 没有使用单元测试

`// TODO`
