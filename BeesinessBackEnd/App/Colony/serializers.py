from rest_framework import serializers
from .models import project, comment

class createProject(serializers.ModelSerializer):
    class Meta:
        model = project
        fields = '__all__'

class createComment(serializers.ModelSerializer):
    class Meta:
        model = comment
        fields = '__all__'
