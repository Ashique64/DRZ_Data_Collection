from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from form_submission.models import FormSession
from .models import ContactDetails

# Create your views here.


class SaveContactDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, session_id):
        """Fetch existing contact details for a session"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)

            try:
                contact_details = ContactDetails.objects.get(form_session=form_session)

                data = {
                    "op_contact_name": contact_details.op_contact_name,
                    "op_designation": contact_details.op_designation,
                    "op_email": contact_details.op_email,
                    "op_mobile": contact_details.op_mobile,
                    "owner_contact_name": contact_details.owner_contact_name,
                    "owner_designation": contact_details.owner_designation,
                    "owner_email": contact_details.owner_email,
                    "owner_mobile": contact_details.owner_mobile,
                    "billing_contact_name": contact_details.billing_contact_name,
                    "billing_designation": contact_details.billing_designation,
                    "billing_email": contact_details.billing_email,
                    "billing_mobile": contact_details.billing_mobile,
                    "additional_info": contact_details.additional_info,
                    "is_completed": contact_details.is_completed,
                }

                return Response(
                    {"success": True, "data": data}, status=status.HTTP_200_OK
                )

            except ContactDetails.DoesNotExist:
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
        """Save or update contact details (Page 2)"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)
            data = request.data

            contact_details, created = ContactDetails.objects.get_or_create(
                form_session=form_session,
                defaults={
                    "op_contact_name": data.get("op_contact_name", ""),
                    "op_designation": data.get("op_designation", ""),
                    "op_email": data.get("op_email", ""),
                    "op_mobile": data.get("op_mobile", ""),
                    "owner_contact_name": data.get("owner_contact_name", ""),
                    "owner_designation": data.get("owner_designation", ""),
                    "owner_email": data.get("owner_email", ""),
                    "owner_mobile": data.get("owner_mobile", ""),
                    "billing_contact_name": data.get("billing_contact_name", ""),
                    "billing_designation": data.get("billing_designation", ""),
                    "billing_email": data.get("billing_email", ""),
                    "billing_mobile": data.get("billing_mobile", ""),
                    "additional_info": data.get("additional_info", ""),
                    "is_completed": True,
                },
            )

            if not created:
                for field in [
                    "op_contact_name",
                    "op_designation",
                    "op_email",
                    "op_mobile",
                    "owner_contact_name",
                    "owner_designation",
                    "owner_email",
                    "owner_mobile",
                    "billing_contact_name",
                    "billing_designation",
                    "billing_email",
                    "billing_mobile",
                    "additional_info",
                ]:
                    setattr(
                        contact_details,
                        field,
                        data.get(field, getattr(contact_details, field)),
                    )
                contact_details.is_completed = True
                contact_details.save()

            if form_session.current_step < 3:
                form_session.current_step = 3
                form_session.save()

            return Response(
                {
                    "success": True,
                    "message": "Contact details saved successfully",
                    "next_step": 3,
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
