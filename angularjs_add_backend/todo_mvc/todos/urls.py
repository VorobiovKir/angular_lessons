from django.conf.urls import url
from views import BaseTodoList, TodoListViev


urlpatterns = [
    url(r'^$', BaseTodoList.as_view(), name='home_todo'),
    url(r'^list', TodoListViev.as_view(), name='todo_list')
]
