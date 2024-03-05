from django.urls import path

from . import views

urlpatterns = [
    path('login',views.login, name="login"),
    path('list', views.list, name="display"),
    path('pref', views.preference, name="edit")
]