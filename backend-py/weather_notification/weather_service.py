import grpc
from concurrent import futures
import weather_notification_pb2
import weather_notification_pb2_grpc

class WeatherServiceServicer(weather_notification_pb2_grpc.WeatherServiceServicer):
    def GetWeather(self, request, context):
        # Simple logic for demo purposes
        weather_data = {
            "New York": "Sunny",
            "Los Angeles": "Cloudy",
            "Chicago": "Rainy"
        }
        condition = weather_data.get(request.location, "Unknown")
        print(f"getting location: {request.location}")
        return weather_notification_pb2.WeatherResponse(location=request.location, condition=condition)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    weather_notification_pb2_grpc.add_WeatherServiceServicer_to_server(WeatherServiceServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Weather Service is running on port 50051...")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
