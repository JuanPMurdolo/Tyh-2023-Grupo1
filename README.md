# Tyh-2023-Grupo1
Grupo 1 de la materia Tecnicas y herramientas de la maestria en ingenieria de software de la UNLP

BlockChain

Una blockchain es un registro digital descentralizado y seguro que utiliza criptografía para proteger la información y garantizar su integridad. La información a intercambiar estará representada por tokens. Un token es simplemente un String con el patrón “TKN-” donde es un identificador con formato UUID 1 . Un ejemplo de token puede ser TKN-6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b. Cada token es transferido de una dirección a otra mediante una transacción. Existe una transacción inicial llamada coinbase en donde un token es incorporado, y transacciones normales que representan el cambio de titular del token. En las transacciones normales se hace referencia a la última transacción del mismo token, y se guarda la dirección del nuevo titular. Cada transacción tiene un identificador con formato “Tx-”, y dos parámetros entre tres posibles:

IN: contiene el identificador de la última transacción que involucró al token. Solo las transacciones normales lo contienen
TKN: el id de token. Solo para las transacciones coinbase.
OUT: la dirección del nuevo dueño del token representada como “A-” donde es un identificador generado por el dueño de la transacción. Ambos tipos de transacción incluyen el parámetro OUT. Además incluyen su hash (más detalles sobre esto luego). Por ejemplo: Para asegurar la integridad y seguridad de la información registrada en una blockchain se utilizan funciones de hash. Una función hash es un algoritmo matemático que convierte datos de entrada de cualquier longitud en una cadena de caracteres de longitud fija. Esta cadena, conocida como hash, es única para los mismos datos de entrada y cualquier cambio en ellos resultará en un hash completamente diferente. En esta blockchain se debera permitir 1 https://www.npmjs.com/package/uuid intercambiar el mecanismo de generación y verificación de hash. Se deben poder utilizar al menos MD5 y SHA256 que son provista por la librería JSHashes 2 . Las transacciones se guardan en bloques, que almacenan hasta 10 transacciones. Cuando un bloque efectivamente llega a las 10 transacciones, éste se cierra, y ocurren 4 cosas:

1. Deja de admitir nuevas transacciones No permite cargar nuevas transacciones, requiriendo la creación de un nuevo bloque para ello.
2. Se completa su información y hash Se guarda un timestamp (formato epoch 3 ) del momento de cierre, y se calcula y almacena su hash. El hash de un bloque se obtiene a partir de todos sus atributos, es decir timestamp, lista de todas sus transacciones y hash del bloque anterior: Hash(timestamp, prev_block_hash, Hash(tx1), ... , Hash(tx10)) Además, cada transacción también computa y almacena su hash, lo que hace que sea muy difícil de manipular o falsificar la información en la cadena. Cualquier alteración de los datos de la transacción cambiará el hash, lo que a su vez invalidará el bloque y la cadena en la que está registrado. Fig 2. Ejemplo de cadena de 3 bloques. 3 https://es.wikipedia.org/wiki/Tiempo_Unix 2 https://www.npmjs.com/package/jshashes
3. Se agrega el hash del bloque anterior Esto forma efectivamente la cadena (de ahí el nombre blockchain)
4. Se realiza el broadcast El nuevo bloque es replicado a través de diferentes nodos (ver siguiente párrafo). Los bloques son administrados por nodos. Un nodo está en contacto con otros nodos, y todos los nodos guardan una copia de la misma blockchain (y guardan una única blockchain). Desde cualquiera de estos nodos se pueden registrar nuevas transacciones, que son registradas en un bloque solo si es correcta (es decir, si su hash es correcto). Tener en cuenta que la blockchain solo se compone de bloques cerrados, con lo cual las transacciones que recibe cada nodo se van guardando en un bloque abierto, que aún no forma parte de la blockchain. Cada nodo mantendrá este bloque abierto (diferente al del resto de los nodos), hasta completarlo y cerrarlo. En ese punto se realizan las 4 acciones de cierre de bloque, en particular se agrega a la blockchain local y se realiza el broadcasting, es decir, se envía el bloque recién cerrado a los nodos conocidos para que todos lo agreguen a su copia local de la blockchain - validando también su integridad. Fig 3. Ejemplo de estructura de 3 nodos, cada uno con su copia de la blockchain y un bloque abierto para agregar transacciones. Para sortear la limitación de las 10 transaciones por bloque, se decidio permitir contar con transacciones compuestas. Este tipo de transacción permite agrupar hasta 3 transacciones compuestas, y hasta obtener una altura de 2. De esta forma, en el lugar de una transacción podemos tener hasta 9 transacciones simples (la mencionada anteriormente). 
Un ejemplo de transacción compuesta sería: 
● Transacción Compuesta: 
○ Transacción Compuesta: 
■ Transacción Simple 
■ Transacción Simple 
■ Transacción Simple 
○ Transacción Compuesta: 
■ Transacción Simple 
■ Transacción Simple 
■ Transacción Simple 
○ Transacción Simple

Aclaraciones

- Evitar el uso de expresiones lambda o funciones anónimas, salvo para la API de colecciones.
- Si se utilizan patrones de diseño para la solución, documentarlos

Objetivos
- Realizar un diagrama de clases con la solución
- Implementar la solución en NodeJS utilizando el paradigma de orientación a objetos. Se debe poder:
- Crear nuevos nodos, pero no hace falta modelar la incorporación de nuevos nodos a una blockchain existente
- Agregar transacciones, validando su integridad
- Establecer y alterar el mecanismo de hashing
- Cerrar bloques con todo lo que esto conlleva, lo que debe desencadenarse automáticamente al agregar la tx que excede el límite (11)
- Implementar tests de unidad para probar la solución con una cobertura de 80% del código.
