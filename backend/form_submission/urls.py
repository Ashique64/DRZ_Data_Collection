from django.urls import path
from .views import InitializeFormSessionView, SavePropertyDetailsView

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
]
