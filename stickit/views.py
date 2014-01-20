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
            left = sticker.get('left')
            top = sticker.get('top')
            width = sticker.get('width')
            height = sticker.get('height')

            print('id_client : ', id_client, 'id_serveur : ', id_serveur)

            if (id_serveur and not(id_client)):
                print("id_serveur mais pas id_client")
                #print(PostGenerique.objects.get(id = id_serveur))
                post = PostGenerique(contenu = contenu, style = style, left = left, top = top, width = width, height = height,  id = id_serveur)
                post.save()
                #print(PostGenerique.objects.get(id = id_serveur))
            elif (not(id_serveur) and id_client):
                print("id_client mais pas id_serveur")
                post = PostGenerique(contenu = contenu, style = style, left = left, top = top, width = width, height = height)
                post.save()
                id_serveur = post.id
                #print(id_serveur)

            yield id_client, id_serveur

    def post(self, request, date):

        data  = json.loads(request.body.decode('utf-8'))
        date = data.get('id_groupe')
        posts = data.get('donnees')
        #style = data.get('donnees').get('style')
        generateur = self.saveSticker(posts)

        print(data)

        ids_associes = []
        reponse = {}
        reponse['msg'] = "Sauvegarde des stickers " + "\n"
        for element in generateur:
            id_client, id_serveur = element[0], str(element[1])
            if id_client:
                ids_associes.append(element)
                reponse['msg'] += "creation id_client : " + id_client + " - id_serveur : " + id_serveur + '\n'
            else:
                reponse['msg'] += " uniquement id_serveur : " + id_serveur + '\n'
            #print(element)
        #print({'msg' : "message retour", 'association' : dict(ids_associes)})

        reponse['associations'] = dict(ids_associes)
        #[print(self.saveSticker(sticker)) for sticker in stickers]
        #post.save()
        return HttpResponse(json.dumps(reponse))

    def get(self, request, date):
        print(date)
        stickers = PostGenerique.objects.filter(date = date)
        print(len(stickers))
        return render(request, "stickit/generation_stickers.html", {'id_date' : date, 'stickers' : stickers})