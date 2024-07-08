from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import RegexValidator
from django.utils import timezone

# Create your models here.
AuthUser = get_user_model()
class Partnership(models.Model):
    """A pairing of 2 partners"""
    name = models.CharField(max_length=100, null=True, blank=True)
    users = models.ManyToManyField(AuthUser, through="PartnershipUser")

    def __str__(self):
        return self.name

# Through table
class PartnershipUser(models.Model):
    partnership = models.ForeignKey(Partnership, on_delete=models.CASCADE)
    user = models.ForeignKey(AuthUser, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(default=timezone.now)
    nickname = models.CharField(max_length=100, null=True)

class Reason(models.Model):
    """A message sent from one partner to another"""
    date = models.DateTimeField(default=timezone.now)
    partnership = models.ForeignKey(Partnership, on_delete=models.CASCADE)
    author = models.ForeignKey(
        AuthUser,
        on_delete=models.SET_NULL,
        null=True,
        related_name="authored_reason_set"
    )
    message = models.TextField()
    favorited_by = models.ManyToManyField(AuthUser, related_name="favorited_reason_set", blank=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.date} by {self.author}"
