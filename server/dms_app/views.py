from .models import ComponentList
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login(request):
    decoded_body = request.body.decode("utf-8")
    obj = json.loads(decoded_body)
    name = obj["name"]

    getList = ComponentList.objects.filter(name=name)

    if (not getList):
        newPerson = ComponentList(name=name,components="1,2,3,4,5,")
        newPerson.save()
        
    return JsonResponse({"message": "Logged in"})

@csrf_exempt
def list(request):
    decoded_body = request.body.decode("utf-8")
    obj = json.loads(decoded_body)
    name = obj["name"]

    getList = ComponentList.objects.get(name=name)
    if (getList):
        return JsonResponse({"components": getList.components})
    else:
        return JsonResponse({"pref_comp": "1,2,3,4,5"})
     
@csrf_exempt
def preference(request):
    decoded_body = request.body.decode("utf-8")
    obj = json.loads(decoded_body)
    name = obj["name"]
    preference = obj["pref"]
    print(obj)
    ComponentList.objects.filter(name=name).update(components=preference)

    return JsonResponse({"message": "success"})
