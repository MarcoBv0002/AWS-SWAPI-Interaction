module.exports.Lambda = {
    PEOPLE_TABLE: process.env.LAMBDA_PEOPLE_TABLE,
    SPECIES_TABLE: process.env.LAMBDA_SPECIES_TABLE,
    NAMESPACE_ID: process.env.LAMBDA_NAMESPACE_ID
  };
  
  module.exports.Swapi = {
    PEOPLE_PATH: 'people/',
    SPECIES_PATH: 'species/',
    URL_BASE: 'https://swapi.py4e.com/api/'
  };