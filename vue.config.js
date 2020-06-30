module.exports={
   lintOnSave:false,//是否开启eslint保存检测
   devServer:{
      open:true,
      port:8082
   },
   // chainWebpack: config => {
   //    config.when(process.env.NODE_ENV === 'production',config =>{
   //       config.entry('app').clear().add('./src/main-prod.js')
   //    });
   //    config.when(process.env.NODE_ENV === 'development',config =>{
   //       config.entry('app').clear().add('./src/main-dev.js')
   //    })
   // },
   publicPath:"./", 
   outputDir:"dist",  
   assetsDir: 'public'
}