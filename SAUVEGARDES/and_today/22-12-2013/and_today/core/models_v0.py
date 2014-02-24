from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here

class Post(models.Model):
	"""docstring for Post"""
	"""Champs : contenu, domaine et date"""

	class Meta:
		verbose_name = _('Post')
		verbose_name_plural = _('Posts')

	def __str__(self):
		return "Date : " +  self.date.strftime('%d %b %Y') + "    , domaine : " + self.domaine.intitule_domaine + "   , contenu tronqué : " + self.contenu[:9]

	contenu 			= models.CharField(max_length=400)
	date 				= models.DateField()
	domaine 			= models.ForeignKey('Domaine')   
	journee_generique	= models.BooleanField(default=False)
	recopie_tel_quel 	= models.BooleanField(default=False)




class Domaine(models.Model):
	"""docstring for Domaine"""
	"""Domaines possibles : sciences, histoire-géographie, people, mon-histoire"""

	class Meta:
		verbose_name = _('Domaine')
		verbose_name_plural = _('Domaines')

	def __str__(self):
		return self.intitule_domaine
 

	intitule_domaine = models.CharField(max_length=50)   
