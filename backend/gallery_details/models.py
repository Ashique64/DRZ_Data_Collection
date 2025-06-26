from django.db import models
from form_submission.models import FormSession

# Create your models here.


class GalleryDetails(models.Model):

    form_session = models.OneToOneField(
        FormSession, on_delete=models.CASCADE, related_name="gallery_details"
    )

    accommodation_links = models.CharField(max_length=255, null=True, blank=True)
    ambience_links = models.CharField(max_length=255, null=True, blank=True)
    amenities_links = models.CharField(max_length=255, null=True, blank=True)
    other_links = models.CharField(max_length=255, null=True, blank=True)

    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Gallery Details - {self.form_session.session_id}"