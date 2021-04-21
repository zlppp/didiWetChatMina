# 模拟旧版本滴滴小程序

## 主要功能
- 首页
  - 获取当前位置
  - 调用高德api获取经纬度
  
- 选择起始位置页
  - 拖动地图，获取地址经纬信息
- 选择到达地址页
  - 可选择城市，输入详细信息，调用高德api根据关键字查询地址
- 打车页
  - 生成随机120秒内等待时间，canvas计时等待时间
  
## 项目目录结构
```
C:.
│  app.js
│  app.json
│  app.wxss
│  project.config.json
│  README.md
│  sitemap.json
│  xxx.txt
│  
├─api
│      api.js
│      config.js
│      http.js
│      
├─components 组件目录
│  ├─header-search
│  │      index.js
│  │      index.json
│  │      index.wxml
│  │      index.wxss
│  │      
│  ├─icon-common
│  │      icon-common.js
│  │      icon-common.json
│  │      icon-common.wxml
│  │      icon-common.wxss
│  │      
│  ├─selected-city
│  │      index.js
│  │      index.json
│  │      index.wxml
│  │      index.wxss
│  │      
│  └─z-empty
│          index.js
│          index.json
│          index.wxml
│          index.wxss
│          
├─pages
│  │  api.js
│  │  api.json
│  │  api.wxml
│  │  api.wxss
│  │  map.js
│  │  
│  ├─api
│  ├─index
│  │      index.js
│  │      index.json
│  │      index.wxml
│  │      index.wxss
│  │      
│  ├─logs
│  │      logs.js
│  │      logs.json
│  │      logs.wxml
│  │      logs.wxss
│  │      
│  ├─order
│  │      order.js
│  │      order.json
│  │      order.wxml
│  │      order.wxss
│  │      
│  ├─selectedAddress
│  │      selectedAddress.js
│  │      selectedAddress.json
│  │      selectedAddress.wxml
│  │      selectedAddress.wxss
│  │      
│  ├─toEndAddress
│  │      toEndAddress.js
│  │      toEndAddress.json
│  │      toEndAddress.wxml
│  │      toEndAddress.wxss
│  │      
│  └─waitTaxi
│          waitTaxi.js
│          waitTaxi.json
│          waitTaxi.wxml
│          waitTaxi.wxss
│          
├─static
│  ├─css
│  │      animation.wxss
│  │      common.wxss
│  │      flex.wxss
│  │      index.wxss
│  │      theme.wxss
│  │      
│  └─images
│          banner-cart.jpg
│          banner-cart.png
│          banner.jpg
│          icon-car.png
│          icon-city.png
│          icon-drop-down.png
│          icon-empty.png
│          icon-map-start.png
│          icon-start-point.png
│          
├─untils
│  │  untils.js
│  │  
│  └─sdk
│          qqmap-wx-jssdk.min.js
│          
└─utils
    │  untils.js
    │  util.js
    │  
    └─sdk
            qqmap-wx-jssdk.min.js
            
```