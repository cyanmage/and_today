from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic


# Create your models here.


class Eleve(models.Model):
	"""docstring for Eleve""" 

	nom_eleve 					= models.CharField(max_length = 20, verbose_name="Nom de l'élève")
	prenom_eleve 				= models.CharField(max_length = 20)
	regime 						= models.ForeignKey('Regime_parametrages', related_name='regime_eleve')	
	latin 						= models.BooleanField()
	grec 						= models.BooleanField()
	allemand 					= models.BooleanField()
	anglais						= models.BooleanField()
	classe_de_eleve 			= models.ForeignKey('Classe' , related_name='classe_eleve')
	parents_de_eleve 			= models.ForeignKey('Parents', related_name='parents_eleves', blank = True, null = True)

	class Meta:
		verbose_name 			= 'Nom de l\'élève'
		verbose_name_plural 	= 'Nom des élèves'

	def __unicode__(self):
		return u'%s %s' % (self.prenom_eleve, self.nom_eleve)


	def get_JSON():
		return {
			'id'            : self.id,
			'nom_eleve'     : self.nom_eleve,
			'prenom_eleve'  : self.prenom_eleve
		}

class Parents(models.Model):
	"""docstring for Parents"""

	nom_pere 					= models.CharField(max_length = 14)
	nom_mere 					= models.CharField(max_length = 14, blank = True)
	numero_portable_pere 		= models.CharField(max_length = 14, blank = True)	
	numero_portable_mere 		= models.CharField(max_length = 14, blank = True)
	numero_domicile_pere 		= models.CharField(max_length = 14, blank = True)	
	numero_domicile_mere 		= models.CharField(max_length = 14, blank = True)

	def __unicode__(self):
		return u'%s' % (self.nom_pere) 

class Professeur(models.Model):
	"""docstring for Professeur"""

	nom_professeur 				= models.CharField(max_length = 20)

	colles 						= models.ManyToManyField('Eleve', through = 'Colle', related_name='colles_du_professeur')
	punitions 					= models.ManyToManyField('Eleve', through = 'Punition', related_name='punitions_du_professeur')
	rendez_vous_parents 		= models.ManyToManyField('Eleve', through = 'RendezVousParents', related_name='RDV_du_professeur')

	def __unicode__(self):
		return u'%s' % (self.nom_professeur)

		
class Classe(models.Model):
	"""docstring for Classe"""

	abbreviation_classe			= models.CharField(max_length = 5)
	nom_classe 					= models.CharField(max_length = 20, blank = True)

	def __unicode__(self):
		return u'%s' % (self.abbreviation_classe)

	def get_json(self):
		return {
			'id'		: self.id, 
			'fields' 	: {
							'abbreviation_classe': self.abbreviation_classe,
							'nom_classe' : self.nom_classe,
							'eleves': [{'id': eleve.id, 'nom_eleve': eleve.nom_eleve, 'prenom_eleve':eleve.prenom_eleve} for eleve in self.classe_eleve.all().order_by('nom_eleve')]
							#'eleves' : self.classe_eleve.all()
						}
			}



class Punition(models.Model):
	"""docstring for punition"""
	"""Punitions données : association manyToMany eleve-professeur avec champs extra"""

	contenu_punition 			= models.TextField()
	nombre_de_fois 				= models.IntegerField(default=0)
	signature_des_parents 		= models.BooleanField(default=False)
	numero_semaine_donnee 		= models.IntegerField()
	jour_semaine_donnee 		= models.ForeignKey('Journee_parametrages', related_name='jour_semaine_donnee')
	heure_donnee 				= models.ForeignKey('Heure_parametrages', related_name = 'heure_donnee')
	numero_semaine_a_faire 		= models.IntegerField()
	jour_semaine_a_faire 		= models.ForeignKey('Journee_parametrages', related_name='jour_semaine_a_faire')
	heure_a_faire 				= models.ForeignKey('Heure_parametrages', related_name = 'heure_a_faire')
	eleve 						= models.ForeignKey('Eleve', related_name='punition_eleve')
	professeur 					= models.ForeignKey('Professeur', related_name='professeur_punit')

	def __unicode():
		return '%d fois pour %s %s' % (self.nombre_de_fois, self.eleve.prenom_eleve, self.eleve.nom_eleve) 
		

class RendezVousParents(models.Model):
	"""docstring for RendezVous"""
	"""Rendez-vous avec les parents d'élèves : association manyToMany eleve(parents)-professeur avec champs extra"""

	heure_debut 				= models.TimeField()
	heure_fin 					= models.TimeField(blank = True)
	numero_semaine 				= models.IntegerField()	
	jour_semaine 				= models.ForeignKey('Journee_parametrages')
	eleve 						= models.ForeignKey('Eleve', related_name='colle_eleve')
	professeur 					= models.ForeignKey('Professeur', related_name='professeur_colle')




class Colle(models.Model):
	"""docstring for Colle"""
	"""Colles données : association manyToMany eleve-professeur avec champs extra"""

	numero_semaine 				= models.IntegerField()	
	jour_semaine 				= models.ForeignKey('Journee_parametrages')
	heure_journee 				= models.ForeignKey('Heure_parametrages')
	travail_donne 				= models.TextField(blank=True)	
	eleve 						= models.ForeignKey('Eleve', related_name='eleve_RDV')
	professeur 					= models.ForeignKey('Professeur', related_name='professeur_fixe_RDV')	




class Heure_parametrages(models.Model):
	"""docstring for Heure"""

	intitule_heure		 		= models.CharField(max_length = 2)	
	heure_debut 				= models.TimeField()
	heure_fin 					= models.TimeField()
	position_heure				= models.IntegerField()	


class Journee_parametrages(models.Model):
	"""docstring for Journee"""

	nom_journee 				= models.TextField()
	diminutif_nom_journee 		= models.CharField(max_length = 3)
	position_journee 			= models.IntegerField()

		
class Heure(models.Model):
	"""docstring for Heure"""

	journee_concernee 			= models.ForeignKey('Journee')	
	heure_dans_la_journee		= models.ForeignKey('Heure_parametrages')
	salle 			 			= models.ForeignKey('Salle')
	matiere 					= models.ForeignKey('Matiere')			


class Journee(models.Model):
	"""docstring for Journee"""

	jour_de_la_semaine 			= models.ForeignKey('Journee_parametrages')

	#emploi_du_temps_rattache 	= models.ForeignKey('EmploiDuTemps') -> fk vers abstract class remplacé par ce qui suit
	content_type 		= models.ForeignKey(ContentType, null=True)
	object_id 			= models.PositiveIntegerField(null=True)
	content_object 		= generic.GenericForeignKey()



class EmploiDuTemps(models.Model):
	"""docstring for EmploiDuTemps"""
	"""type emploi du temps :  R(de Référence), E (exceptionnel), P(provisoire)"""	

	semaine_debutante 			= models.IntegerField(blank = True)
	semaine_terminante 			= models.IntegerField(blank = True)
	type_emploi_du_temps		= models.CharField(max_length=1)	


	class Meta:
		verbose_name 			= 'Emploi  du temps professeur'
		verbose_name_plural 	= 'Emplois du temps professeur'
		abstract				= True

	def __unicode__(self):
		pass
	

class EmploiDuTempsProfesseur(EmploiDuTemps):
	"""docstring for EmploiDuTempsProfesseur"""
	professeur = models.ForeignKey("Professeur")
	journees   = generic.GenericRelation(Journee)


		
class EmploiDuTempsClasse(EmploiDuTemps):
	"""docstring for EmploiDuTempsClasse"""
	classe   = models.ForeignKey("Classe") 
	journees = generic.GenericRelation(Journee)	
					

class EmploiDuTempsEleve(EmploiDuTemps):
	"""docstring for EmploiDuTempsEleve"""
	eleve    = models.ForeignKey("Eleve")
	journees = generic.GenericRelation(Journee)	

class ModificationsEmploisDuTemps(models.Model):
	"""docstring for ModificationsEmploisDuTemps"""
	""""Liste des modifications ponctuelles d'un emploi du temps"""
	"""Champ 'type modifications' : 'DEPL' (déplacement), 'SUPP' (suppression), 'CREA'(création) -> voir la table de paramétrage TypeModificationEmploiDuTemps"""
	"""Contrainte d'intégrité ----	A RAJOUTER 
	::: si DEPL, heure_ajoutee et heure_supprimee 	obligatoirement indiquées
	::: si SUPP, heure_supprimee 					obligatoirement indiquée
	::: si CREA, heure_ajoutee 						obligatoirement indiquée
							  ----"""	

	type_modification 				= models.ForeignKey('TypeModificationEDT_parametrages')
	numero_semaine_heure_ajoutee  	= models.IntegerField(null = True, blank = True)
	jour_semaine_heure_ajoutee		= models.ForeignKey('Journee_parametrages', related_name='%(app_label)s_%(class)s_ajoutee_related')
	heure_ajoutee 					= models.TimeField(null = True, blank = True)
	numero_semaine_heure_supprimee	= models.IntegerField(null=True, blank=True)
	jour_semaine_heure_supprimee	= models.ForeignKey('Journee_parametrages', related_name='%(app_label)s_%(class)s_supprimee_related')
	heure_supprimee 				= models.TimeField(null=True, blank=True)
	salle_pour_heure_ajoutee		= models.ForeignKey('Salle')
	motif 							= models.TextField(blank=True)


	class Meta:
		abstract 					= True


class ModificationsEDTProfesseur(ModificationsEmploisDuTemps):
	"""docstring for ModificationsEmploisDuTempsProfesseur"""

	aval_du_proviseur 				= models.BooleanField()
	heures_rattrapees 				= models.BooleanField()
	vie_scolaire_avertie 			= models.BooleanField()
	modifications_emploi_du_temps 	= models.ForeignKey('EmploiDuTempsProfesseur')


class ModificationsEDTEleve(ModificationsEmploisDuTemps):
	"""docstring for ModificationsEmploisDuTempsEleve"""
	
	modifications_emploi_du_temps 	= models.ForeignKey('EmploiDuTempsClasse')	

class ModificationsEDTClasse(ModificationsEmploisDuTemps):
	"""docstring for ModificationsEmploisDuTempsClasse"""

	modifications_emploi_du_temps 	= models.ForeignKey('EmploiDuTempsEleve')					


class TypeModificationEDT_parametrages(models.Model):
	"""docstring for TypeModificationEmploiDuTemps"""
	""" valeurs possibles : DEPL' (déplacement), 'SUPP' (suppression), 'CREA'(création) """


	type_modification 				= models.CharField(max_length = 4)
	intitule_modification 			= models.CharField(max_length = 25)

class Regime_parametrages(models.Model):
	"""docstring for Regime_parametrages"""
	"""Régime de l'élève : 'D-P'(demi-pensionnaire), 'EXT'(externe), 'INT'(interne)"""

	abbreviation 					= models.CharField(max_length = 3)
	intitule 						= models.CharField(max_length = 20)

class Salle(models.Model):
	"""docstring for Salle"""

	nom_de_la_salle 				= models.CharField(max_length=6)


class Matiere(models.Model):
	"""docstring for Matiere"""

	diminutif_matiere 				= models.TextField(max_length=3)
	nom_matiere 					= models.TextField()