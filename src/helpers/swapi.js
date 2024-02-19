const axios = require("axios");
const Constants = require('../constants/constants');

module.exports.getResource = async (resource, id) => {
  const url = `${Constants.Swapi.URL_BASE}${resource}${id}`;
  response = await axios.get(url);
  return response.data;
};