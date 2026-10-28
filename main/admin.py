from django.contrib import admin
from .models import Project, Skill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "order", "devicon_class", "has_custom_icon")
    list_filter = ("category",)
    search_fields = ("name", "devicon_class")
    list_editable = ("order",)
    ordering = ("order", "name")
    fieldsets = (
        (None, {"fields": ("name", "category", "order")}),
        ("Иконка", {"fields": ("devicon_class", "custom_icon")}),
    )

    @admin.display(boolean=True, description="Своя иконка")
    def has_custom_icon(self, obj):
        return bool(obj.custom_icon)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "featured", "order")
    list_filter = ("status", "featured")
    search_fields = ("title", "short_description", "description")
    list_editable = ("featured", "order")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-featured", "order", "title")
    fieldsets = (
        (None, {"fields": ("title", "slug", "short_description", "description")}),
        ("Публикация", {"fields": ("status", "featured", "order", "repository_url")}),
        ("Технологии", {"fields": ("stack",)}),
    )
