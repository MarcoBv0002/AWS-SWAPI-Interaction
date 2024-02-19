const { v5: uuidv5 } = require('uuid');
const Swapi = require('./helpers/swapi');
const DynamoDb = require('./helpers/dynamo');
const personModel = require('./models/person');
const speciesModel = require('./models/species');
const Constants = require('./constants/constants');

// Función para crear una persona
module.exports.createPerson = async (event) => {
  try {
    const { id } = event.pathParameters;
    const uuid = uuidv5(id, Constants.Lambda.NAMESPACE_ID);

    // Verificar si la persona ya está registrada en DynamoDB
    const existingPerson = await getPerson(uuid);
    if (existingPerson) {
      return {
        status: 200,
        message: "Persona ya se encuentra registrada.",
        body: {
          person: existingPerson,
        },
      };
    }

    // Obtener datos de la persona desde Swapi
    const personData = await Swapi.getResource(Constants.Swapi.PEOPLE_PATH, id);

    // Traducir atributos de la persona
    const translatedPerson = await translatePersonAttributes(personData, uuid);
    await setPerson(translatedPerson);

    return {
      status: 200,
      message: "Persona ha sido creada exitosamente por SWAPI.",
      body: {
        person: translatedPerson
      },
    };
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
      stack: error.stack
    };
  }
};

// Función para crear una especie
module.exports.createSpecies = async (event) => {
  try {
    const { id } = event.pathParameters;
    const uuid = uuidv5(id, Constants.Lambda.NAMESPACE_ID);

    // Verificar si la especie ya está registrada en DynamoDB
    const existingSpecies = await getSpecies(uuid);
    if (existingSpecies) {
      return {
        status: 200,
        message: "Especie ya se encuentra registrada.",
        body: {
          specie: existingSpecies,
        },
      };
    }

    // Obtener datos de la especie desde Swapi
    const speciesData = await Swapi.getResource(Constants.Swapi.SPECIES_PATH, id);

    // Traducir atributos de la especie
    const translatedSpecies = await translateSpeciesAttributes(speciesData, uuid);
    await setSpecies(translatedSpecies);

    return {
      status: 200,
      message: "Especie ha sido creada exitosamente por SWAPI.",
      body: {
        specie: translatedSpecies
      },
    };
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
      stack: error.stack
    };
  }
};

// Función para obtener las tablas People y Species
module.exports.getResources = async (event) => {
  try {
    let data = null;
    if (event.pathParameters.table == 1) {
      data = await DynamoDb.getAll(Constants.Lambda.PEOPLE_TABLE);
    } else if (event.pathParameters.table == 2) {
      data = await DynamoDb.getAll(Constants.Lambda.SPECIES_TABLE);
    } else {
      return {
        status: 200,
        body: {
          count: 0,
          message: "Tabla no se encuentra registrada. Considere valores |1|Personas - |2|Especies",
          data: data,
        },
      };
    }

    return {
      status: 200,
      body: {
        count: data.length,
        message: "Consulta exitosa",
        data: data,
      },
    };
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
      stack: error.stack
    };
  }
};

// Funciones auxiliares
const getPerson = async (id) => {
  return await DynamoDb.getItem(id, Constants.Lambda.PEOPLE_TABLE);
};

const setPerson = async (data) => {
  return await DynamoDb.setItem(data, Constants.Lambda.PEOPLE_TABLE);
};

const translatePersonAttributes = async (data, id) => {
  return new personModel({
    id: id,
    nombre: data.name,
    altura: data.height,
    peso: data.mass,
    color_cabello: data.hair_color,
    color_piel: data.skin_color,
    color_ojos: data.eye_color,
    anio_nacimiento: data.birth_year,
    genero: data.gender,
    planeta_natal: data.homeworld,
    peliculas: data.films,
    especies: data.species,
    vehiculos: data.vehicles,
    naves_estelares: data.starships,
    creado: data.created,
    modificado: data.edited,
    url: data.url,
  });
};

const getSpecies = async (id) => {
  return await DynamoDb.getItem(id, Constants.Lambda.SPECIES_TABLE);
};

const setSpecies = async (data) => {
  return await DynamoDb.setItem(data, Constants.Lambda.SPECIES_TABLE);
};

const translateSpeciesAttributes = async (data, id) => {
  return new speciesModel({
    id: id,
    nombre: data.name,
    clasificacion: data.classification,
    designacion: data.designation,
    altura_promedio: data.average_height,
    colores_piel: data.skin_colors,
    colores_pelo: data.hair_colors,
    colores_ojos: data.eye_colors,
    esperanza_vida: data.average_lifespan,
    planeta_natal: data.homeworld,
    lenguaje: data.language,
    personas: data.people,
    peliculas: data.films,
    creado: data.created,
    modificado: data.edited,
    url: data.url,
  });
};
