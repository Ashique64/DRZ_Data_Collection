from django.urls import path
from .views import SendFormLinkView, VerifyTokenView, CategoryList

urlpatterns = [
    path('send-invitation/', SendFormLinkView.as_view(), name='send-email'),
    path('verify-token/<str:token>/', VerifyTokenView.as_view(), name='verify-token'),
    path('categories/', CategoryList.as_view(), name='category-list'),
]

