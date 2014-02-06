from django.conf.urls import patterns, include, url


from dnd_upload.views import StockeImage

urlpatterns = patterns('',
                       url(r'^$', StockeImage.as_view()),
                       )


