from django.urls import path
from .views import createProjectAPIView, CRUDProjectAPIView, ProjectsByCreatorAPIView, ProjectsByMemberAPIView, addComment, CommentsByProjectAndReceiverAPIView

urlpatterns = [
    path('createProject/', createProjectAPIView.as_view(), name='create-project'),
    path('editProject/<int:pk>/', CRUDProjectAPIView.as_view(), name='edit-project'),
    path('projects/creator/<str:creator>/', ProjectsByCreatorAPIView.as_view(), name='projects-by-creator'),
    path('projects/member/<str:email>/', ProjectsByMemberAPIView.as_view(), name='projects-by-member'),
    path('api/projects/add-comment/', addComment.as_view(), name='add-comment'),
    path('comments/project/<int:project_id>/receiver/<str:receiver>/', CommentsByProjectAndReceiverAPIView.as_view(), name='comments_by_project_and_receiver'),
]

