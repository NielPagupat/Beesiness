from rest_framework import serializers
from .models import project

class createProject(serializers.ModelSerializer):
    class Meta:
        model = project
        fields = '__all__'
