module.exports={
   lintOnSave:false,//是否开启eslint保存检测
   devServer:{
      open:true,
      port:8082
   },
   chainWebpack: config => {
      config.when(process.env.NODE_ENV === 'production',config =>{
         config.entry('app').clear().add('./src/main-prod.js')
      });
      config.when(process.env.NODE_ENV === 'development',config =>{
         config.entry('app').clear().add('./src/main-dev.js')
      })
   },
   publicPath:"./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径

   outputDir:"dist",  //打包时生成的生产环境构建文件的目录

   assetsDir: 'public'
}