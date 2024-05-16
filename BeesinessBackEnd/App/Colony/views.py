from django.shortcuts import render
from .models import project
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import createProject
from django.db.models import Q

class createProjectAPIView(ListCreateAPIView):
    serializer_class = createProject
    queryset = project.objects.all()

class CRUDProjectAPIView(RetrieveUpdateDestroyAPIView):
    
    queryset = project.objects.all()
    serializer_class = createProject

class ProjectsByCreatorAPIView(ListAPIView):
    serializer_class = createProject

    def get_queryset(self):
        creator = self.kwargs['creator']
        return project.objects.filter(creator=creator)

class ProjectsByMemberAPIView(ListAPIView):
    serializer_class = createProject

    def get_queryset(self):
        email = self.kwargs['email']
        projects = project.objects.all()
        filtered_projects = []
        for proj in projects:
            if any(member['name'] == email for member in proj.members):
                filtered_projects.append(proj)
        return filtered_projects

