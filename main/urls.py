from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="home"),
    path("api/skills/", views.skills_api, name="skills_api"),
    path("api/projects/", views.projects_api, name="projects_api"),
    path("about/", views.about, name="about"),
    path("contacts/", views.contact, name="contacts"),
    path("projects/", views.projects, name="projects"),
    path("first-game/", views.first_game, name="first_game"),
]
