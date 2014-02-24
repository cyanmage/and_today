# Create your views here.
import json
from core.models import Classe, EmploiDuTempsClasse, Salle, Matiere,\
    Journee_parametrages, Heure, Heure_parametrages, Journee
from django.http import HttpResponse, HttpResponseServerError

#from django.views.decorators.csrf import csrf_exempt
from django.contrib.contenttypes.models import ContentType

nbJournees = 7
nbHeures = 8

#@csrf_exempt
def sauvegardeEmploiDuTemps(request):
    if request.method == 'POST':
        try:
            donnees_JSON = json.loads(request.body.decode('utf-8'))
            emploidutemps_donnees_JSON = donnees_JSON.get('emploidutemps')
            classe_id = donnees_JSON.get('classe')
            #classe = Classe.objects.get(id=classe_JSON)
            emploidutemps, created = EmploiDuTempsClasse.objects.get_or_create(classe_id = classe_id, semaine_debutante=0,\
            semaine_terminante = 0, type_emploi_du_temps = "R")
            Journees_parametrages = Journee_parametrages.objects.all()
            Heures_parametrages = Heure_parametrages.objects.all()

            type = ContentType.objects.get_for_model(EmploiDuTempsClasse)
            print(emploidutemps_donnees_JSON)
            for _i_journee in range(nbJournees):
                journee, created = Journee.objects.get_or_create(jour_de_la_semaine_id = _i_journee + 1, \
                                                         content_type=type, object_id=emploidutemps.id)

                for _i_heure in range(nbHeures):
                    #print(emploidutemps_donnees_JSON[_i_journee][_i_heure][0].strip(), "*", emploidutemps_donnees_JSON[_i_journee][_i_heure][1].strip(), "*")
                    try:
                        salle = Salle.objects.get(nom_de_la_salle =  emploidutemps_donnees_JSON[_i_journee][_i_heure][0])
                    except Salle.DoesNotExist:
                        salle = Salle.objects.get(nom_de_la_salle =  "---")
                    try:
                        matiere = Matiere.objects.get(diminutif_matiere =  emploidutemps_donnees_JSON[_i_journee][_i_heure][1])
                    except Matiere.DoesNotExist:
                        matiere = Matiere.objects.get(diminutif_matiere =  "---")
                    print (salle.nom_de_la_salle, matiere.nom_matiere)
                    heure, created = Heure.objects.get_or_create(   heure_dans_la_journee_id = _i_heure + 1, \
                                                                    journee_concernee = journee,\
                                                                    defaults = { 'salle' : salle,  'matiere' : matiere }
                                                        )
                    heure.salle = salle
                    heure.matiere = matiere
                    heure.save()

        except KeyError:
            return HttpResponseServerError("Malformed data!")
        return HttpResponse("Got json data")




def envoitEmploiDuTemps(request, classe_id):
    #print(classe_id)
    try:
        emploidutemps = EmploiDuTempsClasse.objects.get(classe = classe_id)
        emploidutemps_to_send = [[[ heure.salle.nom_de_la_salle, heure.matiere.diminutif_matiere] for heure in journee.heure_set.all()] for journee in emploidutemps.journees.all()]
    except EmploiDuTempsClasse.DoesNotExist:
        emploidutemps_to_send = [[["--"]*2]*(nbHeures)]*(nbJournees)


    print(emploidutemps_to_send)
    reponseJSON = json.dumps({'classe' : classe_id, 'emploidutemps' : emploidutemps_to_send})
    return HttpResponse(reponseJSON, content_type="application/json")

    #journees = _emploidutemps.journees.all()
    #classe
    #for journee in journees:
    #    heures = journee.heure_set.all()
    #   for heure in heures:
    #        matiere = heure.matiere.diminutif_matiere
    #        salle =   heure.salle.nom_de_la_salle
    #        print("salle : ", salle, "matiere : ", matiere)



    #print(journees.count())
    #emploidutemps = [[[0]*2]*nbJournees]*nbHeures
    #print("11111111111111")
    #print(json.dumps(emploidutemps))









"""
def save_events_json(request):
    if request.is_ajax():
        if request.method == 'POST':
            print 'Raw Data: "%s"' % request.raw_post_data
    return HttpResponse("OK")
"""









