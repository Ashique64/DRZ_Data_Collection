from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from .models import Client
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated, AllowAny


class SendEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        print(f"Sending email to {email}")

        if not email:
            return Response(
                {"error": "Email address is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = get_random_string(length=32)
        url = f"http://localhost:5173/form/{token}/"

        try:
            sent_by = request.user

            client, created = Client.objects.get_or_create(
                email=email, defaults={"sent_by": sent_by}
            )

            if not created:
                client.sent_by = sent_by
                client.save()

        except Exception as e:
            return Response(
                {"error": "Error creating client record"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            send_mail(
                subject="Please complete the form",
                message=f"Hello,\n\nPlease fill out the form using the following link:\n{url}\n\nThank you!",
                from_email="hp@digitalroomz.com",
                recipient_list=[email],
                fail_silently=False,
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
