from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from .models import Client
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone


class SendEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response(
                {"error": "Email address is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = get_random_string(length=32)
        url = f"http://localhost:5173/form/"
        # url = f"http://localhost:5173/form/{token}/"

        try:
            sent_by = request.user

            client, created = Client.objects.get_or_create(
                email=email,
                defaults={
                    "sent_by": sent_by,
                    "token": token,
                    "token_created_at": timezone.now(),
                },
            )

            if not created:
                client.sent_by = sent_by
                client.token = token
                client.token_created_at = timezone.now()
                client.save()

        except Exception as e:
            return Response(
                {"error": "Error creating client record"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            message = f"""Hello,<br><br>Please fill out the form using the following link:<br><a href="{url}">{url}</a><br><br>Copy the below Token and fill it in the form:<br><strong>{token}</strong><br><br>Thank you!"""

            send_mail(
                subject="Please complete the form for our service",
                message="",
                from_email="hp@digitalroomz.com",
                recipient_list=[email],
                fail_silently=False,
                html_message=message,
            )
        except Exception as e:
            return Response(
                {"error": "Failed to send email"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"message": "Email sent successfully", "url": url},
            status=status.HTTP_200_OK,
        )
