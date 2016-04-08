from rest_framework import permissions


class IsTodoListOwner(permissions.BasePermission):
    """Permission to only edit the owner list"""

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsTodoOwner(permissions.BasePermission):
    """Editing permissions to only the owner of todo"""

    def has_object_permission(self, request, view, obj):
        return obj.todo_list.owner == request.user
