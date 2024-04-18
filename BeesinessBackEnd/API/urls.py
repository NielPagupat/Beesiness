from django.urls import path, include

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('App.Colony.urls')),
    path('auth/', include('App.invitations.urls')),
    path('auth/', include('App.workers.urls'))
]
