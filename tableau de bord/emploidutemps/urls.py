from django.conf.urls import patterns, url

urlpatterns = patterns('',
                       url(r'^classe$', 'emploidutemps.views.sauvegardeEmploiDuTemps'),
                       url(r'^classe/(?P<classe_id>\d+)$', 'emploidutemps.views.envoitEmploiDuTemps'),
                       )
