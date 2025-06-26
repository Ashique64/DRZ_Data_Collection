from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from form_submission.models import FormSession
from .models import WebsiteDetails

# Create your views here.



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
                    "near_by": website_details.near_by,
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
                    "near_by": data.get("near_by", ""),
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
                website_details.near_by = data.get(
                    "near_by", website_details.near_by
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

            if form_session.current_step < 6:
                form_session.current_step = 6
                form_session.save()

            return Response(
                {
                    "success": True,
                    "message": "Website details saved successfully",
                    "next_step": 6,
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
