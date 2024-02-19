class speciesModel {
    constructor({
      id = null,
      nombre = null,
      clasificacion = null,
      designacion = null,
      altura_promedio = null,
      colores_piel = null,
      colores_pelo = null,
      colores_ojos = null,
      esperanza_vida = null,
      planeta_natal = null,
      lenguaje = null,
      personas = [],
      peliculas = [],
      creado = null,
      modificado = null,
      url = null,
    }) {
      this.id = id;
      this.nombre = nombre;
      this.clasificacion = clasificacion;
      this.designacion = designacion;
      this.altura_promedio = altura_promedio;
      this.colores_piel = colores_piel;
      this.colores_pelo = colores_pelo;
      this.colores_ojos = colores_ojos;
      this.esperanza_vida = esperanza_vida;
      this.planeta_natal = planeta_natal;
      this.lenguaje = lenguaje;
      this.personas = personas;
      this.peliculas = peliculas;
      this.creado = creado;
      this.modificado = modificado;
      this.url = url;
    }
  }

  module.exports = speciesModel;