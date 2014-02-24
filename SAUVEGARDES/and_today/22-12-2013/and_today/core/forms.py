from django.forms import ModelForm
from core.models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
    
    
		

    