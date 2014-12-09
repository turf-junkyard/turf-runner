var fs = require('fs');
var exec = require('child_process').exec;
var rimraf = require('rimraf');

// read all modules from turf
var modules = [];
var index = fs.readFileSync(__dirname + '/node_modules/turf/index.js').toString();
var regex = /\'[^\']*\'/; 
index = index.split('\n');

index.forEach(function(line){
	var module = regex.exec(line);
	if(module)
		modules.push(module[0].split('\'').join(''));
})
rimraf(__dirname+'/submodules', function(){
	modules.forEach(function(module){
		// clone the module into the local directory
		exec('git clone git@github.com:Turfjs/'+module+'.git '+__dirname+'/submodules/'+module, function (err, stdout, stderr){
			if(err) console.log(err)
		});
	});
})