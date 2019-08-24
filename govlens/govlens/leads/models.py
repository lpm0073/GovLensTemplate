from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
