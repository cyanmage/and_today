from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
import json
from core.models import PostGenerique
import iso8601

# Create your views here.


#def sauveGroupeStickers(request, date):
#    if request.method == 'POST':
#        return HttpResponse(request.body)
#    return HttpResponse("on va voir si ca passe ! "  + request.method)
    

class GroupeStickerView(View):

    def post(self, request, date):
        data  = json.loads(request.body.decode('utf-8'))
        date = data.get('id')
        stickers = data.get('donnees')
        #style = data.get('donnees').get('style')
        post = PostGenerique(contenu = 'test de contenu')
        post.save()
        return HttpResponse(len(stickers))