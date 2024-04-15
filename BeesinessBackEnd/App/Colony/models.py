from django.db import models
from App.workers.models import CustomUser 
# Create your models here.
class project(models.Model):
    creator = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    projectName = models.CharField(max_length=255)
    projectCreated = models.DateTimeField(auto_now=True)
    members = models.JSONField(null=True)
    task = models.JSONField(null=True)

    def __str__(self) -> str:
        return '{}-{}'.format(self.creator, self.projectName)