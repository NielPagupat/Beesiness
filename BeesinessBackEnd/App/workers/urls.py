from django.urls import path
from .views import getAllUserAccounts
urlpatterns = [
    path('getAllUsers/', getAllUserAccounts.as_view(), name='get-all')
]
