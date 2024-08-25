import grpc
from concurrent import futures
import weather_notification_pb2
import weather_notification_pb2_grpc

class NotificationServiceServicer(weather_notification_pb2_grpc.NotificationServiceServicer):
    def SendNotification(self, request, context):
        print(f"Sending notification: {request.message}")
        return weather_notification_pb2.NotificationResponse(status="Notification sent")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    weather_notification_pb2_grpc.add_NotificationServiceServicer_to_server(NotificationServiceServicer(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("Notification Service is running on port 50052...")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
