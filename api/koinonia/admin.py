from django.contrib import admin
from . import models


admin.site.register(models.Network)
admin.site.register(models.Church)
admin.site.register(models.Member)
admin.site.register(models.Resource)
