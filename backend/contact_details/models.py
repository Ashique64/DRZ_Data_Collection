from django.db import models
from form_submission.models import FormSession

# Create your models here.


class ContactDetails(models.Model):
    """Page 2: Contact Information"""

    form_session = models.OneToOneField(
        FormSession, on_delete=models.CASCADE, related_name="contact_details"
    )

    # Contact Details - Operational/Support
    op_contact_name = models.CharField(max_length=255, null=True, blank=True)
    op_designation = models.CharField(max_length=100, blank=True, null=True)
    op_email = models.EmailField(null=True, blank=True)
    op_mobile = models.CharField(max_length=20, null=True, blank=True)

    # Contact Details - Owner/Manager
    owner_contact_name = models.CharField(max_length=255, null=True, blank=True)
    owner_designation = models.CharField(max_length=100, blank=True, null=True)
    owner_email = models.EmailField(null=True, blank=True)
    owner_mobile = models.CharField(max_length=20, null=True, blank=True)

    # Contact Details - Billing
    billing_contact_name = models.CharField(max_length=255, null=True, blank=True)
    billing_designation = models.CharField(max_length=100, blank=True, null=True)
    billing_email = models.EmailField(null=True, blank=True)
    billing_mobile = models.CharField(max_length=20, null=True, blank=True)

    additional_info = models.TextField()

    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contact Details - {self.form_session.session_id}"