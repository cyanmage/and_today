from django.db import models

class IntegerRangeField(models.IntegerField):
	"""docstring for IntegerRangeField"""
	def __init__(self, verbose_name = None, name= None, min_value = None, max_value = None, **kwargs):
		self.min_value, self.max_value = min_value, max_value
		models.IntegerField.__init__(self, verbose_name, name, **kwargs)		

	def formfield(self, **kwargs)	:
		defaults = {'min_value' : self.min_value, 'max_value' : self.max_value}
		defaults.update(kwargs)
		return super(IntegerRangeField, self).formfield(**defaults)	



# Create your models here.
class Heure(models.Model):
	"""docstring for Heure"""
	journee = models.ForeignKey('Journee')
	debut_cours = models.DateTimeField()
	fin_cours = models.DateTimeField()
	est_ce_une_heure_de_lemploi_du_temps = models.BooleanField()

	def __init__(self, arg):
		super(Heure, self).__init__()
		self.arg = arg
	
class Journee(models.Model):
	"""docstring for Journee"""
	numero_jour_annee = IntegerRangeField(min_value = 1, max_value = 366)
	numero_semaine = models.IntegerField()
	#"numero_jour_annee = models.IntegerField()"

	def __init__(self, arg):
		super(Journee, self).__init__()
		self.arg = arg		

class Punition(models.Model):
	"""docstring for punition"""
	contenu_punition = models.TextField()
	nombre_de_fois = models.IntegerField()
	signature_des_parents = models.BooleanField()
	id_heure_donnee = models.ForeignKey('Heure', related_name = 'heure_donnee')
	id_heure_a_faire = models.ForeignKey('Heure', related_name = 'heure_a_faire') 
	identifiant_eleve = models.ForeignKey('Eleve')
	#"FIELDNAME = models.ManyToManyField()"

	def __init__(self, arg):
		super(punition, self).__init__()
		self.arg = arg
		

class RendezVousParents(models.Model):
	"""docstring for RendezVous"""
	heure_debut = models.TimeField()
	heure_fin = models.TimeField()	
	identifiant_eleve = models.ForeignKey('Eleve')

	def __init__(self, arg):
		super(RendezVous, self).__init__()
		self.arg = arg

class HeureDeColle(models.Model):
	"""docstring for HeureDeColle"""
	id_heure = models.ForeignKey('Heure')
	identifiant_eleve = models.ForeignKey('Eleve')
	travail_donne = models.TextField()
	def __init__(self, arg):
		super(HeureDeColle, self).__init__()
		self.arg = arg
		
class Eleve(models.Model):
	"""docstring for Eleve""" 

	class Meta:
		verbose_name = 'Nom de l\'élève'
		verbose_name_plural = 'Nom des élèves'

	def __init__(self, arg):
		super(Eleve, self).__init__()
		self.arg = arg
		

	nom_eleve = models.CharField(max_length = 40)

class 

(object):
	"""docstring for 

	"""
	def __init__(self, arg):
		super(

			, self).__init__()
		self.arg = arg
		
		