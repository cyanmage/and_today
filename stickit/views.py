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

    @staticmethod
    def saveSticker(stickers):
        #print(sticker.get('id_client'))
        for sticker in stickers:


            contenu = sticker.get('contenu')
            id_client =  sticker.get('id_client')
            id_serveur =  sticker.get('id_serveur')
            style = sticker.get('style')

            #print('id_client : ', id_client, 'id_serveur : ', id_serveur)
            post = None
            if (id_serveur != None and id_client == None):
                print("id_serveur mais pas id_client")
                post = PostGenerique(contenu = contenu, style = style, pk = id_serveur)
            elif (id_serveur == None and id_client != None):
                print("id_client mais pas id_serveur")
                post = PostGenerique(contenu = contenu, style = style)
            yield post

    def post(self, request, date):
        data  = json.loads(request.body.decode('utf-8'))
        date = data.get('id')
        posts = data.get('donnees')
        #style = data.get('donnees').get('style')
        generateur = self.saveSticker(posts)

        for element in generateur:
            if (element):
                element.save()
            print(element)

        #[print(self.saveSticker(sticker)) for sticker in stickers]
        #post.save()
        return HttpResponse(json.dumps(posts))