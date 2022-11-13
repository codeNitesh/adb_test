from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from .serializers import TodoSerializer

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
collection = db["todos"]

class TodoListView(APIView):

    def get(self, request):
        all_data = collection.find({})
        serializer = TodoSerializer(all_data, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = TodoSerializer(data = request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        collection.insert(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

