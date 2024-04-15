from django.shortcuts import render
from .models import project
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import createProject
# Create your views here.

class createProjectAPIView(ListCreateAPIView):
    serializer_class = createProject
    queryset = project.objects.all()

class CRUDProjectAPIView(RetrieveUpdateDestroyAPIView):
    lookup_field = 'creator'
    queryset = project.objects.all()
    serializer_class = createProject

