from django.urls import path
from enduser.views import EndUserSignUp, EndUserLogin

urlpatterns = [
    path('signup/', EndUserSignUp.as_view(), name='signup'),
    path('login/', EndUserLogin.as_view(), name='login'),
]
