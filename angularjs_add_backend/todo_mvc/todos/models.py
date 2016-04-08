from __future__ import unicode_literals

from django.db import models
from django.conf import settings


class TodoList(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, null=True)

    def __unicode__(self):
        return self.name

    def number_of_tasks(self):
        return self.todo_set.count()


class Todo(models.Model):
    todo_list = models.ForeignKey(TodoList)
    task = models.TextField(help_text='What needs to be done?')
    completed = models.BooleanField(default=False)

