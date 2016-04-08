from rest_framework import serializers

from todos.models import TodoList, Todo


class TodoListSerializer(serializers.ModelSerializer):
    """Serializer to store data about lists"""
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = TodoList
        fields = ('id', 'name', 'owner', 'number_of_tasks')


class TodoSerializer(serializers.ModelSerializer):
    """Serializer to store information about tasks"""
    class Meta:
        model = Todo
        fields = ('id', 'todo_list', 'task', 'completed')
