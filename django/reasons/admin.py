from django.contrib import admin
from .models import Partnership, User, Reason

# Register your models here.
admin.site.register(Partnership)
admin.site.register(User)

class ReasonAdmin(admin.ModelAdmin):
    list_display = ('date', 'author', 'message')

admin.site.register(Reason, ReasonAdmin)
