from django.shortcuts import render
from .models import invite
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from .serializers import createInvite
# Create your views here.


class CreateInvitation(ListCreateAPIView):
    serializer_class = createInvite
    queryset = invite.objects.all()

class CRUDInviteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = invite.objects.all()
    serializer_class = createInvite

class GetInviteAsInvitorAPIView(RetrieveAPIView):
    lookup_field = 'invitor'
    queryset = invite.objects.all()
    serializer_class = createInvite

class GetInviteAsInviteeAPIView(RetrieveAPIView):
    lookup_field = 'invitee'
    queryset = invite.objects.all()
    serializer_class = createInvite