from django.conf.urls import patterns, url
from stickit.views import GroupeStickerView

urlpatterns = patterns('',
                       url(r'^groupe-stickers/(\d{4}-\d{2}-\d{2})/$', GroupeStickerView.as_view())
              )

