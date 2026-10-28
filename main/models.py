from django.db import models


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("BACKEND", "Backend"),
        ("FRONTEND", "Frontend"),
        ("DB", "Базы данных"),
        ("TOOLS", "Инструменты"),
        ("OTHER", "Другое"),
    ]

    name = models.CharField(max_length=100, verbose_name="Название")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Категория")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок сортировки")
    devicon_class = models.CharField(
        max_length=80,
        blank=True,
        verbose_name="Иконка Devicon",
        help_text="Класс из каталога Devicon, например devicon-python-plain colored. Если логотипа нет, оставь пустым.",
    )
    custom_icon = models.FileField(
        upload_to="skills/icons/",
        blank=True,
        null=True,
        verbose_name="Своя SVG-иконка (необязательно)",
        help_text="Используй только если подходящего логотипа нет в Devicon.",
    )

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Навык"
        verbose_name_plural = "Навыки"

    def __str__(self):
        return self.name


class Project(models.Model):
    STATUS_CHOICES = [
        ("in_progress", "В разработке"),
        ("completed", "Завершён"),
        ("educational", "Учебный проект"),
        ("freelance", "Проект по договору"),
    ]

    title = models.CharField(max_length=120, verbose_name="Название")
    slug = models.SlugField(max_length=140, unique=True, verbose_name="URL-идентификатор")
    short_description = models.CharField(max_length=280, verbose_name="Краткое описание")
    description = models.TextField(verbose_name="Описание")
    stack = models.JSONField(default=list, blank=True, verbose_name="Технологии")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="in_progress", verbose_name="Статус")
    repository_url = models.URLField(blank=True, verbose_name="Репозиторий")
    featured = models.BooleanField(default=False, verbose_name="Избранный проект")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок сортировки")

    class Meta:
        ordering = ["-featured", "order", "title"]
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def __str__(self):
        return self.title
