from django.urls import path
from .views import createProjectAPIView, CRUDProjectAPIView, ProjectsByCreatorAPIView, ProjectsByMemberAPIView

urlpatterns = [
    path('createProject/', createProjectAPIView.as_view(), name='create-project'),
    path('editProject/<int:pk>/', CRUDProjectAPIView.as_view(), name='edit-project'),
    path('projects/creator/<str:creator>/', ProjectsByCreatorAPIView.as_view(), name='projects-by-creator'),
    path('projects/member/<str:email>/', ProjectsByMemberAPIView.as_view(), name='projects-by-member'),
]

