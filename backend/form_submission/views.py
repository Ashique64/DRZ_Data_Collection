from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
import uuid, json
from .models import FormSession, PropertyDetails, ContactDetails, GalleryDetails, MediaFile, WebsiteDetails
from email_management.models import FormToken
from django.core.exceptions import ValidationError


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

# ---------------------------------------------------------------------------------------------

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



# ---------------------------------------------------------------------------------------------

class SaveGalleryDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, session_id):
        """Fetch existing gallery details for a session"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)

            try:
                gallery_details = GalleryDetails.objects.get(
                    form_session=form_session
                )
                
                media_files = MediaFile.objects.filter(gallery_details=gallery_details)
                media_data = {
                    "primary_images": [],
                    "secondary_images": [],
                    "primary_videos": [],
                    "secondary_videos": [],
                }
                
                for file in media_files:
                    if file.file_type == "primary_image":
                        media_data["primary_images"].append({
                            "id": file.id,
                            "url": file.file.url,
                            "name": file.file_name,
                            "size": file.file_size
                        })
                    elif file.file_type == "secondary_image":
                        media_data["secondary_images"].append({
                            "id": file.id,
                            "url": file.file.url,
                            "name": file.file_name,
                            "size": file.file_size
                        })
                    elif file.file_type == "primary_video":
                        media_data["primary_videos"].append({
                            "id": file.id,
                            "url": file.file.url,
                            "name": file.file_name,
                            "size": file.file_size
                        })
                    elif file.file_type == "secondary_video":
                        media_data["secondary_videos"].append({
                            "id": file.id,
                            "url": file.file.url,
                            "name": file.file_name,
                            "size": file.file_size
                        })

                data = {
                    "video_links": gallery_details.video_links,
                    "is_completed": gallery_details.is_completed,
                    "media_files": media_data
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
        """Save or update gallery details with file uploads"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)
            data = request.data
            files = request.FILES

            gallery_details, created = GalleryDetails.objects.get_or_create(
                form_session=form_session,
                defaults={
                    "video_links": data.get("video_links", ""),
                    "is_completed": True,
                },
            )

            if not created:
                gallery_details.video_links = data.get(
                    "video_links", gallery_details.video_links
                )
                gallery_details.is_completed = True
                gallery_details.save()


            file_types = {
                "primary_images": "primary_image",
                "secondary_images": "secondary_image",
                "primary_videos": "primary_video",
                "secondary_videos": "secondary_video",
            }

            for field_name, file_type in file_types.items():
                if field_name in files:
                    file_list = files.getlist(field_name)
                    for file in file_list:
                        MediaFile.objects.create(
                            gallery_details=gallery_details,
                            file_type=file_type,
                            file=file,
                            file_name=file.name,
                            file_size=file.size,
                        )

            if "deleted_files" in data:
                for file_id in data["deleted_files"]:
                    try:
                        file = MediaFile.objects.get(id=file_id)
                        file.file.delete()
                        file.delete()
                    except MediaFile.DoesNotExist:
                        pass

            if form_session.current_step < 4:
                form_session.current_step = 4
                form_session.save()

            return Response(
                {
                    "success": True,
                    "message": "Gallery details saved successfully",
                    "next_step": 4,
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
        


# -------------------------------------------------------------------------------------------------

class SaveWebsiteDetailsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, session_id):
        """Fetch existing website details for a session"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)

            try:
                website_details = WebsiteDetails.objects.get(
                    form_session=form_session
                )

                data = {
                    "website_name": website_details.website_name,
                    "about_us_content": website_details.about_us_content,
                    "additional_content": website_details.additional_content,
                    "domain_url": website_details.domain_url,
                    "domain_password": website_details.domain_password,
                    "domain_username": website_details.domain_username,
                    "existing_website_link": website_details.existing_website_link,
                    "whatsapp": website_details.whatsapp,
                    "facebook": website_details.facebook,
                    "instagram": website_details.instagram,
                    "twitter": website_details.twitter,
                    "property_logo": website_details.property_logo.url if website_details.property_logo else None,
                    "is_completed": website_details.is_completed,
                }

                return Response(
                    {"success": True, "data": data}, status=status.HTTP_200_OK
                )

            except WebsiteDetails.DoesNotExist:
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
        """Save or update website details with file upload"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)
            data = request.data
            files = request.FILES

            # Create or update website details
            website_details, created = WebsiteDetails.objects.get_or_create(
                form_session=form_session,
                defaults={
                    "website_name": data.get("website_name", ""),
                    "about_us_content": data.get("about_us_content", ""),
                    "additional_content": data.get("additional_content", ""),
                    "domain_url": data.get("domain_url", ""),
                    "domain_password": data.get("domain_password", ""),
                    "domain_username": data.get("domain_username", ""),
                    "existing_website_link": data.get("existing_website_link", ""),
                    "whatsapp": data.get("whatsapp", ""),
                    "facebook": data.get("facebook", ""),
                    "instagram": data.get("instagram", ""),
                    "twitter": data.get("twitter", ""),
                    "is_completed": True,
                },
            )

            if not created:
                # Update existing record
                website_details.website_name = data.get(
                    "website_name", website_details.website_name
                )
                website_details.about_us_content = data.get(
                    "about_us_content", website_details.about_us_content
                )
                website_details.additional_content = data.get(
                    "additional_content", website_details.additional_content
                )
                website_details.domain_url = data.get(
                    "domain_url", website_details.domain_url
                )
                website_details.domain_password = data.get(
                    "domain_password", website_details.domain_password
                )
                website_details.domain_username = data.get(
                    "domain_username", website_details.domain_username
                )
                website_details.existing_website_link = data.get(
                    "existing_website_link", website_details.existing_website_link
                )
                website_details.whatsapp = data.get("whatsapp", website_details.whatsapp)
                website_details.facebook = data.get("facebook", website_details.facebook)
                website_details.instagram = data.get("instagram", website_details.instagram)
                website_details.twitter = data.get("twitter", website_details.twitter)
                website_details.is_completed = True
                website_details.save()

            if "property_logo" in files:
                valid_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
                if files["property_logo"].content_type not in valid_types:
                    raise ValidationError("Only PNG, JPEG, JPG, and SVG files are allowed")
                
                if files["property_logo"].size > 5 * 1024 * 1024:
                    raise ValidationError("File size must be less than 5MB")
                
                website_details.property_logo = files["property_logo"]
                website_details.save()

            if form_session.current_step < 5:
                form_session.current_step = 5
                form_session.save()

            return Response(
                {
                    "success": True,
                    "message": "Website details saved successfully",
                    "next_step": 5,
                },
                status=status.HTTP_200_OK,
            )

        except FormSession.DoesNotExist:
            return Response(
                {"error": "Invalid session ID"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except ValidationError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        

# ---------------------------------------------------------------------------------------------








# @csrf_exempt
# @require_http_methods(["POST"])
# def save_website_details(request, session_id):
#     """Save or update website details (Page 4)"""
#     try:
#         form_session = get_object_or_404(FormSession, session_id=session_id)

#         # Handle both JSON and form data
#         if request.content_type == "application/json":
#             data = json.loads(request.body)
#             files = {}
#         else:
#             data = request.POST
#             files = request.FILES

#         # Create or update website details
#         website_details, created = WebsiteDetails.objects.get_or_create(
#             form_session=form_session,
#             defaults={
#                 "website_name": data.get("website_name", ""),
#                 "about_us_content": data.get("about_us_content", ""),
#                 "additional_content": data.get("additional_content", ""),
#                 "domain_url": data.get("domain_url", ""),
#                 "domain_password": data.get("domain_password", ""),
#                 "domain_username": data.get("domain_username", ""),
#                 "existing_website_link": data.get("existing_website_link", ""),
#                 "whatsapp": data.get("whatsapp", ""),
#                 "facebook": data.get("facebook", ""),
#                 "instagram": data.get("instagram", ""),
#                 "twitter": data.get("twitter", ""),
#                 "is_completed": True,
#             },
#         )

#         if not created:
#             # Update existing record
#             website_details.website_name = data.get(
#                 "website_name", website_details.website_name
#             )
#             website_details.about_us_content = data.get(
#                 "about_us_content", website_details.about_us_content
#             )
#             website_details.additional_content = data.get(
#                 "additional_content", website_details.additional_content
#             )
#             website_details.domain_url = data.get(
#                 "domain_url", website_details.domain_url
#             )
#             website_details.domain_password = data.get(
#                 "domain_password", website_details.domain_password
#             )
#             website_details.domain_username = data.get(
#                 "domain_username", website_details.domain_username
#             )
#             website_details.existing_website_link = data.get(
#                 "existing_website_link", website_details.existing_website_link
#             )
#             website_details.whatsapp = data.get("whatsapp", website_details.whatsapp)
#             website_details.facebook = data.get("facebook", website_details.facebook)
#             website_details.instagram = data.get("instagram", website_details.instagram)
#             website_details.twitter = data.get("twitter", website_details.twitter)
#             website_details.is_completed = True
#             website_details.save()

#         # Handle property logo upload
#         if "property_logo" in files:
#             website_details.property_logo = files["property_logo"]
#             website_details.save()

#         # Update session current step to overview
#         form_session.current_step = 5  # Overview page
#         form_session.save()

#         return JsonResponse(
#             {
#                 "success": True,
#                 "message": "Website details saved successfully",
#                 "next_step": 5,
#             }
#         )

#     except FormSession.DoesNotExist:
#         return JsonResponse({"error": "Invalid session"}, status=404)
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)


# @csrf_exempt
# @require_http_methods(["POST"])
# def final_submit(request, session_id):
#     """Final submission - creates consolidated record"""
#     try:
#         form_session = get_object_or_404(FormSession, session_id=session_id)

#         # Check if all required pages are completed
#         required_pages = [
#             hasattr(form_session, "property_details")
#             and form_session.property_details.is_completed,
#             hasattr(form_session, "contact_details")
#             and form_session.contact_details.is_completed,
#             hasattr(form_session, "gallery_details")
#             and form_session.gallery_details.is_completed,
#             hasattr(form_session, "website_details")
#             and form_session.website_details.is_completed,
#         ]

#         if not all(required_pages):
#             return JsonResponse(
#                 {"error": "Please complete all required pages before submitting"},
#                 status=400,
#             )

#         # Create final submission record
#         final_submission, created = FinalSubmission.objects.get_or_create(
#             form_session=form_session,
#             defaults={
#                 "notes": (
#                     request.POST.get("notes", "") if request.method == "POST" else ""
#                 )
#             },
#         )

#         # Mark form session as completed
#         form_session.is_completed = True
#         form_session.save()

#         # Mark token as used
#         form_session.form_token.is_used = True
#         form_session.form_token.save()

#         return JsonResponse(
#             {
#                 "success": True,
#                 "message": "Form submitted successfully",
#                 "submission_id": final_submission.id,
#             }
#         )

#     except FormSession.DoesNotExist:
#         return JsonResponse({"error": "Invalid session"}, status=404)
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)


# @require_http_methods(["GET"])
# def get_form_overview(request, session_id):
#     """Get overview of all form data for review"""
#     try:
#         form_session = get_object_or_404(FormSession, session_id=session_id)

#         overview_data = {
#             "session_id": session_id,
#             "current_step": form_session.current_step,
#             "is_completed": form_session.is_completed,
#             "property_details": None,
#             "contact_details": None,
#             "gallery_details": None,
#             "website_details": None,
#             "completion_status": {
#                 "property_details": False,
#                 "contact_details": False,
#                 "gallery_details": False,
#                 "website_details": False,
#             },
#         }

#         # Get property details
#         if hasattr(form_session, "property_details") and form_session.property_details:
#             pd = form_session.property_details
#             overview_data["property_details"] = {
#                 "property_name": pd.property_name,
#                 "property_address": pd.property_address,
#                 "property_city": pd.property_city,
#                 "property_state": pd.property_state,
#                 "zip_code": pd.zip_code,
#                 "property_country": pd.property_country,
#                 "bill_to_company": pd.bill_to_company,
#                 "gst_number": pd.gst_number,
#                 "property_phone": pd.property_phone,
#                 "reservation_phone": pd.reservation_phone,
#                 "property_email": pd.property_email,
#                 "property_website": pd.property_website,
#             }
#             overview_data["completion_status"]["property_details"] = pd.is_completed

#         # Get contact details
#         if hasattr(form_session, "contact_details") and form_session.contact_details:
#             cd = form_session.contact_details
#             overview_data["contact_details"] = {
#                 "op_contact_name": cd.op_contact_name,
#                 "op_designation": cd.op_designation,
#                 "op_email": cd.op_email,
#                 "op_mobile": cd.op_mobile,
#                 "owner_contact_name": cd.owner_contact_name,
#                 "owner_designation": cd.owner_designation,
#                 "owner_email": cd.owner_email,
#                 "owner_mobile": cd.owner_mobile,
#                 "billing_contact_name": cd.billing_contact_name,
#                 "billing_designation": cd.billing_designation,
#                 "billing_email": cd.billing_email,
#                 "billing_mobile": cd.billing_mobile,
#             }
#             overview_data["completion_status"]["contact_details"] = cd.is_completed

#         # Get gallery details
#         if hasattr(form_session, "gallery_details") and form_session.gallery_details:
#             gd = form_session.gallery_details
#             media_files = MediaFile.objects.filter(gallery_details=gd)

#             files_by_type = {}
#             for media_file in media_files:
#                 if media_file.file_type not in files_by_type:
#                     files_by_type[media_file.file_type] = []
#                 files_by_type[media_file.file_type].append(
#                     {
#                         "id": media_file.id,
#                         "file_name": media_file.file_name,
#                         "file_url": media_file.file.url,
#                         "file_size": media_file.file_size,
#                         "uploaded_at": media_file.uploaded_at.isoformat(),
#                     }
#                 )

#             overview_data["gallery_details"] = {
#                 "video_links": gd.video_links,
#                 "gallery_description": gd.gallery_description,
#                 "media_files": files_by_type,
#             }
#             overview_data["completion_status"]["gallery_details"] = gd.is_completed

#         # Get website details
#         if hasattr(form_session, "website_details") and form_session.website_details:
#             wd = form_session.website_details
#             overview_data["website_details"] = {
#                 "property_logo": wd.property_logo.url if wd.property_logo else None,
#                 "website_name": wd.website_name,
#                 "about_us_content": wd.about_us_content,
#                 "additional_content": wd.additional_content,
#                 "domain_url": wd.domain_url,
#                 "domain_username": wd.domain_username,
#                 "existing_website_link": wd.existing_website_link,
#                 "whatsapp": wd.whatsapp,
#                 "facebook": wd.facebook,
#                 "instagram": wd.instagram,
#                 "twitter": wd.twitter,
#             }
#             overview_data["completion_status"]["website_details"] = wd.is_completed

#         return JsonResponse({"success": True, "overview": overview_data})

#     except FormSession.DoesNotExist:
#         return JsonResponse({"error": "Invalid session"}, status=404)
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)


# @require_http_methods(["GET"])
# def get_page_data(request, session_id, page_name):
#     """Get specific page data for editing"""
#     try:
#         form_session = get_object_or_404(FormSession, session_id=session_id)

#         if page_name == "property":
#             if (
#                 hasattr(form_session, "property_details")
#                 and form_session.property_details
#             ):
#                 pd = form_session.property_details
#                 return JsonResponse(
#                     {
#                         "success": True,
#                         "data": {
#                             "property_name": pd.property_name,
#                             "property_address": pd.property_address,
#                             "property_city": pd.property_city,
#                             "property_state": pd.property_state,
#                             "zip_code": pd.zip_code,
#                             "property_country": pd.property_country,
#                             "bill_to_company": pd.bill_to_company,
#                             "gst_number": pd.gst_number,
#                             "property_phone": pd.property_phone,
#                             "reservation_phone": pd.reservation_phone,
#                             "property_email": pd.property_email,
#                             "property_website": pd.property_website,
#                             "is_completed": pd.is_completed,
#                         },
#                     }
#                 )
#             else:
#                 return JsonResponse({"success": True, "data": {}})

#         elif page_name == "contact":
#             if (
#                 hasattr(form_session, "contact_details")
#                 and form_session.contact_details
#             ):
#                 cd = form_session.contact_details
#                 return JsonResponse(
#                     {
#                         "success": True,
#                         "data": {
#                             "op_contact_name": cd.op_contact_name,
#                             "op_designation": cd.op_designation,
#                             "op_email": cd.op_email,
#                             "op_mobile": cd.op_mobile,
#                             "owner_contact_name": cd.owner_contact_name,
#                             "owner_designation": cd.owner_designation,
#                             "owner_email": cd.owner_email,
#                             "owner_mobile": cd.owner_mobile,
#                             "billing_contact_name": cd.billing_contact_name,
#                             "billing_designation": cd.billing_designation,
#                             "billing_email": cd.billing_email,
#                             "billing_mobile": cd.billing_mobile,
#                             "is_completed": cd.is_completed,
#                         },
#                     }
#                 )
#             else:
#                 return JsonResponse({"success": True, "data": {}})

#         elif page_name == "gallery":
#             if (
#                 hasattr(form_session, "gallery_details")
#                 and form_session.gallery_details
#             ):
#                 gd = form_session.gallery_details
#                 media_files = MediaFile.objects.filter(gallery_details=gd)

#                 files_by_type = {}
#                 for media_file in media_files:
#                     if media_file.file_type not in files_by_type:
#                         files_by_type[media_file.file_type] = []
#                     files_by_type[media_file.file_type].append(
#                         {
#                             "id": media_file.id,
#                             "file_name": media_file.file_name,
#                             "file_url": media_file.file.url,
#                             "file_size": media_file.file_size,
#                             "uploaded_at": media_file.uploaded_at.isoformat(),
#                         }
#                     )

#                 return JsonResponse(
#                     {
#                         "success": True,
#                         "data": {
#                             "video_links": gd.video_links,
#                             "gallery_description": gd.gallery_description,
#                             "media_files": files_by_type,
#                             "is_completed": gd.is_completed,
#                         },
#                     }
#                 )
#             else:
#                 return JsonResponse({"success": True, "data": {}})

#         elif page_name == "website":
#             if (
#                 hasattr(form_session, "website_details")
#                 and form_session.website_details
#             ):
#                 wd = form_session.website_details
#                 return JsonResponse(
#                     {
#                         "success": True,
#                         "data": {
#                             "property_logo": (
#                                 wd.property_logo.url if wd.property_logo else None
#                             ),
#                             "website_name": wd.website_name,
#                             "about_us_content": wd.about_us_content,
#                             "additional_content": wd.additional_content,
#                             "domain_url": wd.domain_url,
#                             "domain_password": wd.domain_password,
#                             "domain_username": wd.domain_username,
#                             "existing_website_link": wd.existing_website_link,
#                             "whatsapp": wd.whatsapp,
#                             "facebook": wd.facebook,
#                             "instagram": wd.instagram,
#                             "twitter": wd.twitter,
#                             "is_completed": wd.is_completed,
#                         },
#                     }
#                 )
#             else:
#                 return JsonResponse({"success": True, "data": {}})

#         else:
#             return JsonResponse({"error": "Invalid page name"}, status=400)

#     except FormSession.DoesNotExist:
#         return JsonResponse({"error": "Invalid session"}, status=404)
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)
