module.exports = {
    // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    root: true,
    // 对Babel解析器的包装使其与 ESLint 兼容。
    parser: 'babel-eslint',
    globals: {
      Promise: true,
      lib: true,
      __har: true,
      require: true,
      JSEncrypt: true,
      Image: true
    },
    extends: ['standard'],
    // required to lint *.vue files
    plugins: [
        'vue',
    ],
    // add your custom rules here
    'rules': {
      'no-unused-vars': 0,
      'no-empty-pattern': 0,
      'no-new-func': 0,
        // allow paren-less arrow functions
        // 'arrow-parens': 0,
        // allow async-await
        // 'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
}
