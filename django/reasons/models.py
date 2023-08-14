from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Partnership(models.Model):
    """A pairing of 2 partners"""
    name = models.CharField(max_length=100, null=True, blank=True)

class User(models.Model):
    """A user of the app, and a partner in a partnership"""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    # https://www.delftstack.com/howto/django/django-phone-number-field/
    phone_regex = RegexValidator(regex=r"^\+?1?\d{8,15}$")
    phone = models.CharField(validators=[phone_regex], max_length=16, unique=True)
    partnership = models.ForeignKey(Partnership, on_delete=models.SET_NULL, null=True, blank=True)

class Reason(models.Model):
    """A message sent from one partner to another"""
    date = models.DateTimeField()
    partnership = models.ForeignKey(Partnership, on_delete=models.CASCADE)
    author = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="authored_reason_set"
    )
    message = models.TextField()
    favorited_by = models.ManyToManyField(User, related_name="favorited_reason_set")
