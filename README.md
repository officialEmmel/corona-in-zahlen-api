<img src="https://www.corona-in-zahlen.de/static/apple-touch-icon.png" width="100px">
# Corona-in-Zahlen-API
An unofficial api for https://www.corona-in-zahlen.de written in node js and typescript
## Endpoints
### Districts:
GET `https://yourdomain.com/ciz-api/lk/sk%20hamburg`
### States:
GET `https://yourdomain.com/ciz-api/bl/niedersachsen`
### Country:
GET `https://yourdomain.com/ciz-api/lnd/deutschland`
### Geolocation:
District
GET `https://yourdomain.com/ciz-api/geo/lk?lat=53.463&lon=9.666`

State
GET `https://yourdomain.com/ciz-api/geo/bl?lat=53.463&lon=9.666`

Country
GET `https://yourdomain.com/ciz-api/geo/lnd?lat=53.463&lon=9.666`
