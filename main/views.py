from django.shortcuts import render

def index(request):
    """
    Отображает главную страницу сайта.
    """
    return render(request, 'index.html')

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