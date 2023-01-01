from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass


class Story(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    subtitle = models.TextField()

    def __str__(self):
        return f"story {self.id} titled: {self.title}, created by {self.created_by}"

    def serialize(self):
        return {
            "id": self.id,
            "created_by": self.created_by.username,
            "title": self.title,
            "subtitle": self.subtitle,
        }


class Chapter(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    chapter_number = models.IntegerField()
    description = models.TextField()
    image = models.URLField(default=None, null=True, blank=True)
    caption = models.TextField()

    def __str__(self):
        return f"Chapter {self.chapter_number} for story {self.story_id}, created by {self.created_by}"

    def serialize(self):
        return {
            "id": self.id,
            "created_by": self.created_by.username,
            "story": self.story.id,
            "chapter_number": self.chapter_number,
            "description": self.description,
            "image": self.image,
            "caption": self.caption,
        }
