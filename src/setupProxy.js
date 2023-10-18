const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use('/proxy',
        createProxyMiddleware(
            {
                target: 'https://foralpha.shinhan.site',
                changeOrigin: true,
            }
        )
    )
}