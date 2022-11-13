from django.db import models

class Todo(models.Model):
    _id = models.CharField(max_length=5000, blank=True)
    todo = models.CharField(max_length=500)

    def __str__(self):
        return self.todo