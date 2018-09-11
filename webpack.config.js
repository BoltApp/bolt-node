module.exports = env => {
  const isDev = Boolean(env.NODE_ENV === 'dev');

  return {
    mode: isDev ? 'development' : 'production',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
      path: `${__dirname}${isDev ? '/dist-temp' : '/dist'}`,
      filename: 'index.js',
    },
    resolve: { extensions: ['.ts', '.tsx'] },
    module: {
      rules: [
        {
          test: /\.(tsx?)$/i,
          include: __dirname + '/src',
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { modules: false, targets: { node: '6.0' } },
                ],
                '@babel/typescript',
              ],
              plugins: [],
            },
          },
        },
      ],
    },
  };
};
