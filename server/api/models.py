from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Skill(models.Model):
  name = models.CharField(max_length=100)
  users = models.ManyToManyField(User)

class Theme(models.Model):
  name = models.CharField(max_length=100)

class Idea(models.Model):
  idea = models.TextField()
  skills = models.ManyToManyField(Skill)
  themes = models.ManyToManyField(Theme)
