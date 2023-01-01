from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    # API routes
    path("newstory", views.newstory, name="newstory"),
    path("newchapter", views.newchapter, name="newchapter"),
]
