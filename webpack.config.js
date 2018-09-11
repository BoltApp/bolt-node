module.exports = env => {
  const isDev = Boolean(env.NODE_ENV === 'dev');

  return {
    mode: isDev ? 'development' : 'production',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
      auxiliaryComment: 'SDK to use the Bolt API with Node.',
      filename: 'index.js',
      library: 'Bolt',
      libraryTarget: 'commonjs',
      path: `${__dirname}${isDev ? '/dist_temp' : '/dist'}`,
    },
    resolve: { extensions: ['.ts'] },
    module: {
      rules: [
        {
          test: /\.(tsx?)$/i,
          include: __dirname + '/src',
          exclude: /node_modules|dev/,
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
