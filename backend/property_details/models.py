from django.db import models
from form_submission.models import FormSession

# Create your models here.
class PropertyDetails(models.Model):
    """Page 1: Property Information"""

    form_session = models.OneToOneField(
        FormSession, on_delete=models.CASCADE, related_name="property_details"
    )

    property_name = models.CharField(max_length=255, null=False, blank=False)
    property_address = models.TextField(null=False, blank=False)
    property_city = models.CharField(max_length=100, null=False, blank=False)
    property_state = models.CharField(max_length=100, null=False, blank=False)
    zip_code = models.CharField(max_length=20, null=False, blank=False)
    property_country = models.CharField(max_length=100, null=False, blank=False)
    bill_to_company = models.CharField(max_length=255, blank=False, null=False)
    gst_number = models.CharField(max_length=50, blank=False, null=False)
    property_phone = models.CharField(max_length=20, null=False, blank=False)
    reservation_phone = models.CharField(max_length=20, blank=False, null=False)
    property_email = models.EmailField(null=False, blank=False)
    property_website = models.URLField(blank=False, null=False)
    base_currency = models.CharField(max_length=50, null=False, blank=False)
    no_of_rooms = models.CharField(max_length=50, null=False, blank=False)
    property_type = models.CharField(max_length=50, null=False, blank=False)
    property_category = models.CharField(max_length=50, null=False, blank=False)
    star_category = models.CharField(max_length=50, null=False, blank=False)
    latitude = models.CharField(max_length=250, null=False, blank=False)
    longitude = models.CharField(max_length=250, null=False, blank=False)
    additional_info = models.TextField()


    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Property Details - {self.property_name}"