from django.urls import path
from .views import SendEmailView

urlpatterns = [
    path('send-invitation/', SendEmailView.as_view(), name='send-email'),

]

