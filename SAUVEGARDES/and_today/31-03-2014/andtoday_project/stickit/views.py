from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
import json, bs4 as BeautifulSoup, bleach
from core.models import StickerGenerique, Cadre
from django.utils.html import escape
import iso8601, re
from urllib.parse import urljoin
from django.conf import settings





class GroupeElementView(View):

    @staticmethod
    def javeliseHTML(self, contenu):
        attrs = {
             '*': ['style'],
             'img' : ['src'],
        }
        tags = ['p', 'em', 'strong', 'div', 'img', 'span']
        styles = ['color', 'font-weight']
        cleaned_text = bleach.clean(contenu, tags, attrs, styles, strip=True)
        #return cleaned_text
        return contenu

    @staticmethod
    def saveSticker(self, stickers, date):
        #print(sticker.get('id_client'))
        for sticker in stickers:
            print(sticker.get('contenu'))
            contenu, id_sticker = self.javeliseHTML(self, sticker.get('contenu')), sticker.get('id_sticker')
            style = sticker.get('style')
            left, top, width, height = sticker.get('left'), sticker.get('top'), sticker.get('width'), sticker.get('height')
            print(contenu)
            #print('id_sticker : ', id_sticker)


            if (id_sticker.isdigit()):
                #print("id_serveur mais pas id_client")
                post = StickerGenerique(contenu = contenu, style = style, \
                                     left = left, top = top, width = width, height = height,\
                                     id = id_sticker, date = date)
                post.save()
            elif (id_sticker[:4] == "_st_" ):
                #print("id_client mais pas id_serveur")
                post = StickerGenerique(contenu = contenu, style = style, \
                                     left = left, top = top, width = width, height = height,\
                                     date = date)
                post.save()
                id_serveur = post.id
                yield id_sticker, id_serveur

    @staticmethod
    def saveCadre(self, cadres, date):
        print("on va sauver les cadres ! ", len(cadres), cadres)
        for cadre in cadres:
            image_de_fond = cadre.get('filename').replace(settings.MEDIA_URL, '')
            id_cadre = cadre.get('id_cadre')
            opacity = cadre.get('opacity')
            left, top, width, height = cadre.get('left'), cadre.get('top'), cadre.get('width'), cadre.get('height')
            print(image_de_fond, id_cadre, opacity, left, top, width, height)
            if (id_cadre.isdigit()):
                print("id_serveur mais pas id_client")
                print(image_de_fond)
                cadre = Cadre(image_de_fond = image_de_fond, opacite = opacity, \
                                     left = left, top = top, width = width, height = height,\
                                     id = id_cadre, date = date)
                cadre.save()
            elif (id_cadre[:4] == "_cd_" ):
                print("id_client mais pas id_serveur")
                cadre = Cadre(image_de_fond = image_de_fond, opacite = opacity, \
                                     left = left, top = top, width = width, height = height,\
                                      date = date)
                cadre.save()
                id_serveur = cadre.id
                yield id_cadre, id_serveur


    def post(self, request, date):
        data  = json.loads(request.body.decode('utf-8'))
        stickers = data.get('donneesStickers')
        cadres = data.get('donneesCadres')
        association_idsStickers_client_serveur = self.saveSticker(self, stickers, date)
        association_idsCadres_client_serveur = self.saveCadre(self, cadres, date)

        idsStickers_associes = [(element[0], str(element[1])) for element in association_idsStickers_client_serveur]
        idsCadres_associes = [(element[0], str(element[1])) for element in association_idsCadres_client_serveur]
        reponse = {}
        reponse['associationsStickers'] = dict(idsStickers_associes)
        reponse['associationsCadres'] = dict(idsCadres_associes)

        return HttpResponse(json.dumps(reponse))



    def get(self, request, date):
        print("CHARGEMENT")
        stickers = StickerGenerique.objects.filter(date = date)
        cadres = Cadre.objects.filter(date = date)
        return render(request, "stickit/generation_page.html", {'id_date' : date, 'stickers' : stickers, 'cadres' : cadres})



class StickerView(View):

    def delete(self, request, id_sticker):
        StickerGenerique.objects.get(pk = id_sticker).delete()
        reponse = {}
        reponse['msg'] = "SUPPRESSION DU STICKER " + id_sticker + "\n"
        return HttpResponse(json.dumps(reponse))


class CadreView(View):

    def delete(self, request, id_cadre):
        Cadre.objects.get(pk = id_cadre).delete()
        reponse = {}
        reponse['msg'] = "SUPPRESSION DU CADRE " + id_cadre + "\n"
        return HttpResponse(json.dumps(reponse))