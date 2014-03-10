from django.shortcuts import render
import datetime

# Create your views here.

def index(request):

    today = datetime.date.today()
    one_day_interval =  datetime.timedelta(days=1)
    tomorrow = today + one_day_interval
    yesterday = today - one_day_interval
    print(yesterday, today, tomorrow, sep="\n")

    return render(request, 'core/index.html', {
                                        'yesterday' : yesterday.isoformat(),
                                         'today' : today.isoformat(),
                                        'tomorrow' : tomorrow.isoformat()
                                        })
