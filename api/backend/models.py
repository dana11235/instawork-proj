from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(models.Model):
    first_name = models.CharField(blank=False, max_length=50)
    last_name = models.CharField(blank=False, max_length=50)
    email = models.EmailField(blank=False)
    phone_number = PhoneNumberField(
        null=False, blank=False, unique=True, region="US")

    class Role(models.IntegerChoices):
        REGULAR = 1, "Regular"
        ADMIN = 2, "Admin"
    role = models.IntegerField(
        choices=Role.choices, default=Role.REGULAR)
