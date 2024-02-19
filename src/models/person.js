class personModel {
    constructor({
      id = null,
      nombre = null,
      altura = null,
      peso = null,
      color_cabello = null,
      color_piel = null,
      color_ojos = null,
      anio_nacimiento = null,
      genero = null,
      planeta_natal = null,
      peliculas = [],
      especies = [],
      vehiculos = [],
      naves_estelares = [],
      creado = null,
      modificado = null,
      url = null,
    }) {
      this.id = id;
      this.nombre = nombre;
      this.altura = altura;
      this.peso = peso;
      this.color_cabello = color_cabello;
      this.color_piel = color_piel;
      this.color_ojos = color_ojos;
      this.anio_nacimiento = anio_nacimiento;
      this.genero = genero;
      this.planeta_natal = planeta_natal;
      this.peliculas = peliculas;
      this.especies = especies;
      this.vehiculos = vehiculos;
      this.naves_estelares = naves_estelares;
      this.creado = creado;
      this.modificado = modificado;
      this.url = url;
    }
  }
  
  module.exports = personModel;