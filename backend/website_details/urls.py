from django.urls import path
from .views import SaveWebsiteDetailsView

urlpatterns = [
    path(
        "website-details/<str:session_id>/",
        SaveWebsiteDetailsView.as_view(),
        name="save_website_details",
    ),
]
