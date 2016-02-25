/**
 * Created by Dophin on 16/1/30.
 */

/*========== 部署路径配置:页面全部发到page下,其余资源全部发到static下 ==========*/
fis.match('*', {
    release:'/static/$0'
});

fis.match('/main/(**.html)', {
    release:'/page/$1'
});

fis.match('/test/**', {
    release: '$0'
});

fis.match('/server.conf', {
    release: '/config/server.conf'
});

/*========== 模块 ==========*/
fis.match('/main/**/component/**.js', {
    isMod:true
});

fis.match('/component/**.js', {
    isMod:true
});

fis.match('/static/js/ajax.js', {
    isMod:true
});

/*========== 其它 ==========*/
//会给isMod为true的文件包装(模块化)
fis.hook('amd');

fis.match('*.less', {
    // fis-parser-less 插件进行解析
    parser: fis.plugin('less'),
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
})

// 这个插件会生成require.config,没有的话会因引用路径出错
// fis3声明依赖语法会被引入,尽量少用声明依赖,现在还没有掌握并且用不上resourcemap
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType:'amd'
    })
});

/*========== 生产环境 ==========*/
fis.media('prod').match('*.{js,css,png,jpg,less}', {
 useHash: true
 })

fis.media('prod').match('/test/mock/**.js', {
    useHash: false
})

fis.media('prod').match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.media('prod').match('*.less', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.media('prod').match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});

fis.media('prod').match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne:true
    })
});
