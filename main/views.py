from django.shortcuts import render
from .models import Skill

def index(request):
    """
    Отображает главную страницу сайта.
    """
    skills = Skill.objects.all().order_by('order')
    categories = dict(Skill.CATEGORY_CHOICES)
    return render(request, 'index.html', {
        'skills': skills,
        'categories': categories
        })

def about(request):
    """
    Отображает страницу "О нас".
    """
    return render(request, 'about.html')

def contact(request):
    """
    Отображает страницу "Контакты".
    """
    return render(request, 'contacts.html')

def projects(request, product_id):
    """
    Отображает страницу со всеми проектами.
    """
    pass