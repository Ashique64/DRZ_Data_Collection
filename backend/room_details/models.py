from django.db import models
from form_submission.models import FormSession

# Create your models here.


class RoomDetails(models.Model):
    form_session = models.ForeignKey( 
        FormSession, on_delete=models.CASCADE, related_name="room_details"
    )

    room_type = models.CharField(max_length=255, null=True, blank=True)
    occupancy = models.CharField(max_length=255, null=True, blank=True)
    room_price = models.CharField(max_length=255, null=True, blank=True)
    room_image = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()
    room_additional_info = models.TextField()

    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Room Details - {self.form_session.session_id} - {self.room_type}"