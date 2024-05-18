from django.shortcuts import render
from .models import invite
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView
from .serializers import createInvite
# Create your views here.


class CreateInvitation(ListCreateAPIView):
    serializer_class = createInvite
    queryset = invite.objects.all()

class CRUDInviteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = invite.objects.all()
    serializer_class = createInvite

class GetInviteAsInvitorAPIView(ListAPIView):
    serializer_class = createInvite

    def get_queryset(self):
        invitor_value = self.kwargs.get('invitor')
        return invite.objects.filter(invitor=invitor_value)

class GetInviteAsInviteeAPIView(ListAPIView):
    serializer_class = createInvite

    def get_queryset(self):
        invitee_value = self.kwargs.get('invitee')
        return invite.objects.filter(invitee=invitee_value)