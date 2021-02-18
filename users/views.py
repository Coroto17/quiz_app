from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()