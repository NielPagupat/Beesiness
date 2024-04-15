from django.urls import path
from .views import createProjectAPIView, CRUDProjectAPIView

urlpatterns = [
    path('createProject/', createProjectAPIView.as_view(), name='create-project'),
    path('editProject/<str:creator>/', CRUDProjectAPIView.as_view(), name='edit-project'),
]

