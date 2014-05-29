var fs = require('fs')

var files = fs.readdirSync('./')
var dirs = []

files.forEach(function(file){
  if(file[0] != '.'){
    filePath = './' + file
    var stat = fs.statSync(filePath)

    if(stat.isDirectory()){
      dirs.push(file)
    }
  }
})

console.log(dirs)
