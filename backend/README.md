# Backend

To run the Django server, add a `.env` file with a Django `SECRET_KEY` and `DEBUG` set to `True`. Then run 

```
python manage.py migrate --run-syncdb
python manage.py runserver
```

To add all teams, skaters, and goalies, run
```
python manage.py shell --command="from scripts.onLoadApi import initialLoad; initialLoad();"
```
This will take a bit of time. Wait for the terminal to display `DONE`. 

# Documentation
`/api/skaters/` - returns player information for all active NHL forwards and defensemen

`/api/goalies/` - returns player information for all active NHL goalies

`/api/nhlteams/` - returns information for all 32 active NHL teams

`/api/positions/` - returns information for NHL positions (C, LW, RW, D, G)

`/api/users/` - returns the username and teams of all users

`/api/teams/` - returns all fantasy teams created on site

All NHL data is scraped from `https://statsapi.web.nhl.com/`. Documentation for the API can be found [here](https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md). 
