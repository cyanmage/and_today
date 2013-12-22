from django.conf.urls import patterns, url

urlpatterns = patterns('',
                       url(r'^$', 'defilement_infini.views.defilement'))
