import grpc
import weather_notification_pb2
import weather_notification_pb2_grpc
import time

def get_weather_and_notify(locations):
    # Create a channel and stubs for Weather and Notification services
    with grpc.insecure_channel('localhost:50051') as weather_channel, grpc.insecure_channel('localhost:50052') as notification_channel:
        weather_stub = weather_notification_pb2_grpc.WeatherServiceStub(weather_channel)
        notification_stub = weather_notification_pb2_grpc.NotificationServiceStub(notification_channel)

        # Call Weather Service
        for location in locations:
            weather_request = weather_notification_pb2.WeatherRequest(location=location)
            weather_response = weather_stub.GetWeather(weather_request)
            print(f"Weather in {weather_response.location}: {weather_response.condition}")

            # Send notification with the weather information
            notification_message = f"The weather in {weather_response.location} is {weather_response.condition}."
            notification_request = weather_notification_pb2.NotificationRequest(message=notification_message)
            notification_response = notification_stub.SendNotification(notification_request)
            print(f"Notification status: {notification_response.status}")
            time.sleep(1)

if __name__ == '__main__':
    get_weather_and_notify(["New York", "Los Angeles", "Chicago", "Oslo"])
