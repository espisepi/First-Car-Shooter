const path = require('path')

module.exports = {
    entry: './src/client/client.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three'),
        },
        extensions: ['.tsx', '.ts', '.js'],
        // alias: {
        //     cannon: path.resolve(
        //         __dirname,
        //         './src/client/espinaco-features/sketchbook/lib/cannon/cannon.js'
        //     ),
        // },
        // extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
    performance: {
        hints: false,
    },
}
