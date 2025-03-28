# main/templatetags/skill_tags.py
from django import template
from django.utils.html import format_html

register = template.Library()

@register.simple_tag
def render_skill_icon(skill):
    icon_html = ""
    if skill.devicon_class:
        icon_html = f'<i class="{skill.devicon_class}"></i>'
    elif skill.fontawesome_class:
        icon_html = f'<i class="{skill.fontawesome_class}"></i>'
    elif skill.custom_icon:
        icon_html = f'<img src="{skill.custom_icon.url}" alt="{skill.name}" class="skill-icon">'
    return format_html(icon_html) if icon_html else format_html('<span>{}</span>', skill.name)