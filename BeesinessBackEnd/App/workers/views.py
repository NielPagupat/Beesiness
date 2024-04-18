from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from .models import CustomUser
from django.views import View
from django.http import JsonResponse
# Create your views here.

class getAllUserAccounts(View):
   def get(self, request, *args, **kwargs):
        # Retrieve all data from the table
        all_data = CustomUser.objects.all().values_list('email', 'last_login')
        
        # Serialize the data to JSON format
        data_json = [{"email":email, "last_login":last_login} for email, last_login in all_data]
        
        # Return the data as JSON response
        return JsonResponse(data_json, safe=False)
