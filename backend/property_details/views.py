from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from form_submission.models import FormSession
from .models import PropertyDetails
# Create your views here.

class SavePropertyDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, session_id):
        """Fetch existing property details for a session"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)

            try:
                property_details = PropertyDetails.objects.get(
                    form_session=form_session
                )

                data = {
                    "property_name": property_details.property_name,
                    "property_address": property_details.property_address,
                    "property_city": property_details.property_city,
                    "property_state": property_details.property_state,
                    "zip_code": property_details.zip_code,
                    "property_country": property_details.property_country,
                    "bill_to_company": property_details.bill_to_company,
                    "gst_number": property_details.gst_number,
                    "property_phone": property_details.property_phone,
                    "reservation_phone": property_details.reservation_phone,
                    "property_email": property_details.property_email,
                    "property_website": property_details.property_website,
                    "base_currency": property_details.base_currency,
                    "no_of_rooms": property_details.no_of_rooms,
                    "property_type": property_details.property_type,
                    "property_category": property_details.property_category,
                    "star_category": property_details.star_category,
                    "latitude": property_details.latitude,
                    "longitude": property_details.longitude,
                    "additional_info": property_details.additional_info,
                    "is_completed": property_details.is_completed,
                }

                return Response(
                    {"success": True, "data": data}, status=status.HTTP_200_OK
                )

            except PropertyDetails.DoesNotExist:
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
        form_session = get_object_or_404(FormSession, session_id=session_id)
        data = request.data

        property_details, created = PropertyDetails.objects.get_or_create(
            form_session=form_session,
            defaults={
                "property_name": data.get("property_name", ""),
                "property_address": data.get("property_address", ""),
                "property_city": data.get("property_city", ""),
                "property_state": data.get("property_state", ""),
                "zip_code": data.get("zip_code", ""),
                "property_country": data.get("property_country", ""),
                "bill_to_company": data.get("bill_to_company", ""),
                "gst_number": data.get("gst_number", ""),
                "property_phone": data.get("property_phone", ""),
                "reservation_phone": data.get("reservation_phone", ""),
                "property_email": data.get("property_email", ""),
                "property_website": data.get("property_website", ""),
                "base_currency": data.get("base_currency", ""),
                "no_of_rooms": data.get("no_of_rooms", ""),
                "property_type": data.get("property_type", ""),
                "property_category": data.get("property_category", ""),
                "star_category": data.get("star_category", ""),
                "latitude": data.get("latitude", ""),
                "longitude": data.get("longitude", ""),
                "additional_info": data.get("additional_info", ""),
                "is_completed": True,
            },
        )

        if not created:

            for field in [
                "property_name",
                "property_address",
                "property_city",
                "property_state",
                "zip_code",
                "property_country",
                "bill_to_company",
                "gst_number",
                "property_phone",
                "reservation_phone",
                "property_email",
                "property_website",
                "base_currency",
                "no_of_rooms",
                "property_type",
                "property_category",
                "star_category",
                "latitude",
                "longitude",
                "additional_info",
            ]:
                setattr(
                    property_details,
                    field,
                    data.get(field, getattr(property_details, field)),
                )
            property_details.is_completed = True
            property_details.save()

        if form_session.current_step < 2:
            form_session.current_step = 2
            form_session.save()

        return Response(
            {
                "success": True,
                "message": "Property details saved successfully",
                "next_step": 2,
            },
            status=status.HTTP_200_OK,
        )