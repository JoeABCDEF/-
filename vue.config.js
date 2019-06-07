module.exports = {
    //反代理
    devServer : {
        proxy : {
            'api':{
                //代理的网址
                target : 'http://39.97.33.178',
                changeOrigin : true//反向代理要不要改变你的地址 就不会冲突

            }
        }
    }
}