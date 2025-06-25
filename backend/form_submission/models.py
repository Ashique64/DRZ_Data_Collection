from django.db import models
from email_management.models import FormToken, Categories

# Create your models here.


class FormSession(models.Model):
    """Master session to track multi-page form progress"""

    form_token = models.OneToOneField(
        FormToken, on_delete=models.CASCADE, related_name="form_session"
    )
    session_id = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name="form_session_category")
    is_completed = models.BooleanField(default=False)
    current_step = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Session {self.session_id} - {self.form_token.client_email}"





# class ContactDetails(models.Model):
#     """Page 2: Contact Information"""

#     form_session = models.OneToOneField(
#         FormSession, on_delete=models.CASCADE, related_name="contact_details"
#     )

#     # Contact Details - Operational/Support
#     op_contact_name = models.CharField(max_length=255, null=True, blank=True)
#     op_designation = models.CharField(max_length=100, blank=True, null=True)
#     op_email = models.EmailField(null=True, blank=True)
#     op_mobile = models.CharField(max_length=20, null=True, blank=True)

#     # Contact Details - Owner/Manager
#     owner_contact_name = models.CharField(max_length=255, null=True, blank=True)
#     owner_designation = models.CharField(max_length=100, blank=True, null=True)
#     owner_email = models.EmailField(null=True, blank=True)
#     owner_mobile = models.CharField(max_length=20, null=True, blank=True)

#     # Contact Details - Billing
#     billing_contact_name = models.CharField(max_length=255, null=True, blank=True)
#     billing_designation = models.CharField(max_length=100, blank=True, null=True)
#     billing_email = models.EmailField(null=True, blank=True)
#     billing_mobile = models.CharField(max_length=20, null=True, blank=True)

#     is_completed = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Contact Details - {self.form_session.session_id}"


# class GalleryDetails(models.Model):
#     """Page 3: Gallery and Media"""
#     form_session = models.OneToOneField(
#         FormSession, on_delete=models.CASCADE, related_name="gallery_details"
#     )
#     video_links = models.TextField(blank=True, null=True)
#     is_completed = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Gallery Details - {self.form_session.session_id}"


# class MediaFile(models.Model):
#     """Media files associated with gallery details"""
#     FILE_TYPES = [
#         ('primary_image', 'Primary Image'),
#         ('secondary_image', 'Secondary Image'),
#         ('primary_video', 'Primary Video'),
#         ('secondary_video', 'Secondary Video'),
#     ]
    
#     gallery_details = models.ForeignKey(
#         GalleryDetails, on_delete=models.CASCADE, related_name="media_files"
#     )
#     file_type = models.CharField(max_length=20, choices=FILE_TYPES)
#     file = models.FileField(upload_to='gallery_media/')
#     file_name = models.CharField(max_length=255)
#     file_size = models.PositiveIntegerField()
#     uploaded_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.get_file_type_display()} - {self.file_name}"



# class WebsiteDetails(models.Model):
#     """Page 4: Website and Social Media Information"""

#     form_session = models.OneToOneField(
#         FormSession, on_delete=models.CASCADE, related_name="website_details"
#     )

#     # Website Details
#     property_logo = models.ImageField(upload_to="logos/", blank=True, null=True)
#     website_name = models.CharField(max_length=255, blank=True, null=True)
#     about_us_content = models.TextField(blank=True, null=True)
#     additional_content = models.TextField(blank=True, null=True)

#     # Domain Related Information
#     domain_url = models.URLField(blank=True, null=True)
#     domain_password = models.CharField(max_length=255, blank=True, null=True)
#     domain_username = models.CharField(max_length=255, blank=True, null=True)
#     existing_website_link = models.URLField(blank=True, null=True)

#     # Social Media Information
#     whatsapp = models.CharField(max_length=255, blank=True, null=True)
#     facebook = models.CharField(max_length=255, blank=True, null=True)
#     instagram = models.CharField(max_length=255, blank=True, null=True)
#     twitter = models.CharField(max_length=255, blank=True, null=True)

#     is_completed = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Website Details - {self.website_name}"














# class WebsiteDetails(models.Model):
#     """Page 4: Website and Social Media Information"""

#     form_session = models.OneToOneField(
#         FormSession, on_delete=models.CASCADE, related_name="website_details"
#     )

#     # Website Details
#     property_logo = models.ImageField(upload_to="logos/", blank=True, null=True)
#     website_name = models.CharField(max_length=255, blank=True, null=True)
#     about_us_content = models.TextField(blank=True, null=True)
#     additional_content = models.TextField(blank=True, null=True)

#     # Domain Related Information
#     domain_url = models.URLField(blank=True, null=True)
#     domain_password = models.CharField(max_length=255, blank=True, null=True)
#     domain_username = models.CharField(max_length=255, blank=True, null=True)
#     existing_website_link = models.URLField(blank=True, null=True)

#     # Social Media Information
#     whatsapp = models.CharField(max_length=255, blank=True, null=True)
#     facebook = models.CharField(max_length=255, blank=True, null=True)
#     instagram = models.CharField(max_length=255, blank=True, null=True)
#     twitter = models.CharField(max_length=255, blank=True, null=True)

#     is_completed = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Website Details - {self.website_name}"





# class FinalSubmission(models.Model):
#     """Final consolidated submission after all pages are completed"""

#     form_session = models.OneToOneField(
#         FormSession, on_delete=models.CASCADE, related_name="final_submission"
#     )

#     # This will be created only when user clicks final submit
#     submitted_at = models.DateTimeField(auto_now_add=True)

#     # Optional: Add any final submission specific fields
#     notes = models.TextField(blank=True, null=True)

#     def __str__(self):
#         return f"Final Submission - {self.form_session.session_id}"

#     class Meta:
#         ordering = ["-submitted_at"]
