from django.urls import path
from .views import SaveGalleryDetailsView

urlpatterns = [
    path(
        "gallery-details/<str:session_id>/",
        SaveGalleryDetailsView.as_view(),
        name="save_gallery_details",
    ),
]
