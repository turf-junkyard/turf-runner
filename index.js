var fs = require('fs');
var exec = require('child_process').exec;
var rimraf = require('rimraf');
var queue = require('queue-async');

// read all modules from turf
var modules = [];
var index = fs.readFileSync(__dirname + '/node_modules/turf/index.js').toString();
var regex = /\'[^\']*\'/; 
index = index.split('\n');

index.forEach(function(line){
	var module = regex.exec(line);
	if(module) modules.push(module[0].split('\'').join(''));
})
// remove existing submodules
rimraf(__dirname+'/submodules', function(){
	modules.forEach(function(module){
		// clone the module into the local directory
		exec('git clone git@github.com:Turfjs/'+module+'.git '+__dirname+'/submodules/'+module, function(){
			benchmarkSetup(module);
		})
	});
});

function benchmarkSetup(module) {
	var benchString = 
'var  = require(\'./\')\n'+
'var benchmark = require(\'Benchmark\')\n'+
'var fs = require(\'fs\')\n'+
'\n'+
'var suite = new Benchmark.Suite(\''+module+'\');\n'+
'suite\n'+
'  .add(\'index\',function {\n'+
'    \n'+
'   })\n'+
'   .on(\'cycle\', function(event) {\n'+
'     console.log(String(event.target));\n'+
'   })\n'+
'  .on(\'complete\', function() {\n'+
'     \n'+
'   })\n'+
'   .run();\n'

	fs.writeFileSync(__dirname+'/submodules/'+module+'/bench.js', benchString)
	exec('(cd '+__dirname+'/submodules/'+module+' && npm install benchmark --save-dev)', function(err){
		if (err) console.log(err)
		console.log(module)
	})
}
