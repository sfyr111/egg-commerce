# egg-commerce

线上测试地址
```
13.229.236.130:3000
```

egg / mysql 开发电商平台
集成支付宝面对面支付、手机网站唤醒APP支付

### 相关栈
node / mysql / egg / sequelizejs / redis / 支付宝支付  

### 本地开发

1.找到config/config.default.js 和config/plugin.js 
确保alinode 配置和插件已经注释

2.然后找到在config/config.default.js 配置你的数据库环境

```bash
$ npm i
$ npm run dev
$ open http://localhost:7071/
```

### API 文档
[用户模块](https://github.com/sfyr111/egg-commerce/wiki/%E7%94%A8%E6%88%B7%E6%A8%A1%E5%9D%97)

[前台商品展示及购物车](https://github.com/sfyr111/egg-commerce/wiki/%E5%89%8D%E5%8F%B0%E5%95%86%E5%93%81%E5%B1%95%E7%A4%BA%E5%8F%8A%E8%B4%AD%E7%89%A9%E8%BD%A6)

[前台收货地址](https://github.com/sfyr111/egg-commerce/wiki/%E5%89%8D%E5%8F%B0%E6%94%B6%E8%B4%A7%E5%9C%B0%E5%9D%80)

[前台订单及支付](https://github.com/sfyr111/egg-commerce/wiki/%E5%89%8D%E5%8F%B0%E8%AE%A2%E5%8D%95%E5%8F%8A%E6%94%AF%E4%BB%98)

[后台商品分类管理](https://github.com/sfyr111/egg-commerce/wiki/%E5%90%8E%E5%8F%B0%E5%95%86%E5%93%81%E5%88%86%E7%B1%BB%E7%AE%A1%E7%90%86)

[后台商品管理](https://github.com/sfyr111/egg-commerce/wiki/%E5%90%8E%E5%8F%B0%E5%95%86%E5%93%81%E7%AE%A1%E7%90%86)

[后台管理订单](https://github.com/sfyr111/egg-commerce/wiki/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E8%AE%A2%E5%8D%95)
