# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import loader, RequestContext
from core.models import Journee_parametrages, Heure_parametrages, Matiere, Salle,\
     Classe, EmploiDuTemps
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.core import serializers


@ensure_csrf_cookie
def emploidutemps(request):
    #t =  loader.get_template('core/index.html')
    journee_set = Journee_parametrages.objects.all()
    heure_set = Heure_parametrages.objects.all()
    matiere_set = Matiere.objects.all()
    salle_set = Salle.objects.all()
    classe_set = Classe.objects.all()
    nombre_de_journees = Journee_parametrages.objects.count()
    
    for heure in heure_set:
        print(heure_set)
    context = RequestContext(request, {
        'journees':journee_set,
        'nbJours':nombre_de_journees,
        'heures':heure_set,
        'matieres':matiere_set,
        'salles':salle_set,
        'classes':classe_set
        })
    #return HttpResponse(t.render(context))
    return render_to_response('core/index.html', context_instance=context)

def csrf_failure(request, reason=""):
    print ("CSRF failure: reason=%s, url=%s",reason, request.path)

def classe(request):
    classe_set = Classe.objects.all()
    #for classe in classe_set:
    #    print(classe.id)
    classes = [classe.id for classe in classe_set]
    #print(*classes)
    return HttpResponse(classes)

def initialisation_des_donnees(request):
    classe_set = Classe.objects.all()
    donnees_initialisees_en_JSON = json.dumps([classe.get_json() for classe in classe_set])
    #print(donnees_initialisees_en_JSON)
    return HttpResponse(donnees_initialisees_en_JSON)



    
