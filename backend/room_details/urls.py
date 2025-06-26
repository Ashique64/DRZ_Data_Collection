
from django.urls import path
from .views import SaveRoomDetailsView

urlpatterns = [
    path(
        "room-details/<str:session_id>/",
        SaveRoomDetailsView.as_view(),
        name="save_room_details",
    ),
]