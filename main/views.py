from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET

from .models import Project, Skill


def index(request):
    """Единая точка входа React-портфолио."""
    return render(request, "index.html")


@require_GET
def skills_api(request):
    results = []
    for skill in Skill.objects.all():
        results.append({
            "id": skill.pk,
            "name": skill.name,
            "category": skill.category,
            "category_label": skill.get_category_display(),
            "icon_class": skill.devicon_class,
            "custom_icon_url": skill.custom_icon.url if skill.custom_icon else "",
            "order": skill.order,
        })
    return JsonResponse({"results": results})


@require_GET
def projects_api(request):
    projects = Project.objects.all()
    if request.GET.get("featured") == "1":
        projects = projects.filter(featured=True)
    results = [{
        "id": project.pk,
        "title": project.title,
        "slug": project.slug,
        "short_description": project.short_description,
        "description": project.description,
        "stack": project.stack,
        "status": project.status,
        "status_label": project.get_status_display(),
        "repository_url": project.repository_url,
        "featured": project.featured,
        "order": project.order,
    } for project in projects]
    return JsonResponse({"results": results})


# Старые адреса сохраняем, но ведём на соответствующие секции одностраничного сайта.
def about(request):
    return render(request, "index.html")


def contact(request):
    return render(request, "index.html")


def projects(request, product_id=None):
    return render(request, "index.html")


def first_game(request):
    return render(request, "index.html")


def page_not_found(request, exception=None):
    return render(request, "index.html", status=404)


custom_404_handler = page_not_found
handler400 = page_not_found
handler403 = page_not_found
handler404 = page_not_found
handler500 = page_not_found
