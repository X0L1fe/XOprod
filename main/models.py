from django.db import models

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('BACKEND', 'Backend'),
        ('FRONTEND', 'Frontend'),
        ('DB', 'Базы данных'),
        ('TOOLS', 'Инструменты'),
        ('OTHER', 'Другое'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Название")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Категория")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок сортировки")

    devicon_class = models.CharField(
        max_length=50,
        blank=True,
        verbose_name="Класс Devicon",
        help_text="Например: devicon-flask-original"
    )
    
    # Для Font Awesome
    fontawesome_class = models.CharField(
        max_length=50,
        blank=True,
        verbose_name="Класс Font Awesome",
        help_text="Например: fab fa-python"
    )
    
    # Для кастомных SVG
    custom_icon = models.FileField(
        upload_to='./static/icons/',
        blank=True,
        null=True,
        verbose_name="Кастомная иконка (SVG)"
    )
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Навык"
        verbose_name_plural = "Навыки"
    
    def __str__(self):
        return self.name