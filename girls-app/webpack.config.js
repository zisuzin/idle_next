const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        // 여기에 엔트리 포인트 및 청크 설정
    },
    output: {
        path: path.resolve(__dirname, "dist"), // 번들된 파일의 출력 경로
        filename: "bundle.js", // 번들된 JavaScript 파일 이름
    },
    module: {
        rules: [
            // 여기에 로더 설정
        ],
    },
    plugins: [
        // HtmlWebpackPlugin 플러그인 추가
        new HtmlWebpackPlugin({
            template: "public/index.html", // HTML 템플릿 파일 경로
            filename: "index.html", // 생성될 HTML 파일 이름
            inject: true,
            chunks: ["index"],
        }),
    ],
};