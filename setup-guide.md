# React Native Design System Setup Guide

## Initial Setup
```bash
# Create and initialize project
git clone <repo-url>
cd <repo-directory>
npx create-expo-app . --template typescript
git add .
git commit -m "Initial Expo project setup"
git push origin main
```

# Install dependencies
```bash
npx expo install styled-components @types/styled-components react-native-web react-dom
npm install -D @types/styled-components-react-native
npm install -D @storybook/react-webpack5 @storybook/react @storybook/builder-webpack5 webpack
npm install -D @storybook/addon-links @storybook/addon-essentials
npm install -D babel-plugin-module-resolver
```

(this one is needed when running on devmac)
```bash
npm install --save-dev @babel/preset-react
```

# Initialize Storybook
```bash
npx sb@latest init --type react_native
```

# Create Storybook main config
```bash
echo 'import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  }
};

export default config;' > .storybook/main.ts
```

# Create webpack config
```bash
echo 'const path = require("path");

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
};' > .storybook/webpack.config.js
```

# Create babel config
```bash
echo '{
 "presets": [
   "@babel/preset-env",
   "@babel/preset-react",
   "@babel/preset-typescript"
 ],
 "plugins": [
   ["module-resolver", {
     "alias": {
       "react-native": "react-native-web"
     }
   }]
 ]
}' > .babelrc
```

# Add scripts
```bash
npm pkg set scripts.storybook="storybook dev -p 6006"
npm pkg set scripts.build-storybook="storybook build"
```

# Fix components
Add React import on _Button.stories.tsx_ and _Button.tsx_.
```javacript
import React from 'react';
```

# Move components to src folder
```bash
mkdir -p src/components/Button
mv .storybook/stories/Button/* src/components/Button/
rm -rf .storybook/stories
```

# Run Storybook
```bash
npm run storybook
```

# Consider running
# Run Storybook automigrate
```bash
npx storybook automigrate
```
