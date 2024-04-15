from django.urls import path
from .views import CreateInvitation, CRUDInviteAPIView, GetInviteAsInviteeAPIView, GetInviteAsInvitorAPIView

urlpatterns = [
    path('createInvite/', CreateInvitation.as_view(), name='send-Invitation'),
    path('editInvitation/<int:pk>/', CRUDInviteAPIView.as_view(), name='edit-invitation-details'),
    path('getAsInvitor/<str:invitor>/', GetInviteAsInvitorAPIView.as_view(), name='get-invitation-details-as-invitor'),
    path('getAsInvitee/<str:invitee>/', GetInviteAsInviteeAPIView.as_view(), name='get-invitation-details-as-invitee'),
]
