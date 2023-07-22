from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Skill(models.Model):
  name = models.CharField(max_length=100)
  users = models.ManyToManyField(User, null=True, blank=True)

  def __str__(self):
      return self.name

class Theme(models.Model):
  name = models.CharField(max_length=100)

  def __str__(self):
      return self.name
  

class Idea(models.Model):
  idea = models.TextField()
  skills = models.ManyToManyField(Skill)
  themes = models.ManyToManyField(Theme)

  def __str__(self):
    if len(self.idea) > 30:
      return self.idea[:30] + "..."
    return self.idea