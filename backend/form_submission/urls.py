from django.urls import path
from .views import (
    InitializeFormSessionView,
    SavePropertyDetailsView,
    SaveContactDetailsView,
    SaveGalleryDetailsView,
    SaveWebsiteDetailsView
)

urlpatterns = [
    path(
        "initialize/<str:token>/",
        InitializeFormSessionView.as_view(),
        name="initialize_form_session",
    ),
    path(
        "property-details/<str:session_id>/",
        SavePropertyDetailsView.as_view(),
        name="save_property_details",
    ),
    path(
        "contact-details/<str:session_id>/",
        SaveContactDetailsView.as_view(),
        name="save_contact_details",
    ),
    path(
        "gallery-details/<str:session_id>/",
        SaveGalleryDetailsView.as_view(),
        name="save_contact_details",
    ),
    path(
        "website-details/<str:session_id>/",
        SaveWebsiteDetailsView.as_view(),
        name="save-website-details",
    ),
]
