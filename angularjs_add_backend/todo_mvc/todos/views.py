from django.views.generic import TemplateView


class BaseTodoList(TemplateView):
    template_name = 'base.html'


class TodoListViev(TemplateView):
    template_name = 'todo_list.html'
