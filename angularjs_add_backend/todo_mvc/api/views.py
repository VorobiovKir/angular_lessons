from rest_framework import viewsets
from serializers import TodoListSerializer, TodoSerializer

from todos.models import TodoList, Todo


class TodoListViewSet(viewsets.ModelViewSet):
    """ViewSet to view information about the lists"""
    serializer_class = TodoListSerializer

    def get_queryset(self):
        return TodoList.objects.filter() # owner=self.request.user


class TodoViewSet(viewsets.ModelViewSet):
    """ViewSet to view information about the todos"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        queryset = super(TodoViewSet, self).get_queryset()
        return queryset.filter(todo_list__pk=self.kwargs.get('todo_pk'))

    def perform_create(self, serializer):
        list_pk = self.kwargs.get('todo_pk')
        new_list = TodoList.objects.get(pk=list_pk)
        serializer.save(todo_list=new_list)
