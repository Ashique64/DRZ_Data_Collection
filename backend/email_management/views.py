from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
import secrets
from django.core.mail import send_mail
from django.conf import settings
from .models import FormToken
from django.shortcuts import get_object_or_404


class SendFormLinkView(APIView):
    permission_classes = [IsAuthenticated]  # Requires authentication

    def post(self, request, *args, **kwargs):
        try:
            client_email = request.data.get("email")

            if not client_email or "@" not in client_email:
                return Response(
                    {"error": "Please enter a valid email address"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = secrets.token_urlsafe(32)

            form_token = FormToken.objects.create(
                token=token,
                client_email=client_email,
            )

            form_url = f"{settings.FRONTEND_URL}/form/{token}/"
            email_body = f"""
                <p>Hello,</p>
                <p>Please fill out the form using the following link:</p>
                <p><a href="{form_url}">{form_url}</a></p>
                <p>This link will expire in 7 days.</p>
                <br>
                <p>Best regards,<br>Digital Roomz</p>
                """

            send_mail(
                subject="Please complete the form for our service",
                message="",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[client_email],
                fail_silently=False,
                html_message=email_body,
            )

            return Response(
                {
                    "success": True,
                    "message": "Form link sent successfully",
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": "Failed to send email. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class VerifyTokenView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token, *args, **kwargs):
        try:
            form_token = get_object_or_404(FormToken, token=token)

            if form_token.is_valid():
                return Response(
                    {
                        "valid": True,
                        "client_email": form_token.client_email,
                        "expires_at": (
                            form_token.expires_at.isoformat()
                            if form_token.expires_at
                            else None
                        ),
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "valid": False,
                        "message": "Token has expired or already been used",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except FormToken.DoesNotExist:
            return Response(
                {"valid": False, "message": "Invalid token"},
                status=status.HTTP_404_NOT_FOUND,
            )
