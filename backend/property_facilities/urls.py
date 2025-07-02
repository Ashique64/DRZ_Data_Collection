from django.urls import path
from .views import SavePropertyFacilitiesView

urlpatterns = [
    path(
        "property-facilities/<str:session_id>/",
        SavePropertyFacilitiesView.as_view(),
        name="save_property_facilities",
    ),
]
