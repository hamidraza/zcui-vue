require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ENV = process.env.NODE_ENV;
const isProd = ENV == 'production';

const webpackConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    app    : '~/main.js',
    //lib    : [],
    vendor : ['vue', 'vuex'],
    //common : [],
  },
  output: {
    path: path.resolve(__dirname, 'public/build'),
    publicPath: `${process.env.PUBLIC_PATH || ''}/build/`,
    chunkFilename: '[name]-[chunkhash].chunk.js',
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules(?!\/\@zoomcarindia)/],
      use: 'babel-loader'
    }, {
      test: /\.vue$/,
      exclude: [/node_modules(?!\/\@zoomcarindia)/],
      use: 'vue-loader'
    }, {
      test: /\.(sa|sc|c)ss$/,
      exclude: [/node_modules(?!\/\@zoomcarindia)/],
      use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ],
    }, {
      test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
      exclude: [/node_modules(?!\/\@zoomcarindia)/],
      use: 'file-loader'
    }]
  },
  resolve: {
    alias:{
      '~': path.resolve(__dirname, 'src'),
      'vue$': `vue/dist/vue.runtime${isProd?'.min':''}.js`,
      'vuex$': `vuex/dist/vuex${isProd?'.min':''}.js`,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': `"${ENV}"`
    }),
    new HtmlWebpackPlugin({
      template       : './src/index.ejs',
      filename       : isProd ? '../index.html': 'index.html',
      env            : process.env,
      chunksSortMode(a, b) {
        const order = ['app', 'common', 'vendor', 'lib'];
        return order.indexOf(b.names[0]) - order.indexOf(a.names[0]);
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
    }),
  ],
  devtool: isProd ? 'source-map' : false,
};

/**
// WP Config for development environment
**/
if(!isProd) {
  webpackConfig.output.sourceMapFilename = '[file].map';
  //webpackConfig.output.publicPath = process.env.PUBLIC_PATH || '/';
  webpackConfig.output.publicPath = '/';
  webpackConfig.devServer = {
    host: '0.0.0.0',
    port: 9393,
    //https: true,
    inline: true,
    hot: true,
    contentBase: 'public',
    historyApiFallback: {
      index: 'index.html',
    },
    stats: {
      chunks: false
    }
  }
}


/**
// WP Config for production environment
**/
if(isProd) {
  webpackConfig.output.publicPath = '/build/';
  webpackConfig.module.rules.push(...[{
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  }]);
  webpackConfig.plugins.push(...[
    new ExtractTextPlugin('[name]-[hash].bundle.css')
  ])
}


module.exports = webpackConfig;

