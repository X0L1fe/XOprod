from django.test import TestCase
from django.urls import reverse

from .models import Project, Skill


class PortfolioApiTests(TestCase):
    def test_home_serves_react_shell(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'id="root"')
        self.assertContains(response, "static/react/app.js")

    def test_skills_api_returns_skill_records(self):
        Skill.objects.create(name="Python", category="BACKEND", order=1, devicon_class="devicon-python-plain colored")
        response = self.client.get(reverse("skills_api"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["results"][0]["name"], "Python")

    def test_projects_api_returns_project_records(self):
        Project.objects.create(
            title="Test project",
            slug="test-project",
            short_description="Test",
            description="Description",
            stack=["Python"],
            featured=True,
            repository_url="https://example.com/repo",
        )
        response = self.client.get(reverse("projects_api"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["results"][0]["title"], "Test project")

    def test_featured_filter(self):
        Project.objects.create(title="Featured", slug="featured", short_description="A", description="A", featured=True)
        Project.objects.create(title="Other", slug="other", short_description="B", description="B", featured=False)
        response = self.client.get(reverse("projects_api"), {"featured": "1"})
        self.assertEqual([item["title"] for item in response.json()["results"]], ["Featured"])
