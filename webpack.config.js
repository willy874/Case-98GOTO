const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackHtmlSettings = (option)=>{
  return [
      {name: 'home'},
      {name: 'about-us'},
      {name: 'workplace'},
      {name: 'workplace-list'},
      {name: 'workplace-detail'},
      {name: 'contact'},
  ].map((chunk)=>{
      return new HtmlWebpackPlugin({
          template: `./src/pug/${chunk.name}.pug`,
          filename: `${chunk.name}.html`,
          minify: option.mode === 'development' ? false : true,
      })
  })
}


module.exports = (evn,option)=>{
    return {
        mode: option.mode,
        entry: './src/entry.js',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, option.mode === 'production' ? 'prod' : 'dist'),
            filename: './js/[name].bundle.js'
        },
        plugins: [
            ...WebpackHtmlSettings(option),
            new MiniCssExtractPlugin({
                filename: option.mode === 'production' ? './css/[name].bundle.css' :  './css/[name].bundle.css'
            }),
            new webpack.ProvidePlugin( {
                $: 'jquery',
                jQuery: 'jquery'
            } )
        ],
        resolve: {
            extensions: ['.js', '.json', '.css'],
            alias: {
              '@/': path.resolve(__dirname, './src/js/'),
            },
            modules: [
                'node_modules'
            ]
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                  'style-loader',
                  {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          esModule: false,
                          publicPath: option.mode === 'production' ? '..' :  '..'
                      },
                  },
                  {
                      loader: 'css-loader',
                      options: {
                          modules: false,
                      }
                  }
              ]
          },{
              test: /\.pug$/,
              use: [
                  {
                      loader: 'html-loader',
                      options: {
                          attributes: false,
                          minimize: option.mode === 'development' ? false : true,
                      }
                  },{
                      loader: 'pug-html-loader',
                      options: {
                          pretty: option.mode === 'production' ? false : true,
                      }
                  },
              ]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000, //bytes
                        name: '[name].[ext]',
                        outputPath: option.mode === 'production' ? 'images' :  'images'
                    }
                }
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: option.mode === 'production' ? 'images' :  'images'
                        },
                    },
                ],
            }, {
              test: /\.js$/,
              exclude: /\/node_modules\//,
              use: {
                  loader: 'babel-loader'
              }
          }]
        }
    }
}