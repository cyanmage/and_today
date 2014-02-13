from django.conf.urls import patterns, include, url
from controleSticker.views import ControleStickerView


urlpatterns = patterns('',
                       url(r'^$', ControleStickerView.as_view())
)
