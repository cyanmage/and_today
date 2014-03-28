from django.conf.urls import patterns, include, url


from uploadFiles.views import StockeImage

urlpatterns = patterns('',
                       url(r'^$', StockeImage.as_view()),
                       )


