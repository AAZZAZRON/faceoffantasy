# Backend

To run the Django server, add a `.env` file with a Django `SECRET_KEY` and `DEBUG` set to `True`. Then run 

```
python manage.py migrate --run-syncdb
python manage.py runserver
```

To add all teams, skaters, and goalies, visit

```
<host>/loadplayers/
```