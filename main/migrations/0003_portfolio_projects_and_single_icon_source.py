from django.db import migrations, models


def migrate_skills_and_seed_projects(apps, schema_editor):
    Skill = apps.get_model("main", "Skill")
    Project = apps.get_model("main", "Project")

    # Normalize existing records to one icon catalogue: Devicon.
    icon_map = {
        "Python": "devicon-python-plain colored",
        "HTML": "devicon-html5-plain colored",
        "CSS": "devicon-css3-plain colored",
        "Sqlite3": "devicon-sqlite-plain colored",
        "SQLite": "devicon-sqlite-plain colored",
        "PostgreSQL": "devicon-postgresql-plain colored",
        "JavaScript": "devicon-javascript-plain colored",
        "Django": "devicon-django-plain colored",
        "Flask": "devicon-flask-original colored",
        "FastApi": "devicon-fastapi-plain colored",
        "FastAPI": "devicon-fastapi-plain colored",
        "Redis": "devicon-redis-plain colored",
        "GitHub": "devicon-github-original",
        "Docker": "devicon-docker-plain colored",
        "C++": "devicon-cplusplus-plain colored",
        "Node.js": "devicon-nodejs-plain colored",
        "MySQL": "devicon-mysql-plain colored",
        "React": "devicon-react-original colored",
        "Flutter": "devicon-flutter-plain colored",
        "CMake": "devicon-cmake-plain colored",
    }
    for skill in Skill.objects.all():
        mapped = icon_map.get(skill.name)
        if mapped:
            skill.devicon_class = mapped
            skill.save(update_fields=["devicon_class"])
        elif not skill.devicon_class:
            skill.devicon_class = ""
            skill.save(update_fields=["devicon_class"])

    # Normalize legacy labels, then add resume-relevant technologies that were
    # not present in the old skill list. Existing rows are updated, not discarded.
    aliases = {"Sqlite3": "SQLite", "FastApi": "FastAPI"}
    for old_name, new_name in aliases.items():
        Skill.objects.filter(name=old_name).update(name=new_name)

    skill_seed = [
        ("Django REST Framework", "BACKEND", ""),
        ("C++", "BACKEND", "devicon-cplusplus-plain colored"),
        ("MySQL", "DB", "devicon-mysql-plain colored"),
        ("Git", "TOOLS", "devicon-git-plain colored"),
        ("CMake", "TOOLS", "devicon-cmake-plain colored"),
        ("Three.js", "FRONTEND", "devicon-threejs-original"),
        ("Node.js", "BACKEND", "devicon-nodejs-plain colored"),
        ("Flutter", "FRONTEND", "devicon-flutter-plain colored"),
        ("Pillow", "OTHER", ""),
        ("ffmpeg", "OTHER", ""),
        ("Docker Compose", "TOOLS", "devicon-docker-plain colored"),
        ("SQL", "DB", ""),
        ("HTTP / REST API", "OTHER", ""),
        ("PEP 8", "OTHER", ""),
    ]
    for order, (name, category, icon_class) in enumerate(skill_seed, start=20):
        Skill.objects.get_or_create(
            name=name,
            defaults={"category": category, "order": order, "devicon_class": icon_class},
        )

    projects = [
        {
            "title": "XO_OS",
            "slug": "xo-os",
            "short_description": "Система управления задачами и фокусом с интеграциями календаря и локальной AI-моделью.",
            "description": "Приложение для планирования дел и личной продуктивности с интеграциями расписания МАИ, Google Calendar, Telegram и Obsidian. Для проверки выполнения задач используется локальная мультимодальная модель. Backend и интеграции реализованы самостоятельно; UI-прототип собран с использованием AI-инструментов. Проект находится в разработке.",
            "stack": ["Python", "FastAPI", "llama.cpp", "Qwen2.5-VL-7B-Instruct", "aiogram", "PostgreSQL", "Alembic", "Google APIs"],
            "status": "in_progress",
            "repository_url": "https://github.com/X0L1fe/XO_OS",
            "featured": True,
            "order": 1,
        },
        {
            "title": "ConstCrane",
            "slug": "constcrane",
            "short_description": "Сайт застройщика с интерактивной 3D-моделью и интеграцией 1С:УНФ.",
            "description": "Дипломный проект: сайт застройщика с интерактивной 3D-моделью объекта. Пользователь может выбрать квартиру, зарегистрироваться и отправить заявку; менеджер обрабатывает её в 1С:УНФ, а результат доступен в личном кабинете. Реализована синхронизация данных через API и Django signals. Коммерческое внедрение не заявляется.",
            "stack": ["Python", "Django", "Django REST Framework", "JavaScript", "Three.js", "1С:УНФ", "Redis", "SQLite"],
            "status": "completed",
            "repository_url": "https://github.com/X0L1fe/myDiplomWeb",
            "featured": True,
            "order": 2,
        },
        {
            "title": "AllSound",
            "slug": "allsound",
            "short_description": "Анализ аудио: C++ AudioEngine, Python-обвязка и музыкальные метаданные.",
            "description": "Приложение для анализа музыкальных файлов и работы с музыкальными метаданными. Аудиопризнаки вычисляются в C++-модуле, вызываемом из Python через ctypes; отдельно развивается AI-бэкенд и датасет для классификации. Качество жанровой классификации и датасет находятся в доработке.",
            "stack": ["C++", "Python", "CMake", "ctypes", "nlohmann/json", "Flutter", "MusicBrainz", "Last.fm"],
            "status": "in_progress",
            "repository_url": "https://github.com/X0L1fe/AllSound",
            "featured": True,
            "order": 3,
        },
        {
            "title": "Автоматизация мониторинга станков",
            "slug": "sura-mebel-monitoring",
            "short_description": "Сбор состояния 40 станков и визуализация производственных простоев.",
            "description": "Парсер сайта мебельного предприятия собирает и структурирует данные о состоянии 40 станков. Информация используется для отображения производственных состояний на диаграмме Ганта. Telegram-бот позволяет указывать причины простоя, влияющие на отображение состояния станка.",
            "stack": ["Node.js", "Puppeteer", "node-cron", "SQLite3", "Telegram Bot API"],
            "status": "freelance",
            "repository_url": "https://github.com/X0L1fe/suraMebel",
            "featured": False,
            "order": 4,
        },
        {
            "title": "PhotoPainter",
            "slug": "photopainter",
            "short_description": "Учебное веб-приложение для базового редактирования изображений.",
            "description": "Веб-приложение для загрузки изображений и базового редактирования, включая изменение яркости и контраста. Учебный проект, не позиционируется как production-приложение.",
            "stack": ["Python", "Flask", "Pillow"],
            "status": "educational",
            "repository_url": "https://github.com/X0L1fe/PhotoPainter",
            "featured": False,
            "order": 5,
        },
    ]
    for item in projects:
        Project.objects.update_or_create(slug=item["slug"], defaults=item)


def reverse_seed(apps, schema_editor):
    Project = apps.get_model("main", "Project")
    Project.objects.filter(slug__in=[
        "xo-os", "constcrane", "allsound", "sura-mebel-monitoring", "photopainter"
    ]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0002_skill_custom_icon_skill_devicon_class_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=120, verbose_name="Название")),
                ("slug", models.SlugField(max_length=140, unique=True, verbose_name="URL-идентификатор")),
                ("short_description", models.CharField(max_length=280, verbose_name="Краткое описание")),
                ("description", models.TextField(verbose_name="Описание")),
                ("stack", models.JSONField(blank=True, default=list, verbose_name="Технологии")),
                ("status", models.CharField(choices=[("in_progress", "В разработке"), ("completed", "Завершён"), ("educational", "Учебный проект"), ("freelance", "Проект по договору")], default="in_progress", max_length=20, verbose_name="Статус")),
                ("repository_url", models.URLField(blank=True, verbose_name="Репозиторий")),
                ("featured", models.BooleanField(default=False, verbose_name="Избранный проект")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок сортировки")),
            ],
            options={"verbose_name": "Проект", "verbose_name_plural": "Проекты", "ordering": ["-featured", "order", "title"]},
        ),
        migrations.AlterField(
            model_name="skill",
            name="devicon_class",
            field=models.CharField(blank=True, help_text="Класс из каталога Devicon, например devicon-python-plain colored. Если логотипа нет, оставь пустым.", max_length=80, verbose_name="Иконка Devicon"),
        ),
        migrations.AlterField(
            model_name="skill",
            name="custom_icon",
            field=models.FileField(blank=True, null=True, upload_to="skills/icons/", verbose_name="Своя SVG-иконка (необязательно)"),
        ),
        migrations.RunPython(migrate_skills_and_seed_projects, reverse_seed),
        migrations.RemoveField(model_name="skill", name="fontawesome_class"),
        migrations.RemoveField(model_name="skill", name="icon"),
    ]
