from django.conf import settings
from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Partnership(models.Model):
    """A pairing of 2 partners"""
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

# Through table
class PartnershipUser(models.Model):
    partnership = models.ForeignKey(Partnership, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Reason(models.Model):
    """A message sent from one partner to another"""
    date = models.DateTimeField()
    partnership = models.ForeignKey(Partnership, on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="authored_reason_set"
    )
    message = models.TextField()
    favorited_by = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="favorited_reason_set", blank=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.date} by {self.author}"
