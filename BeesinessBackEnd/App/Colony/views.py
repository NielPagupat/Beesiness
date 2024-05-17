from django.shortcuts import render
from .models import project, comment
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView
from .serializers import createProject, createComment
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response

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

class addComment(ListCreateAPIView):
    serializer_class = createComment
    queryset = comment.objects.all()

class CommentsByProjectAndReceiverAPIView(ListAPIView):
    serializer_class = createComment

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        reciever = self.kwargs['receiver']
        return comment.objects.filter(project_id=project_id, reciever=reciever)