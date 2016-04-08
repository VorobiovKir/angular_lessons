from django.contrib import admin
from models import TodoList, Todo


@admin.register(TodoList)
class TodoListAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner')
    search_fields = ('name',)


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('todo_list', 'task', 'completed')
