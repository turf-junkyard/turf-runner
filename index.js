var fs = require('fs')

//read all modules from turf
var modules = [];
var index = fs.readFileSync(__dirname + '/node_modules/turf/index.js').toString();
var regex = /\'[^\']*\'/; 
index = index.split('\n');

index.forEach(function(line){
	var module = regex.exec(line);
	if(module)
		modules.push(module[0].split('\'').join(''));
})
console.log(modules)

