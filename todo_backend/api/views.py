from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializers
from . import models

class TaskViewSet(APIView):
    def get(self, request):
        tasks = models.Task.objects.filter(is_active = True)
        serializer = serializers.TaskSerializer(tasks, many = True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = serializers.TaskSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
class TaskDetailViewSet(APIView):
    def get(self, request, pk):
        try:
            task = models.Task.objects.get(pk = pk, is_active = True)
            serializer = serializers.TaskSerializer(task)
            return Response(serializer.data)
        except models.Task.DoesNotExist:
            return Response({
                "error" : "Task not found."
            })
        
    def patch(self, request, pk):
        try:
            task = models.Task.objects.get(pk = pk, is_active = True)
            serializer = serializers.TaskSerializer(task, data = request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)        
        except models.Task.DoesNotExist:
            return Response({
                "error" : "Task not found."
            })

    def delete(self, request, pk):
        try:
            task = models.Task.objects.get(pk = pk, is_active = True)
            task.is_active = False
            task.save()
            return Response({
                "success" : "Task deleted successfully."
            })
        except models.Task.DoesNotExist:
            return Response({
                "error" : "Task not found."
            })