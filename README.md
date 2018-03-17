### `create-react-app`的使用

* 安装: `yarn global add create-react-app --prefix /usr/local`
* 创建项目 `create-react-app project`
* 启动 `yarn start`
* 默认配置文件隐藏,使用`yarn eject`显示


### `JSX`基础语法

* JS里直接写html
* class要写成className
* 变量用{}包裹

### `Redux`

##### `Redux`是专注于状态管理的库

* Redux专注于状态管理,和react解耦
* 单一状态,单项数据流
* 核心概念: store,state,action,reducer

#### `react-redux`的使用

* `Provider`组件在应用最外层,传入store即可,只用一次
* `Connect`负责从外部获取组件需要的参数

### `react-router4`

* BrowserRouter,包裹整个应用
* Router路由对应渲染组件,可嵌套
* Link跳转专用
