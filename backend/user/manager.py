from django.contrib.auth.models import UserManager

class Manager(UserManager):
    def create_user(self, email, username, password):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.teams = []
        user.save(using=self._db)
        return user