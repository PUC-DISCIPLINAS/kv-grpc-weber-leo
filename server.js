
var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

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

function put(call, callback) {
    callback(null, {key: 'Key: ' + call.request.key, value: 'Value: ' + call.request.value});
  }
  
  function get(call, callback) {
    callback(null, { key: 'Key: ' + call.request.key, value: 'Value: ' + requestedValue.value})
  }
  
  function getAllKeys(call, callback){
    
  }

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {put: put, get: get, getAllKeys: getAllKeys});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
