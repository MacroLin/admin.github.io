var webpack = require('webpack')
var path = require('path')
var glob = require('glob')
var extractTextPlugin = require('extract-text-webpack-plugin')

var autoprefixer = require('autoprefixer')
var pxtorem = require('postcss-pxtorem')
var postcssOpts = {
	ident:'postcss',
	plugins:function(){
		return [
			autoprefixer({
			browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"],
			}),
			pxtorem({
				rootValue:16,
			})
		]
	}
}
var config = {
	entry:{

	},
	output:{
		path:path.join(__dirname,'dist'),
		filename:'js/[name].js',
		publicPath:'/dist/'
	},
	module:{
		rules:[{
			test:/\.js$/,
			use:[{
				loader:'babel-loader',
				query:{
					presets:['stage-0','es2015'],
				},

			}],
			exclude:/node_modules/
		},{
			test:/\.less$/i,
			use:extractTextPlugin.extract({
				fallback:'style-loader',
				use:[
					'css-loader',{
						loader:'postcss-loader',
						options:postcssOpts
					},'less-loader'
				]
			}),
			exclude:/node_modules/
		},{
			test:/\.css$/i,
			use:extractTextPlugin.extract({
				fallback:'style-loader',
				use:[
					'css-loader',{
						loader:'postcss-loader',
						options:postcssOpts
					}
				]
			})
		},{
			test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp3|mp4)(\?.*)?$/,
            use: [{
            	loader:"url-loader",
            	options: {
	              limit: 8192,
	              name:'/assets/[hash].[ext]'
	            }
            }]
		}]
	},
	devServer: {
	  compress: true,
	  hot:true,
	  inline:true,
	  port: 8888,
	  stats: {
        colors: true
    }
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.optimize.CommonsChunkPlugin('vendor.bundle'),
		new extractTextPlugin({
			filename:'/css/[name].css',
			allChunks:true
		})
	]
}
var files = glob.sync('./src/js/**/*.js')
var newEntries = files.reduce(function(acc,val){
	var name = /.*\/(.*?)\/*\.js/.exec(val)[1]
	acc[name] = entry(name)
	return acc
},{})
function entry(name){
	if(name == 'index'){
		return './src/js/' + name + '.js'
	}else{
		return './src/js/components/' + name + '.js'
	}
	
}
config.entry = Object.assign({},config.entry,newEntries)

module.exports = config