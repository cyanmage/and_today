from django.contrib import admin
from core.models import Eleve, Parents, Professeur, Classe, Punition, \
RendezVousParents, Colle, \
EmploiDuTempsProfesseur, EmploiDuTempsClasse, EmploiDuTempsEleve, \
ModificationsEDTProfesseur, ModificationsEDTEleve, ModificationsEDTClasse, Salle


class ClasseAdmin(admin.ModelAdmin):
	list_display  = ('abbreviation_classe', 'nom_classe')
	search_fields = ('abbreviation_classe', 'nom_classe')

admin.site.register(Eleve)
admin.site.register(Parents)
admin.site.register(Professeur)
admin.site.register(Classe, ClasseAdmin)
admin.site.register(Punition)
admin.site.register(RendezVousParents)
admin.site.register(Colle)
admin.site.register(EmploiDuTempsClasse)
admin.site.register(EmploiDuTempsProfesseur)
admin.site.register(EmploiDuTempsEleve)
admin.site.register(ModificationsEDTClasse)
admin.site.register(ModificationsEDTEleve)
admin.site.register(ModificationsEDTProfesseur)
admin.site.register(Salle)

