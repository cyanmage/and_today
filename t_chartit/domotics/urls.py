from django.conf.urls import patterns, include, url
 
urlpatterns = patterns('domotics.views',
    url(r'^$', 'weather_chart_view'),
)