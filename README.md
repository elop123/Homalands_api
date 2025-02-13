# Homalands_api

## API Documentation

API-dokumentationen er tilgængelig på Postman. Du kan finde alle endpoints, eksempler på forespørgsler og svar på følgende link:

POSTMAN: https://www.postman.com/e-lena2024/workspace/homelands-api/request/34660402-1a870de3-818e-4965-9ee8-89e2d95b4b1a?action=share&creator=34660402&ctx=documentation

GitHub: https://github.com/elop123/Homalands_api

1.http://localhost:4000/estates
Denne API bruges til at arbejde med ejendomme – enten ved at hente, oprette, opdatere eller slette dem:
GET http://localhost:4000/estates - Hente en liste over ejendomme.
POST http://localhost:4000/estates - Tilføje en ny ejendom.
PUT http://localhost:4000/estates/:id -Opdatere en bestemt ejendom (med et specifikt ID).
DELETE http://localhost:4000/estates/:id - Slette en bestemt ejendom.

2.http://localhost:4000/login 
:/login-endpointet bruges til at logge brugere ind og autentificere dem, så de kan få adgang.

