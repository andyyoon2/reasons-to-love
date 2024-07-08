from django.contrib import admin
from .models import Partnership, PartnershipUser, Reason

# Register your models here.
admin.site.register(Partnership)
admin.site.register(PartnershipUser)

class ReasonAdmin(admin.ModelAdmin):
    list_display = ('date', 'author', 'message')

admin.site.register(Reason, ReasonAdmin)
