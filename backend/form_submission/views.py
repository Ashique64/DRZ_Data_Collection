from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
import uuid, json
from .models import FormSession
from email_management.models import FormToken
# from django.core.exceptions import ValidationError


class InitializeFormSessionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, token):
        form_token = get_object_or_404(FormToken, token=token)

        if not form_token.is_valid():
            return Response(
                {"error": "Token has expired or already been used"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing_session = FormSession.objects.filter(form_token=form_token).first()
        if existing_session:
            return Response(
                {
                    "success": True,
                    "session_id": existing_session.session_id,
                    "current_step": existing_session.current_step,
                    "message": "Session already exists",
                },
                status=status.HTTP_200_OK,
            )

        session_id = str(uuid.uuid4())
        FormSession.objects.create(
            form_token=form_token,
            session_id=session_id,
            current_step=1,
            category=form_token.category
        )

        return Response(
            {
                "success": True,
                "session_id": session_id,
                "current_step": 1,
                "message": "Form session initialized",
            },
            status=status.HTTP_201_CREATED,
        )

        

# # ---------------------------------------------------------------------------------------------









# # @csrf_exempt
# # @require_http_methods(["POST"])
# # def final_submit(request, session_id):
# #     """Final submission - creates consolidated record"""
# #     try:
# #         form_session = get_object_or_404(FormSession, session_id=session_id)

# #         # Check if all required pages are completed
# #         required_pages = [
# #             hasattr(form_session, "property_details")
# #             and form_session.property_details.is_completed,
# #             hasattr(form_session, "contact_details")
# #             and form_session.contact_details.is_completed,
# #             hasattr(form_session, "gallery_details")
# #             and form_session.gallery_details.is_completed,
# #             hasattr(form_session, "website_details")
# #             and form_session.website_details.is_completed,
# #         ]

# #         if not all(required_pages):
# #             return JsonResponse(
# #                 {"error": "Please complete all required pages before submitting"},
# #                 status=400,
# #             )

# #         # Create final submission record
# #         final_submission, created = FinalSubmission.objects.get_or_create(
# #             form_session=form_session,
# #             defaults={
# #                 "notes": (
# #                     request.POST.get("notes", "") if request.method == "POST" else ""
# #                 )
# #             },
# #         )

# #         # Mark form session as completed
# #         form_session.is_completed = True
# #         form_session.save()

# #         # Mark token as used
# #         form_session.form_token.is_used = True
# #         form_session.form_token.save()

# #         return JsonResponse(
# #             {
# #                 "success": True,
# #                 "message": "Form submitted successfully",
# #                 "submission_id": final_submission.id,
# #             }
# #         )

# #     except FormSession.DoesNotExist:
# #         return JsonResponse({"error": "Invalid session"}, status=404)
# #     except Exception as e:
# #         return JsonResponse({"error": str(e)}, status=500)


# # @require_http_methods(["GET"])
# # def get_form_overview(request, session_id):
# #     """Get overview of all form data for review"""
# #     try:
# #         form_session = get_object_or_404(FormSession, session_id=session_id)

# #         overview_data = {
# #             "session_id": session_id,
# #             "current_step": form_session.current_step,
# #             "is_completed": form_session.is_completed,
# #             "property_details": None,
# #             "contact_details": None,
# #             "gallery_details": None,
# #             "website_details": None,
# #             "completion_status": {
# #                 "property_details": False,
# #                 "contact_details": False,
# #                 "gallery_details": False,
# #                 "website_details": False,
# #             },
# #         }

# #         # Get property details
# #         if hasattr(form_session, "property_details") and form_session.property_details:
# #             pd = form_session.property_details
# #             overview_data["property_details"] = {
# #                 "property_name": pd.property_name,
# #                 "property_address": pd.property_address,
# #                 "property_city": pd.property_city,
# #                 "property_state": pd.property_state,
# #                 "zip_code": pd.zip_code,
# #                 "property_country": pd.property_country,
# #                 "bill_to_company": pd.bill_to_company,
# #                 "gst_number": pd.gst_number,
# #                 "property_phone": pd.property_phone,
# #                 "reservation_phone": pd.reservation_phone,
# #                 "property_email": pd.property_email,
# #                 "property_website": pd.property_website,
# #             }
# #             overview_data["completion_status"]["property_details"] = pd.is_completed

# #         # Get contact details
# #         if hasattr(form_session, "contact_details") and form_session.contact_details:
# #             cd = form_session.contact_details
# #             overview_data["contact_details"] = {
# #                 "op_contact_name": cd.op_contact_name,
# #                 "op_designation": cd.op_designation,
# #                 "op_email": cd.op_email,
# #                 "op_mobile": cd.op_mobile,
# #                 "owner_contact_name": cd.owner_contact_name,
# #                 "owner_designation": cd.owner_designation,
# #                 "owner_email": cd.owner_email,
# #                 "owner_mobile": cd.owner_mobile,
# #                 "billing_contact_name": cd.billing_contact_name,
# #                 "billing_designation": cd.billing_designation,
# #                 "billing_email": cd.billing_email,
# #                 "billing_mobile": cd.billing_mobile,
# #             }
# #             overview_data["completion_status"]["contact_details"] = cd.is_completed

# #         # Get gallery details
# #         if hasattr(form_session, "gallery_details") and form_session.gallery_details:
# #             gd = form_session.gallery_details
# #             media_files = MediaFile.objects.filter(gallery_details=gd)

# #             files_by_type = {}
# #             for media_file in media_files:
# #                 if media_file.file_type not in files_by_type:
# #                     files_by_type[media_file.file_type] = []
# #                 files_by_type[media_file.file_type].append(
# #                     {
# #                         "id": media_file.id,
# #                         "file_name": media_file.file_name,
# #                         "file_url": media_file.file.url,
# #                         "file_size": media_file.file_size,
# #                         "uploaded_at": media_file.uploaded_at.isoformat(),
# #                     }
# #                 )

# #             overview_data["gallery_details"] = {
# #                 "video_links": gd.video_links,
# #                 "gallery_description": gd.gallery_description,
# #                 "media_files": files_by_type,
# #             }
# #             overview_data["completion_status"]["gallery_details"] = gd.is_completed

# #         # Get website details
# #         if hasattr(form_session, "website_details") and form_session.website_details:
# #             wd = form_session.website_details
# #             overview_data["website_details"] = {
# #                 "property_logo": wd.property_logo.url if wd.property_logo else None,
# #                 "website_name": wd.website_name,
# #                 "about_us_content": wd.about_us_content,
# #                 "additional_content": wd.additional_content,
# #                 "domain_url": wd.domain_url,
# #                 "domain_username": wd.domain_username,
# #                 "existing_website_link": wd.existing_website_link,
# #                 "whatsapp": wd.whatsapp,
# #                 "facebook": wd.facebook,
# #                 "instagram": wd.instagram,
# #                 "twitter": wd.twitter,
# #             }
# #             overview_data["completion_status"]["website_details"] = wd.is_completed

# #         return JsonResponse({"success": True, "overview": overview_data})

# #     except FormSession.DoesNotExist:
# #         return JsonResponse({"error": "Invalid session"}, status=404)
# #     except Exception as e:
# #         return JsonResponse({"error": str(e)}, status=500)


# # @require_http_methods(["GET"])
# # def get_page_data(request, session_id, page_name):
# #     """Get specific page data for editing"""
# #     try:
# #         form_session = get_object_or_404(FormSession, session_id=session_id)

# #         if page_name == "property":
# #             if (
# #                 hasattr(form_session, "property_details")
# #                 and form_session.property_details
# #             ):
# #                 pd = form_session.property_details
# #                 return JsonResponse(
# #                     {
# #                         "success": True,
# #                         "data": {
# #                             "property_name": pd.property_name,
# #                             "property_address": pd.property_address,
# #                             "property_city": pd.property_city,
# #                             "property_state": pd.property_state,
# #                             "zip_code": pd.zip_code,
# #                             "property_country": pd.property_country,
# #                             "bill_to_company": pd.bill_to_company,
# #                             "gst_number": pd.gst_number,
# #                             "property_phone": pd.property_phone,
# #                             "reservation_phone": pd.reservation_phone,
# #                             "property_email": pd.property_email,
# #                             "property_website": pd.property_website,
# #                             "is_completed": pd.is_completed,
# #                         },
# #                     }
# #                 )
# #             else:
# #                 return JsonResponse({"success": True, "data": {}})

# #         elif page_name == "contact":
# #             if (
# #                 hasattr(form_session, "contact_details")
# #                 and form_session.contact_details
# #             ):
# #                 cd = form_session.contact_details
# #                 return JsonResponse(
# #                     {
# #                         "success": True,
# #                         "data": {
# #                             "op_contact_name": cd.op_contact_name,
# #                             "op_designation": cd.op_designation,
# #                             "op_email": cd.op_email,
# #                             "op_mobile": cd.op_mobile,
# #                             "owner_contact_name": cd.owner_contact_name,
# #                             "owner_designation": cd.owner_designation,
# #                             "owner_email": cd.owner_email,
# #                             "owner_mobile": cd.owner_mobile,
# #                             "billing_contact_name": cd.billing_contact_name,
# #                             "billing_designation": cd.billing_designation,
# #                             "billing_email": cd.billing_email,
# #                             "billing_mobile": cd.billing_mobile,
# #                             "is_completed": cd.is_completed,
# #                         },
# #                     }
# #                 )
# #             else:
# #                 return JsonResponse({"success": True, "data": {}})

# #         elif page_name == "gallery":
# #             if (
# #                 hasattr(form_session, "gallery_details")
# #                 and form_session.gallery_details
# #             ):
# #                 gd = form_session.gallery_details
# #                 media_files = MediaFile.objects.filter(gallery_details=gd)

# #                 files_by_type = {}
# #                 for media_file in media_files:
# #                     if media_file.file_type not in files_by_type:
# #                         files_by_type[media_file.file_type] = []
# #                     files_by_type[media_file.file_type].append(
# #                         {
# #                             "id": media_file.id,
# #                             "file_name": media_file.file_name,
# #                             "file_url": media_file.file.url,
# #                             "file_size": media_file.file_size,
# #                             "uploaded_at": media_file.uploaded_at.isoformat(),
# #                         }
# #                     )

# #                 return JsonResponse(
# #                     {
# #                         "success": True,
# #                         "data": {
# #                             "video_links": gd.video_links,
# #                             "gallery_description": gd.gallery_description,
# #                             "media_files": files_by_type,
# #                             "is_completed": gd.is_completed,
# #                         },
# #                     }
# #                 )
# #             else:
# #                 return JsonResponse({"success": True, "data": {}})

# #         elif page_name == "website":
# #             if (
# #                 hasattr(form_session, "website_details")
# #                 and form_session.website_details
# #             ):
# #                 wd = form_session.website_details
# #                 return JsonResponse(
# #                     {
# #                         "success": True,
# #                         "data": {
# #                             "property_logo": (
# #                                 wd.property_logo.url if wd.property_logo else None
# #                             ),
# #                             "website_name": wd.website_name,
# #                             "about_us_content": wd.about_us_content,
# #                             "additional_content": wd.additional_content,
# #                             "domain_url": wd.domain_url,
# #                             "domain_password": wd.domain_password,
# #                             "domain_username": wd.domain_username,
# #                             "existing_website_link": wd.existing_website_link,
# #                             "whatsapp": wd.whatsapp,
# #                             "facebook": wd.facebook,
# #                             "instagram": wd.instagram,
# #                             "twitter": wd.twitter,
# #                             "is_completed": wd.is_completed,
# #                         },
# #                     }
# #                 )
# #             else:
# #                 return JsonResponse({"success": True, "data": {}})

# #         else:
# #             return JsonResponse({"error": "Invalid page name"}, status=400)

# #     except FormSession.DoesNotExist:
# #         return JsonResponse({"error": "Invalid session"}, status=404)
# #     except Exception as e:
# #         return JsonResponse({"error": str(e)}, status=500)
