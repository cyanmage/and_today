import os
os.environ['DJANGO_SETTINGS_MODULE'] = './tdb/settings.py'
# ...
from django.db import connection

print(connection.queries)
