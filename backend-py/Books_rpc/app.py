from flask import Flask, request, jsonify
import grpc
import myservice_pb2
import myservice_pb2_grpc

# Initialize the Flask application
app = Flask(__name__)

# gRPC client setup
def grpc_add_numbers(a, b):
    # Create a channel to the gRPC server
    with grpc.insecure_channel('localhost:50051') as channel:
        # Create a stub (client)
        stub = myservice_pb2_grpc.MyServiceStub(channel)
        # Create a request message
        request = myservice_pb2.AddRequest(a=a, b=b)
        # Make the call
        response = stub.Add(request)
        print(response)
    return response.result

# Flask route to add two numbers using gRPC
@app.route('/add', methods=['GET'])
def add_numbers():
    a = request.args.get('a', type=int)
    b = request.args.get('b', type=int)

    if a is None or b is None:
        return jsonify({"error": "Please provide both 'a' and 'b' as query parameters."}), 400

    # Call the gRPC service
    result = grpc_add_numbers(a, b)
    return jsonify({"result": result})

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
