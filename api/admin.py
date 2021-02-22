from django.contrib import admin

# Register your models here.
from .models import Choice, Question, Assignment, GradedAssignment

admin.site.register(Choice)
admin.site.register(Question)
admin.site.register(Assignment)
admin.site.register(GradedAssignment)