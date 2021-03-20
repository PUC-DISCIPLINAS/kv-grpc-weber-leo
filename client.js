

var PROTO_PATH = __dirname + '/../../protos/gRPC.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).gRPC;

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new hello_proto.Greeter(target,
                                       grpc.credentials.createInsecure());
  var user;
  var key;
  var value;
  var allkeys = []
  var cont = 0
  if (argv._.length > 0) {
    user = argv._[0]; 
    key = argv._[1];
    value = argv._[2];
  } else {
    key = 'key';
    value = 'value'
  }
  switch(user){
      case 'put':{
        client.insert({key: key, value: value}, function(err, response) {
        allkeys[cont] = key
        cont++
        });
        break
      }
      case 'get': {
        client.get({key: key}, function(err, response) {
          console.log(response.value);
        });
        break
      }
      case 'getAllKeys': {

            allkeys.forEach(function (key, value, array) {
                console.log(key, value);
                
        })
        break;
      }
      default: console.log('Sem argumentos');
    };
  }


main();
