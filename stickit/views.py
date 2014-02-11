from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
import json, bs4 as BeautifulSoup, bleach
from core.models import PostGenerique
from django.utils.html import escape
import iso8601, re
from urllib.parse import urljoin

# Create your views here.


class GroupeStickerView(View):

    @staticmethod
    def javeliseHTML(self, contenuHTML):
        attrs = {
             '*': ['style'],
             'img' : ['src'],
        }
        tags = ['p', 'em', 'strong', 'div', 'img', 'span']
        styles = ['color', 'font-weight']
        cleaned_text = bleach.clean(contenu, tags, attrs, styles, strip=True)
        return cleaned_text

    @staticmethod
    def saveSticker(self, stickers, date):
        #print(sticker.get('id_client'))
        for sticker in stickers:
            contenu, id_sticker = sticker.get('contenu'), sticker.get('id_sticker')
            style = sticker.get('style')
            left, top, width, height = sticker.get('left'), sticker.get('top'), sticker.get('width'), sticker.get('height')

            print('id_sticker : ', id_sticker)


            if (id_sticker[:2] != "__" and id_sticker.isdigit()):
                #print("id_serveur mais pas id_client")
                post = PostGenerique(contenu = contenu, style = style, \
                                     left = left, top = top, width = width, height = height,\
                                     id = id_sticker, date = date)
                post.save()
            else:
                #print("id_client mais pas id_serveur")
                post = PostGenerique(contenu = contenu, style = style, \
                                     left = left, top = top, width = width, height = height,\
                                     date = date)
                post.save()
                id_serveur = post.id
                yield id_sticker, id_serveur


    def post(self, request, date):
        data  = json.loads(request.body.decode('utf-8'))
        posts = data.get('donnees')
        association_ids_client_serveur = self.saveSticker(self,posts, date)

        ids_associes = [(element[0], str(element[1])) for element in association_ids_client_serveur]
        reponse = {}
        reponse['associations'] = dict(ids_associes)

        return HttpResponse(json.dumps(reponse))



    def get(self, request, date):
        stickers = PostGenerique.objects.filter(date = date)
        return render(request, "stickit/generation_stickers.html", {'id_date' : date, 'stickers' : stickers})




class StickerView(View):

    def delete(self, request, id_sticker):
        PostGenerique.objects.get(pk = id_sticker).delete()
        reponse = {}
        reponse['msg'] = "SUPPRESSION DU STICKER " + id_sticker + "\n"
        return HttpResponse(json.dumps(reponse))