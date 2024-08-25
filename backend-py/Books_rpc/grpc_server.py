from concurrent import futures
import grpc
import myservice_pb2
import myservice_pb2_grpc

class MyServiceServicer(myservice_pb2_grpc.MyServiceServicer):
    def Add(self, request, context):
        response = myservice_pb2.AddResponse()
        response.result = request.a + request.b
        return response

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    myservice_pb2_grpc.add_MyServiceServicer_to_server(MyServiceServicer(), server)
    print("grcp server started")
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
