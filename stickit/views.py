from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
import json
from core.models import PostGenerique
from django.utils.html import escape
import iso8601

# Create your views here.


#def sauveGroupeStickers(request, date):
#    if request.method == 'POST':
#        return HttpResponse(request.body)
#    return HttpResponse("on va voir si ca passe ! "  + request.method)
    

class GroupeStickerView(View):

    @staticmethod
    def saveSticker(stickers, date):
        #print(sticker.get('id_client'))
        for sticker in stickers:

            contenu = sticker.get('contenu')
            id_sticker =  sticker.get('id_sticker')
            style = sticker.get('style')
            left = sticker.get('left')
            top = sticker.get('top')
            width = sticker.get('width')
            height = sticker.get('height')

            print('id_sticker : ', id_sticker)
            #print(escape(contenu))

            if (id_sticker[:2] != "__" and id_sticker.isdigit()):
                print("id_serveur mais pas id_client")
                #print(PostGenerique.objects.get(id = id_serveur))
                post = PostGenerique(contenu = contenu, style = style, \
                                     left = left, top = top, width = width, height = height,\
                                     id = id_sticker, date = date)
                post.save()
                #print(PostGenerique.objects.get(id = id_serveur))
            else:
                print("id_client mais pas id_serveur")
                post = PostGenerique(contenu = contenu, style = style, \
                                     left = left, top = top, width = width, height = height,\
                                     date = date)
                post.save()
                id_serveur = post.id
                #print(id_sticker)
                yield id_sticker, id_serveur


    def post(self, request, date):

        print("SAUVEGARDE")
        data  = json.loads(request.body.decode('utf-8'))

        posts = data.get('donnees')
        #style = data.get('donnees').get('style')
        generateur = self.saveSticker(posts, date)
        #self.saveSticker(posts, date)
        print(date)
        print(data)

        ids_associes = []
        reponse = {}
        #reponse['msg'] = "Sauvegarde des stickers " + "\n"

        ids_associes = [(element[0], str(element[1])) for element in generateur]
        #for element in generateur:
            #id_client, id_serveur = element[0], str(element[1])
            #if id_client:
            #ids_associes.append(element)
            #reponse['msg'] += "creation id_client : " + id_client + " - id_serveur : " + id_serveur + '\n'
            #else:
            #    reponse['msg'] += " uniquement id_serveur : " + id_serveur + '\n'
            #print(element)
        #print({'msg' : "message retour", 'association' : dict(ids_associes)})
        print(ids_associes)
        reponse['associations'] = dict(ids_associes)
        #[print(self.saveSticker(sticker)) for sticker in stickers]
        #post.save()

        return HttpResponse(json.dumps(reponse))

    def get(self, request, date):
        print(date)
        stickers = PostGenerique.objects.filter(date = date)
        print(len(stickers))
        return render(request, "stickit/generation_stickers.html", {'id_date' : date, 'stickers' : stickers})




class StickerView(View):

    def delete(self, request, id_sticker):
        #print("SUPPRESSION DU POST  : ", id_sticker)
        PostGenerique.objects.get(pk = id_sticker).delete()
        #print(postasupprimer)
        reponse = {}
        reponse['msg'] = "SUPPRESSION DU STICKER " + id_sticker + "\n"
        return HttpResponse(json.dumps(reponse))