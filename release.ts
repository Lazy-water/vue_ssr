var fs = require('fs')
const path = require("path")
const shell = require("shelljs")

const env = process.argv[2]

const pck = JSON.parse(fs.readFileSync('./package.json'))
const dependencies = JSON.stringify(pck.dependencies)

const floder = `release-${env}`

const package = `{
  "name": "vue_ssr",
  "version": "1.0.0",
  "scripts": {
    "serve": "cross-env NODE_ENV=${env} node server.ts"
  },
  "dependencies": ${dependencies},
  "devDependencies": {
    "@types/node": "^17.0.15",
    "cross-env": "^7.0.3",
    "compression": "^1.7.4"
  }
}`

console.log(`正在构建 ${env} 环境的文件`)
shell.exec('npm run build')

shell.rm("-rf", floder)

shell.mkdir(floder)

shell.cp("-Rf", path.resolve(__dirname, './server.ts', ''), floder)
shell.cp("-Rf", path.resolve(__dirname, './dist', ''), floder)

shell.rm("-rf", './dist')

shell.cd(floder)

fs.writeFile("package.json", package, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log("发布文件已全部生成")
  console.log("把release文件夹拷贝到服务器上运行")
})