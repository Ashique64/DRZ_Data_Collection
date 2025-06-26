from django.db import models
from form_submission.models import FormSession

# Create your models here.


class WebsiteDetails(models.Model):

    form_session = models.OneToOneField(
        FormSession, on_delete=models.CASCADE, related_name="website_details"
    )

    # Website Details
    property_logo = models.ImageField(upload_to="logos/", blank=True, null=True)
    website_name = models.CharField(max_length=255, blank=True, null=True)
    about_us_content = models.TextField(blank=True, null=True)
    additional_content = models.TextField(blank=True, null=True)
    near_by = models.TextField(blank=True, null=True)

    # Domain Related Information
    domain_url = models.URLField(blank=True, null=True)
    domain_password = models.CharField(max_length=255, blank=True, null=True)
    domain_username = models.CharField(max_length=255, blank=True, null=True)
    existing_website_link = models.URLField(blank=True, null=True)

    # Social Media Information
    whatsapp = models.CharField(max_length=255, blank=True, null=True)
    facebook = models.CharField(max_length=255, blank=True, null=True)
    instagram = models.CharField(max_length=255, blank=True, null=True)
    twitter = models.CharField(max_length=255, blank=True, null=True)

    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Website Details - {self.website_name}"