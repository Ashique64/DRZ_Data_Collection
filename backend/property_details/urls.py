from django.urls import path
from .views import SavePropertyDetailsView

urlpatterns = [
    path(
        "property-details/<str:session_id>/",
        SavePropertyDetailsView.as_view(),
        name="save_property_details",
    ),
]
