from django.db import models

# Create your models here.
class ComponentList (models.Model):
    name = models.CharField(max_length=30)
    components = models.CharField(max_length=100)