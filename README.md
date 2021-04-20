# DaTaoKe

大淘客Node版本SDK。基于大淘客v1.0.0的API版本。

## Getting start

```bash
$ npm install dataoke
```

## DEMO

```js
  let DaTaoKe = require("dataoke");
  let daTaoke = new DaTaoKe("你的大淘客appKey", "你的大淘客appSecret");

  //第一个参数是接口地址，第二个参数是除公共参数以外的其他参数
  let data = await daTaoke.request("tb-service/activity-link", {
    promotionSceneId: "20150318020002192",
  })

  console.log(data)
```

## License

[MIT](LICENSE)
