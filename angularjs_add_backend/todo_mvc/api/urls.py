from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from views import TodoListViewSet, TodoViewSet

router = DefaultRouter()
router.register(r'list', TodoListViewSet, base_name='list')
router.register(r'list/(?P<todo_pk>\d+)/tasks', TodoViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework'))
]