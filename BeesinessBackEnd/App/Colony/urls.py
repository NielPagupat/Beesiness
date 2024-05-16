from django.urls import path
from .views import createProjectAPIView, CRUDProjectAPIView, ProjectsByCreatorAPIView, ProjectsByMemberAPIView, AddCommentAPIView

urlpatterns = [
    path('createProject/', createProjectAPIView.as_view(), name='create-project'),
    path('editProject/<int:pk>/', CRUDProjectAPIView.as_view(), name='edit-project'),
    path('projects/creator/<str:creator>/', ProjectsByCreatorAPIView.as_view(), name='projects-by-creator'),
    path('projects/member/<str:email>/', ProjectsByMemberAPIView.as_view(), name='projects-by-member'),
    path('api/projects/add-comment/', AddCommentAPIView.as_view(), name='add-comment'),
]

