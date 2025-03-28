from django.contrib import admin
from .models import Skill

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'order', 'devicon_class', 'fontawesome_class')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('order',)