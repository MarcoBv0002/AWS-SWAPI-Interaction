# AWS-SWAPI-Interaction
Implementación de consumo de APIs con Serverless Framework en Node.js 20 y AWS. Aprovecha las ventajas del entorno serverless para escalabilidad y gestión eficiente de recursos en la nube.


### Deployment
Antes de iniciar con el despliegue deberás tener tus credenciales AWS configuradas. Posterior a eso sigue estos pasos:

- Ejecuta `npm i` para instalar las dependencias del proyecto
- Ejecuta `npx sls deploy` para iniciar con el despliegue.

Luego de ejecutar estos comandos y tener un despliegue exitoso deberías visualizar algo similar:

```bash
Deploying reto-swapi to stage dev (us-east-1)

✔ Service deployed to stack reto-swapi-dev (185s)

endpoints:
  POST - https://lx3lct0qtf.execute-api.us-east-1.amazonaws.com/person/{id}
  POST - https://lx3lct0qtf.execute-api.us-east-1.amazonaws.com/species/{id}
  GET - https://lx3lct0qtf.execute-api.us-east-1.amazonaws.com/resources/{table}
functions:
  createPerson: reto-swapi-dev-createPerson (18 MB)
  createSpecies: reto-swapi-dev-createSpecies (18 MB)
  getResources: reto-swapi-dev-getResources (18 MB)
```

Podrás visualizar los componentes creados desde la consola AWS y accedes al servicio CloudFormation se habrá creado un paquete llamado
"reto-swapi-dev" si accedes a la pestaña de recursos se visualizará todos los componentes de AWS que el proyecto utilizará.

### Invocate Functions

Luego de haber tenido un exitoso despliegue, podrás invocar las funciones de la aplicación como cliente Rest API 

Para las pruebas puedes utilizar Postman, ARC, Swagger, Insomnia o la plataforma de tu preferencia.

```bash
endpoints:
  POST - https://lx3lct0qtf.execute-api.us-east-1.amazonaws.com/person/{id}
  POST - https://lx3lct0qtf.execute-api.us-east-1.amazonaws.com/species/{id}
  GET - https://lx3lct0qtf.execute-api.us-east-1.amazonaws.com/resources/{table}
functions:
  createPerson: reto-swapi-dev-createPerson (18 MB)
  createSpecies: reto-swapi-dev-createSpecies (18 MB)
  getResources: reto-swapi-dev-getResources (18 MB)
```

El proyecto es una simulación a lo que te devolvería SWAPI, el api de Star Wars. 

  **1)createPerson:** 
  
    Esta función buscará una persona del universo StarWars, debes proporcionarle un ID del personaje (1-87) 
    
    URL Referencia: https://swapi.py4e.com/api/people/
    
    Se guardará la información que solicites en una tabla DynamoDB, posteriormente consultada en getResources
    
    Ejemplo de ejecución:
    
    Petición: POST
          
    Enlace: https://iyf55xkvo5.execute-api.us-east-1.amazonaws.com/person/21
          
    Respuesta:
          
          ```json
      
      
              {
                "status": 200,
                "message": "Persona ha sido creada exitosamente by SWAPI.",
                "body": {
                    "person": {
                        "id": "c703a595-390b-58ac-8030-0de53aaf06f2",
                        "nombre": "Palpatine",
                        "altura": "170",
                        "peso": "75",
                        "color_cabello": "grey",
                        "color_piel": "pale",
                        "color_ojos": "yellow",
                        "anio_nacimiento": "82BBY",
                        "genero": "male",
                        "planeta_natal": "https://swapi.py4e.com/api/planets/8/",
                        "peliculas": [
                            "https://swapi.py4e.com/api/films/2/",
                            "https://swapi.py4e.com/api/films/3/",
                            "https://swapi.py4e.com/api/films/4/",
                            "https://swapi.py4e.com/api/films/5/",
                            "https://swapi.py4e.com/api/films/6/"
                        ],
                        "especies": ["https://swapi.py4e.com/api/species/1/"],
                        "vehiculos": [],
                        "naves_estelares": [],
                        "creado": "2014-12-15T12:48:05.971000Z",
                        "modificado": "2014-12-20T21:17:50.347000Z",
                        "url": "https://swapi.py4e.com/api/people/21/"
                    }
                }
            }
            ```
  **2)createSpecie:** 
  
    Esta función buscará una especie del universo StarWars, debes proporcionarle un ID  (1-37) 
    
    URL Referencia: https://swapi.py4e.com/api/species/
    
    Se guardará la información que solicites en una tabla DynamoDB, posteriormente consultada en getResources
    
    Ejemplo de ejecución:
    
    Petición: POST
          
    Enlace: https://iyf55xkvo5.execute-api.us-east-1.amazonaws.com/species/9
          
    Respuesta:
          
          ```json 
                {
                "status": 200,
                "message": "Especie ha sido creada exitosamente por SWAPI.",
                "body": {
                    "specie": {
                        "id": "afaa8dc3-b488-5b65-8f31-b19a551e876e",
                        "nombre": "Ewok",
                        "clasificacion": "mammal",
                        "designacion": "sentient",
                        "altura_promedio": "100",
                        "colores_piel": "brown",
                        "colores_pelo": "white, brown, black",
                        "colores_ojos": "orange, brown",
                        "esperanza_vida": "unknown",
                        "planeta_natal": "https://swapi.py4e.com/api/planets/7/",
                        "lenguaje": "Ewokese",
                        "personas": [
                            "https://swapi.py4e.com/api/people/30/"
                        ],
                        "peliculas": [
                            "https://swapi.py4e.com/api/films/3/"
                        ],
                        "creado": "2014-12-18T11:22:00.285000Z",
                        "modificado": "2014-12-20T21:36:42.155000Z",
                        "url": "https://swapi.py4e.com/api/species/9/"
                    }
                }
            }
            ```
**3)getResources:** 
  
    Esta función mostrará toda la información almacenada en las tablas DynamoDB

    Table Species
    Código : 1
    
    Table Persona
    Código : 2
    
    Ejemplo de ejecución:
    
    Petición: GET
          
    Enlace: https://iyf55xkvo5.execute-api.us-east-1.amazonaws.com/resources/2
          
    Respuesta:
          
          ```json 
                {
    "status": 200,
    "body": {
        "count": 7,
        "message": "Consulta exitosa",
        "data": [
            {
                "planeta_natal": "https://swapi.py4e.com/api/planets/23/",
                "colores_piel": "green, blue",
                "colores_ojos": "black",
                "nombre": "Rodian",
                "altura_promedio": "170",
                "personas": [
                    "https://swapi.py4e.com/api/people/15/"
                ],
                "colores_pelo": "n/a",
                "modificado": "2014-12-20T21:36:42.144000Z",
                "url": "https://swapi.py4e.com/api/species/4/",
                "peliculas": [
                    "https://swapi.py4e.com/api/films/1/"
                ],
                "designacion": "reptilian",
                "esperanza_vida": "unknown",
                "lenguaje": "Galatic Basic",
                "creado": "2014-12-10T17:05:26.471000Z",
                "id": "56beb818-ec73-5d51-870a-c2b14a246ecd",
                "clasificacion": "sentient"
            },
            {
                "planeta_natal": null,
                "colores_piel": "n/a",
                "colores_ojos": "n/a",
                "nombre": "Droid",
                "altura_promedio": "n/a",
                "personas": [
                    "https://swapi.py4e.com/api/people/2/",
                    "https://swapi.py4e.com/api/people/3/",
                    "https://swapi.py4e.com/api/people/8/",
                    "https://swapi.py4e.com/api/people/23/",
                    "https://swapi.py4e.com/api/people/87/"
                ],
                "colores_pelo": "n/a",
                "modificado": "2014-12-20T21:36:42.139000Z",
                "url": "https://swapi.py4e.com/api/species/2/",
                "peliculas": [
                    "https://swapi.py4e.com/api/films/1/",
                    "https://swapi.py4e.com/api/films/2/",
                    "https://swapi.py4e.com/api/films/3/",
                    "https://swapi.py4e.com/api/films/4/",
                    "https://swapi.py4e.com/api/films/5/",
                    "https://swapi.py4e.com/api/films/6/",
                    "https://swapi.py4e.com/api/films/7/"
                ],
                "designacion": "sentient",
                "esperanza_vida": "indefinite",
                "lenguaje": "n/a",
                "creado": "2014-12-10T15:16:16.259000Z",
                "id": "88fcb92e-c9b0-5598-85f1-f1b92d109d6e",
                "clasificacion": "artificial"
            },
            .
            .
            .
            ```            
