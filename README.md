# web_template
web项目基础模板 , 方便简单快速的开发web项目。

## 项目模板

### 配置设置
项目的配置由两部分组成，一个公有配置(public->public_app_config.js),一个私有配置(src->private_app_config.json)，两者组合为最终的APP_CONFIG。

1. app_config文件结构说明:
> common: 公有的项目配置  
dev:开发下的项目配置  
test:测试下的项目配置  
prod:生产下的项目配置  

2. 配置优先级说明:
> 公有配置优先级 > 私有配置优先级;  
具体环境配置优先级 > 公有配置优先级;

3. 配置设置方式：
> a. 在两个（公有/私有）配置文件中进行配置设置  
b. 在 src->config->init.ts 中项目配置 的类型信息. (方便在使用APP_CONFIG的时候获取类型提示)


3. 代码中使用配置举例
```
let api=APP_CONFIG.api;
```

### 数据中心
数据中心是用于存放项目共享的数据（即修改了不会触发界面修改的数据,如果需要请使用redux、mobx等）。

1. 数据中心设置方式：
在 src-> config->mystore.ts 中设置 项目数据中心需要的数据，需要刷新依旧存在的数据需要通过@att标注


### 项目可选配置 - API请求配置
1. 在src->services->axiosclient 配置了axios的全局配置


## 公有组件与样例
1. CheckTokenRoute (跳转路由,验证token),使用样例见：examples->privateRoute_1
2. LazyComp (懒加载组件), 使用样例见：examples->lazyComp_1、examples->lazyComp_2
3. examples->router_1：演示路由集中配置(包含多级路由)


## 项目-webapck特性
1. ts/js支持
2. 自动判断是否添加cesium的webpack配置
3. 根据指令从不同入口文件启动项目

## 项目-指令：
1. ``yarn start``启动项目
2. ``yarn choose [xx]`` 启动以【xx】开头且位于src文件夹下文件，作为入口文件启动项目
3. ``yarn build``项目打包(生产环境)，``yarn build:test``项目打包(测试环境)
4. ``build:analyze`` 项目打包分析

## 项目工程特性：
1. web项目的docker部署配置文件
2. 本地调试工具：本地nginx 容器服务（https,http）
3. .vscode->launch.json 配置浏览器以关闭安全策略启动
4. eslint 检查代码


## 注意：
1. 本地调试优先使用[SwitchHosts](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=02003390_hao_pg&wd=SwitchHosts&oq=SwitchHosts), nginx次之