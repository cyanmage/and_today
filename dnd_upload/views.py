from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.views.generic import View
import hashlib, os, json
from django.conf import settings
# Create your views here.


def md5_for_file(f, block_size=2**20):
    md5 = hashlib.md5()
    while True:
        data = f.read(block_size)
        if not data:
            break
        md5.update(data)
    return md5.hexdigest()

def save_file(file, filename, path=''):
    filename_md5 = md5_for_file(file)
    _, extension = os.path.splitext(filename)
    #print(filename)
    filename_md5 += extension
    path = '%s/%s' % (settings.MEDIA_ROOT, filename_md5)
    if not(os.path.exists(path)):
        fd = open(path, 'wb')
        for chunk in file.chunks():
            fd.write(chunk)
        fd.close()
        #print("path.dirname : " + os.path.dirname(fd))


    return settings.MEDIA_URL + filename_md5


class StockeImage(View):

    def get(self, request):
        return render(request, "dnd_upload/dragndrop.html")

    def post(self, request):
        print("url absolue : " + request.build_absolute_uri())
        reponse_serveur = {}
        for filename, file in request.FILES.items():
            name = request.FILES[filename].name
            new_urlfile = save_file(file, file._get_name())

            print(filename, file)
            reponse_serveur[filename] = new_urlfile
            #print(name)
            #filename_md5 = save_file(file, filename)


        #print(json.dumps(reponse_serveur))
        return HttpResponse(json.dumps(reponse_serveur))
