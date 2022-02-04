# Marmot-Image-wxapp

> A wechat mini program(wxapp) base on mpvue.js and Vant Design.

# Screenshots

### Summary
<img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/summary.png" width="1200"/>

### Home Page and Login
<img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/HomePage.png" width="305" height="549"/> <img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/Login.png" width="305" height="549"/>

### Image upload and setting
<img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/Upload.png" width="305" height="549"/>  <img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/ChangeShareList.png" width="305" height="549" />

### Image library and Image Detail
<img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/Library.png" width="305" height="549"/> <img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/Doc.png" width="305" height="549"/>

### Share and Share Detail
<img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/Share.png" width="305" height="549"/> <img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/ShareDetail.png" width="305" height="549"/>

### Image Watermark
<img src="https://github.com/CocoOreo/wxapp-edoc-system/blob/master/screenshots/watermark.png" width="305" height="549"/>

## Feature
- [x] Wechat Login and JWT Authentication
- [x] Choose Image and Upload
- [x] Choose Picture Category
- [x] Edit image (Rotate and Crop Pictures)
- [x] Display a list of Pictures
- [x] Set which pictures can be shared
- [x] Picture security check, prohibit uploading illegal pictures or text description.
- [x] Generate and download PDF documents for uploaded pictures.
- [x] Picture Watermark (Base on User Id)
- [x] detail page about pictures 
- [x] login、register 
- [x] change password 
- [x] ...

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
