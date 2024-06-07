from django.urls import path
from .views import getAllUserAccounts, CreateUser, getAllUser
urlpatterns = [
    path('getAllUsers/', getAllUserAccounts.as_view(), name='get-all'),
    path('createUser/', CreateUser.as_view(), name="create-User"),
    path('getData/', getAllUser.as_view(), name="get-Data")
]
