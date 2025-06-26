from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from form_submission.models import FormSession
from .models import GalleryDetails

# Create your views here.


class SaveGalleryDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, session_id):
        """Fetch existing contact details for a session"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)

            try:
                gallery_details = GalleryDetails.objects.get(form_session=form_session)

                data = {
                    "accommodation_links": gallery_details.accommodation_links,
                    "ambience_links": gallery_details.ambience_links,
                    "amenities_links": gallery_details.amenities_links,
                    "other_links": gallery_details.other_links,
                    "is_completed": gallery_details.is_completed,
                }

                return Response(
                    {"success": True, "data": data}, status=status.HTTP_200_OK
                )

            except GalleryDetails.DoesNotExist:
                return Response(
                    {"success": True, "data": {}}, status=status.HTTP_200_OK
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
        """Save or update gallery details """
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)
            data = request.data

            gallery_details, created = GalleryDetails.objects.get_or_create(
                form_session=form_session,
                defaults={
                    "accommodation_links": data.get("accommodation_links", ""),
                    "ambience_links": data.get("ambience_links", ""),
                    "amenities_links": data.get("amenities_links", ""),
                    "other_links": data.get("other_links", ""),
                    "is_completed": True,
                },
            )

            if not created:
                for field in [
                    "accommodation_links",
                    "ambience_links",
                    "amenities_links",
                    "other_links",
                ]:
                    setattr(
                        gallery_details,
                        field,
                        data.get(field, getattr(gallery_details, field)),
                    )
                gallery_details.is_completed = True
                gallery_details.save()

            if form_session.current_step < 5:
                form_session.current_step = 5
                form_session.save()

            return Response(
                {
                    "success": True,
                    "message": "Gallery details saved successfully",
                    "next_step": 5,
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
