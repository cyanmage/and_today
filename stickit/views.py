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
    def sanitizeHtml(value, base_url=None):
        rjs = r'[\s]*(&#x.{1,7})?'.join(list('javascript:'))
        rvb = r'[\s]*(&#x.{1,7})?'.join(list('vbscript:'))
        re_scripts = re.compile('(%s)|(%s)' % (rjs, rvb), re.IGNORECASE)
        validTags = 'p i strong b u a h1 h2 h3 pre br img'.split()
        validAttrs = 'href src width height'.split()
        urlAttrs = 'href src'.split() # Attributes which should have a URL
        soup = BeautifulSoup.BeautifulSoup(value)
        for comment in soup.findAll(text=lambda text: isinstance(text, BeautifulSoup.Comment)):
            # Get rid of comments
            comment.extract()
        for tag in soup.findAll(True):
            if tag.name not in validTags:
                tag.hidden = True
            attrs = tag.attrs
            tag.attrs = []
            #print(attrs)
            for attr, val in attrs.items():
               if attr in validAttrs:
                    val = re_scripts.sub('', val) # Remove scripts (vbs & js)
                    if attr in urlAttrs:
                        val = urljoin(base_url, val) # Calculate the absolute url
                    tag.attrs.append((attr, val))
            print(tag)
        #return soup.renderContents().decode('utf8')

    @staticmethod
    def saveSticker(self, stickers, date):
        #print(sticker.get('id_client'))
        for sticker in stickers:

            contenu = sticker.get('contenu')

            attrs = {
                '*': ['style'],
                'img' : ['src'],
            }
            tags = ['p', 'em', 'strong', 'div', 'img', 'span']
            styles = ['color', 'font-weight']



            print(contenu)
            print(bleach.clean(contenu))
            cleaned_text = bleach.clean(contenu, tags, attrs, styles, strip=True)
            print(cleaned_text)

            #self.sanitizeHtml(contenu)
            #soup = BeautifulSoup.BeautifulSoup(contenu)
            #page = soup.find('div')
            #print(soup)
            #print(soup.find('div'))
            #print(soup.find('img'))


            id_sticker =  sticker.get('id_sticker')
            style = sticker.get('style')
            left = sticker.get('left')
            top = sticker.get('top')
            width = sticker.get('width')
            height = sticker.get('height')

            print('id_sticker : ', id_sticker)


            if (id_sticker[:2] != "__" and id_sticker.isdigit()):
                print("id_serveur mais pas id_client")
                post = PostGenerique(contenu = contenu, style = style, \
                                     left = left, top = top, width = width, height = height,\
                                     id = id_sticker, date = date)
                post.save()
            else:
                print("id_client mais pas id_serveur")
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