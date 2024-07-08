from django.contrib import admin
from .models import Partnership, Reason

# Register your models here.
admin.site.register(Partnership)

class ReasonAdmin(admin.ModelAdmin):
    list_display = ('date', 'author', 'message')

admin.site.register(Reason, ReasonAdmin)
