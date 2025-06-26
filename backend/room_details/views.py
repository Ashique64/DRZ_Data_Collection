from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.db import transaction
from form_submission.models import FormSession
from .models import RoomDetails

# Create your views here.


class SaveRoomDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, session_id):
        """Fetch existing room details for a session"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)

            room_details_list = RoomDetails.objects.filter(
                form_session=form_session
            ).order_by('created_at')

            if room_details_list.exists():
                data = []
                for room_details in room_details_list:
                    room_data = {
                        "room_type": room_details.room_type,
                        "occupancy": room_details.occupancy,
                        "room_price": room_details.room_price,
                        "room_image": room_details.room_image,
                        "description": room_details.description,
                        "room_additional_info": room_details.room_additional_info,
                        "is_completed": room_details.is_completed,
                    }
                    data.append(room_data)

                return Response(
                    {"success": True, "data": data}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"success": True, "data": []}, status=status.HTTP_200_OK
                )

        except FormSession.DoesNotExist:
            return Response(
                {"error": "Invalid session ID"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request, session_id):
        """Save or update multiple room details"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)
            rooms_data = request.data.get('rooms', [])

            if not rooms_data:
                return Response(
                    {"error": "No room data provided"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            with transaction.atomic():
                RoomDetails.objects.filter(form_session=form_session).delete()

                created_rooms = []
                for room_data in rooms_data:
                    room_details = RoomDetails.objects.create(
                        form_session=form_session,
                        room_type=room_data.get("room_type", ""),
                        occupancy=room_data.get("occupancy", ""),
                        room_price=room_data.get("room_price", ""),
                        room_image=room_data.get("room_image", ""),
                        description=room_data.get("description", ""),
                        room_additional_info=room_data.get("room_additional_info", ""),
                        is_completed=True,
                    )
                    created_rooms.append(room_details)

                if form_session.current_step < 4:
                    form_session.current_step = 4
                    form_session.save()

            return Response(
                {
                    "success": True,
                    "message": f"{len(created_rooms)} room(s) saved successfully",
                    "next_step": 4,
                    "rooms_count": len(created_rooms),
                },
                status=status.HTTP_200_OK,
            )

        except FormSession.DoesNotExist:
            return Response(
                {"error": "Invalid session ID"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )