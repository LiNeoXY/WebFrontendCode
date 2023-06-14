//1.引入express
const express = require('express');

//2.创建应用对象
const app = express();

//3、创建路由规则
//request是对请求报文的封装,response是对响应报文的封装
app.get('/Server', (request, response) => {
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  //设置响应
  response.send('hello express');
});

//all表示可以接受任意类型的请求
app.all('/Server', (request, response) => {
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  //设置响应
  response.send('hello express');
});

app.all('/Json-Server', (request, response) => {
  //设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  //响应一个json数据
  const data = {
    name: 'neo'
  };
  //对对象进行格式转换，send只能为字符串
  let str = JSON.stringify(data);
  //设置响应
  response.send(str);
});

//监听端口
app.listen(8000, () => {
  console.log("服务已经启动,8000端口监听中...");
});