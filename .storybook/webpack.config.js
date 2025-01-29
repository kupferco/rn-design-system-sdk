const path = require("path");

module.exports = ({ config }) => {
 config.resolve.alias = {
   "react-native$": "react-native-web"
 };

 config.module.rules = [
   {
     test: /\.(js|jsx|ts|tsx)$/,
     exclude: /node_modules\/(?!(react-native-web|react-native)\/).*/,
     use: {
       loader: "babel-loader",
       options: {
         presets: [
           ["@babel/preset-env", { targets: { node: "current" } }],
           "@babel/preset-typescript",
           "@babel/preset-react"
         ],
         plugins: [
           ["module-resolver", {
             alias: {
               "react-native": "react-native-web"
             }
           }]
         ]
       }
     }
   }
 ];

 return config;
};
