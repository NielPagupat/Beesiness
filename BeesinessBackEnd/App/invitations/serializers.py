from rest_framework import serializers
from .models import invite

class createInvite(serializers.ModelSerializer):
    class Meta:
        model = invite
        fields = '__all__'
