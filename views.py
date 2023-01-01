import json
from django.http import JsonResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import User, Story, Chapter

# APIs
@login_required
def newstory(request):
    if request.method == "POST":
        newstory = Story()

        data = json.loads(request.body)

        if data.get("title") is not None:
            newstory.created_by = request.user
            newstory.title = data["title"]
            newstory.subtitle = data["subtitle"]

        newstory.save()
        return JsonResponse(newstory.serialize())
    else:
        return JsonResponse({"error": "POST request required."}, status=400)


@login_required
def newchapter(request):
    if request.method == "POST":
        newchapter = Chapter()

        data = json.loads(request.body)
        newchapter.created_by = request.user
        newchapter.story_id = data["story"]
        newchapter.chapter_number = data["chapter_number"]
        newchapter.description = data["description"]
        newchapter.image = data["image"]
        newchapter.caption = data["caption"]

        newchapter.save()

        if data is not None:
            return JsonResponse(newchapter.serialize())
        else:
            return JsonResponse({"error": "POST request required."}, status=400)
