from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    is_complete = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.TimeField(auto_now_add=True)
    updated_at = models.TimeField(auto_now=True)

    def __str__(self):
        return self.title