from django.contrib import admin
from .models import User, Story, Chapter

# Register your models here.
admin.site.register(User)
admin.site.register(Story)
admin.site.register(Chapter)
