from django.urls import path
from .views import SaveContactDetailsView

urlpatterns = [
    path(
        "contact-details/<str:session_id>/",
        SaveContactDetailsView.as_view(),
        name="save_contact_details",
    ),
]
