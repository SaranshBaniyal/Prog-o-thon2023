from django.urls import path
from enduser.views import EndUserSignUp, EndUserLogin, FaceId, CreateElectionView
from enduser.views import EndUserSignUp, EndUserLogin, FaceId, CreateElectionView

urlpatterns = [
    path('signup/', EndUserSignUp.as_view(), name='signup'),
    path('login/', EndUserLogin.as_view(), name='login'),
    path('faceid/', FaceId.as_view(), name='faceid'),
    path('create-election/', FaceId.as_view(), name='create-election'),
]