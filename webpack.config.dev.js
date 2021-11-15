//Este es uno de los archivos en donde vamos a realizar 
//la configuracion de nuestro proyecto. 

//Aqui importamos a "path". 
const path = require('path');

//Importamos HTML WEBPACK PLUGIN
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Importamos Los loaders para css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//Importamos Copy Webpack Plugin 
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// const TerserWebpackPlugin = require('terser-webpack-plugin')
//Aqui creamos y exportamos un modulo con una configuracion establecida 

const DotEnv= require('dotenv-webpack');

module.exports = {
    //Aqui configuramos el punto de ENTRADA de nuestra app. 
    entry: "./src/index.js",
    //Aqui configuramos el punto de SALIDA de nuestra app.(Donde enviamos lo que nos devuelva webpack).
    output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
       
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        path: path.resolve(__dirname, "dist"),
       // filename le pone el nombre al archivo final
       filename: "[name].[contenthash].js",  
       assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    mode: "development",
    watch: true,
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: ['.js'],
        alias:{
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),        
        }
    },
    module:{
        rules:[
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.m?js$/,
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_module/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                //Creamos la configuracion de nuestro 
                //css loader. 
                test: /\.css|.styl$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader: 'url-loader', 
                    options: {
                        //Limit tambien acepta un valor de TRUE or FALSE
                        //Habilita o deshabilita la transformacion de 
                        //archivos en base64.
                        limit: 10000,

                        //mimetype especifica el tipo MIME con el que se alineara
                        //el archivo. 
                        //Los MIME Types (Multipurpose Internet Mall Extensions)
                        //son la manera standard de mandar contenido a traves de la red
                        mimetype: "aplication/font-woff",
                        
                        //name -> El nombre inicial del archivo + su extension
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        //Aviso de que no es un modulo
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins:[
        //Creamos una instancia de HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            //Configuramos HtmlWebpackPlugin
            
            //INYECTA EL BUNDLE AL TEMPLATE HTML
            inject: true,

            // LA RUTA AL TEMPLATE HTML
            template: "./public/index.html",
            
            // NOMBRE FINAL DEL ARCHIVO
            filename: "./index.html",
        }),
        
        //Invocacion de MiniCssExtractPlugin
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),

        new CopyWebpackPlugin({
            patterns:[{
                from: path.resolve(__dirname, 'src', 'assets/images'),
                to: "assets/images"
            }]
        }),
        new DotEnv(),
    ],
    // optimization:{
    //     minimize: true,
    //     minimizer:[
    //         new CssMinimizerPlugin(),
    //         new TerserWebpackPlugin(),
    //     ]
    // }
}