const SHA256Hash = require('./SHA256');

const hashDefault = new SHA256Hash();

module.exports = {
    hashDefault
};

/*
Factory Method
El patrón de diseño Factory Method se utiliza para crear objetos de un tipo específico sin especificar explícitamente la clase exacta del objeto que se creará. En este caso, podemos ver una forma de Factory Method parcial en la siguiente línea de código: 
const hashDefault = new SHA256Hash();

Aquí, se está creando una instancia de SHA256Hash y asignándola a la variable hashDefault. Si bien esto no es una implementación completa del patrón Factory Method, 
se puede considerar como una versión parcial, ya que la variable hashDefault actúa como un objeto creado a través del constructor de la clase SHA256Hash.
*/