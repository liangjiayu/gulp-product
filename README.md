### 特性定位

- `es6`编译，`scss`编译，`html`模板编译
- `css`，`js`压缩
- 可用于以`jq`为技术栈的非前后的分离项目，通常前端负责静态页面的制作，统一管理静态页面。



### 目录介绍

```
│  .editorconfig  
│  .gitignore 
│  gulpfile.js  // gulp 配置文件  
│  package.json
│  typings.json
│  
├─build  //打包后的文件
│  ├─assets
│  │  ├─css    
│  │  ├─images
│  │  ├─js
│  │  └─Librarys
│  │      ├─fonts
│  │      └─plugin
│  └─pages            
├─src
│  ├─assets
│  │  ├─css  // 编译后的css
│  │  │      core.css
│  │  │      goods.css
│  │  │      index.css
│  │  │      
│  │  ├─images  // 图片
│  │  │      .gitkeep
│  │  │
│  │  ├─js  // 编译后的js
│  │  │      core.js
│  │  │      global.js
│  │  │      jquery.min.js
│  │  │      
│  │  └─Librarys // 可放置其他资源文件
│  │      ├─fonts    
│  │      └─plugin          
│  ├─data
│  │      .gitkeep
│  │      
│  ├─pages  // 编译后的html    
│  │ 
│  ├─script
│  │  ├─es6  // 编译es6文件
│  │  │      global.js
│  │  │      
│  │  └─libs // 常用的插件 压缩成 code.js
│  │          swiper.min.js
│  │          template-web.js
│  │          
│  ├─style
│  │  ├─common
│  │  │      iconfont.scss
│  │  │      reset_mo.scss
│  │  │      reset_pc.scss
│  │  │      
│  │  ├─libs  // 常用的插件样式 压缩成 code.css
│  │  │      swiper.min.css
│  │  │      
│  │  └─module // 编译样式
│  │          goods.scss
│  │          index.scss
│  │          
│  └─views // 编译html
│      │  index.html
│      │  
│      ├─Goods
│      │      info.html
│      │      
│      └─public // 公用的模板
│              footer.html
│              head.html
│              
└─typings // 辅助vscode 语法提示
    │  index.d.ts
    │  
    └─globals
        └─jquery
                index.d.ts
                typings.json
                

```



### 如何使用

```bash
# 安装依赖 
npm install  

# 运行开发环境
npm run serve

# 进行打包
npm run build
```





#### `views`

- 在`src`中的`views`编写`html`代码，支持模板编写，具体查看对应的文档，编译后的代码在`pages`中。
- 关于删除页面问题，删除`views`中的文件后对应`pages`没有删除，可以保存一下`public`里面文件，对全部文件进行一次编译，解决问题，或者手动删除对应的文件。
- 关于的资源引用，需要引用`assets`文件夹中的对应的文件。



#### `style`

- 样式采用`sass`的方式，在`module`文件夹中新建样式表，会在`assets`的`css`的中生成对应的样式表。
- `libs`文件夹的作用是合并一些第三方的插件需要的样式表，合并后的文件在`assets`中的`core.css`。
- `module`不支持多层文件，请用命名来区分样式表。



#### `script`

- `es6`文件夹存放`js`文件，支持基础的`es6`转译。转译后的文件在`assets`中。
- `libs`文件夹的作用是合并一些第三方的插件需要的`js`，合并后的文件在`assets`中的`core.js`。
- `es6`不支持多层文件，请用命名来区分脚本。



#### `Librarys`

- 主要放置一些第三方的独立插件，给页面单独引用



#### `assets`

- 这个文件夹是资源文件，所以页面引用的资源都是指向这个文件夹。
- 暂时打包只会处理这4个文件夹。



#### 其他

- `images`放图片，文件夹随便建
- `data`放模拟数据，本地模拟应该只支持`GET`。
- 命名文件时`core`，`view`，不要单独使用。
- 如果页面缺失，资源缺失，需要保存一次`html`，`public`，样式和脚本同理。