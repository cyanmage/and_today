from django.conf.urls import patterns, url
from stickit.views import GroupeElementView, StickerView,  BackgroundCadreView

urlpatterns = patterns('',
                       url(r'^groupe-elements/(\d{4}-\d{2}-\d{2})/$', GroupeElementView.as_view()),
                       url(r'^sticker/(\d+)/$', StickerView.as_view()),
                       url(r'^backgroundcadre/(\d+)/$', BackgroundCadreView.as_view()),
              )

