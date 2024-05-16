from django.shortcuts import render
from .models import project
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, UpdateAPIView
from .serializers import createProject
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

class AddCommentAPIView(UpdateAPIView):
    serializer_class = createProject
    queryset = project.objects.all()

    def update(self, request, *args, **kwargs):
        try:
            # Retrieve the member's name and comment from the request
            member_name = request.data.get('member_name')
            comment = request.data.get('comment')

            # Retrieve the project
            instance = self.get_object()

            # Find the member by name
            member = instance.members.filter(name=member_name).first()

            if member:
                # Append the comment to the member's comments
                member.comment.append(comment)
                member.save()

                # Serialize the updated project data
                serializer = self.get_serializer(instance)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Member not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)