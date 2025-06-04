from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from .models import Client
from django.core.mail import send_mail


class SendEmailView(APIView):
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response(
                {"error": "Email address is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = get_random_string(length=32)
        url = f"http://localhost:5173/form/{token}/"

        try:
            sent_by = User.objects.first()
            Client.objects.create(email=email, sent_by=sent_by)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid sender ID"}, status=status.HTTP_400_BAD_REQUEST
            )

        send_mail(
            subject="Please complete the form",
            message=f"Hello,\n\nPlease fill out the form using the following link:\n{url}\n\nThank you!",
            from_email="hp@digitalroomz.com",
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({"message": "Email sent successfully", "url": url}, status=status.HTTP_200_OK)
