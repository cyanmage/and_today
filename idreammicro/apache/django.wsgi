import os
import sys
 
path = 'I:\sites_web\django\'
if path not in sys.path:
    sys.path.append(path)
 
sys.path.append('I:\sites_web\django\idreammicro\')
 
os.environ['DJANGO_SETTINGS_MODULE'] = 'idreammicro.settings'
 
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()