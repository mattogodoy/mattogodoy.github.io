---
author: matto
title: Fabricación de un Roadbook con Tripmaster
date: 2017-06-03T19:50:00+01:00
image: 
  path: /images/r6-1.jpg
categories:
tags:
- electronica
- impresora-3d
- programacion
- moto
---

# Actualización:

Gracias al interés de todos vosotros en el proyecto he seguido desarrollándolo y evolucionando a nuevas versiones. Más detalles en:

[https://baja.matto.io/](https://baja.matto.io/)

# Actualización 2:

Luego de varias solicitudes, finalmente he añadido un diagrama esquemático de las conexiones, que es algo que debería haber puesto en el post desde el principio.

* * *

# Introducción

En lo que va del año (2017) he tenido la suerte de participar en dos rallies en moto: [Trip & Track](http://tripandtrack.es/) y [Desert Adventure](http://sectortrailalmeria.es/desert-adventure/).

### Hoja de ruta

Ambos rallies disponían de la modalidad de **navegación** , que consiste en ir siguiendo indicaciones divididas en viñetas impresas en un rollo de papel llamado «hoja de ruta». Algo así:

![](/images/roadbook.jpg)

El funcionamiento es bastante parecido al de un GPS, sólo que analógico, y a mi parecer, bastante más divertido.

Llamamos viñetas a cada fila de la tabla, y a su vez, cada fila está dividida en tres columnas. En la primera vemos en grande el número de kilómetros recorridos desde el inicio de la etapa, y en pequeño la distancia parcial, que indica los kilómetros que han pasado desde la última viñeta.

En la segunda columna podemos ver un dibujo que indica por medio de flechas la dirección que debemos seguir. Generalmente se considera que el piloto viene desde abajo (o desde el sur) del dibujo.

La tercer columna se utiliza para observaciones o notas especiales, como el indicativo de que en ese punto hay que pasar por un «waypoint» para que registren que hemos pasado por ahí, o que hay que dejar el asfalto. En esta columna se indican también zonas peligrosas o a las que hay que prestar especial atención por algún motivo. En algunas ocasiones, si la dirección en la que hay que seguir no está muy clara porque hay varios caminos parecidos, se suele poner el «heading» (o grados respecto al norte, desde 0º hasta 359º) hacia el cual hay que dirigirse.

Los rollos de papel son entregados poco tiempo antes de la carrera para que nadie pueda recorrer o aprenderse la ruta antes de tiempo.

![](/images/desert.jpg)

En la foto se ven 3 rollos de papel. Se dividen por etapas, y el motivo es que de otra manera sería un rollo demasiado grueso y no entraría en el «porta roadbook».

### Porta Roadbook

No es más que una caja estanca con dos ejes, en los que enrollamos el papel para poder ir pasando de viñetas en la medida en que vamos avanzando por el recorrido.

![](/images/roadbook2.jpg)

Existen dos tipos de porta roadbook: manuales y eléctricos. La anterior foto corresponde a uno manual, que dispone de dos ruedas en los extremos de los ejes, con las que el piloto irá pasando el papel hacia un lado o hacia el otro. La desventaja es que para pasar el papel, el piloto debe soltar el manillar de la moto, lo cual es menos que ideal en una situación en la que el terreno es complicado.

Una evolución de éste, es el porta roadbook eléctrico. Tiene la ventaja de que el papel se mueve por medio de un motor, por lo que el piloto no tiene que soltar el manillar en ningún momento.

![](/images/roadbook3.jpg)

El control del movimiento y la dirección del papel se efectúa por medio de un switch de 3 posiciones que va sujeto cerca de la piña izquierda del manillar, y se acciona con el pulgar.  
El modelo eléctrico se puede accionar también de forma manual para poder seguir con la ruta si algo falla.

Está muy claro que el modelo eléctrico es mucho mas práctico y evidentemente es el que quiero.

### Tripmaster

Para poder llevar la cuenta de las distancias totales, parciales y dirección respecto al norte antes mencionadas, se utiliza un dispositivo electrónico llamado «Tripmaster». Los hay de varias marcas, pero los más comunes se valen de un sensor magnético que va en la rueda para calcular la distancia recorrida.

![](/images/trip.png)

Hay un segundo tipo de tripmaster que utilizan GPS en vez de sensores magnéticos. Esto simplifica la instalación, pero he escuchado a más de un piloto quejarse de que no siempre cuentan bien las distancias y que a veces pierden señal, dejando de cumplir con su función.

Idealmente se utilizan dos contadores; uno para la distancia parcial y otro para la distancia total, dirección respecto al norte, velocidad, hora, etc.

A su vez, el contador debe tener la posibilidad de corregir las distancias. En el escenario (bastante común) en el que el piloto se equivoca en una indicación y sigue en una dirección incorrecta, el tripmaster seguirá contando distancia. Cuando el piloto se de cuenta de su error y vuelva al camino correcto, las distancias ya no coincidirán con las del roadbook, por tanto deberá ajustarlas.  
Para ello, el tripmaster dispone de 3 botones que van cerca de la piña izquierda del manillar, junto con el switch de control del roadbook.

![](/images/botones.jpg)

Generalmente dispone de 3 botones: Aumentar distancia (los aumentos van de a 100 metros), reducir distancia y resetear distancia parcial.

### El problema

Hasta aquí todo muy bien. Ya sabía lo que necesitaba, cómo funcionaba y cómo se acoplaba a la moto. El problema llegó a la hora de ver precios:

- [Porta roadbook eléctrico](https://www.f2r.pt/epages/f2r.sf/en_GB/?ObjectPath=/Shops/f2r/Products/RB730): **225€**
- [Tripmaster con sensor de rueda](https://www.f2r.pt/epages/f2r.sf/en_GB/?ObjectPath=/Shops/f2r/Products/ICO001): 325€ \* 2 = **650€**
- [Soporte para montar porta roadbook](https://www.f2r.pt/epages/f2r.sf/en_GB/?ObjectPath=/Shops/f2r/Products/RMS001/SubProducts/RMS001-28): **125€**
- [Soporte para montar tripmasters](https://www.f2r.pt/epages/f2r.sf/en_GB/?ObjectPath=/Shops/f2r/Products/RMS002): **65€**
- [Mando de control con switch y botones](https://www.f2r.pt/epages/f2r.sf/en_GB/?ObjectPath=/Shops/f2r/Products/CR001): **220€**
- **TOTAL: 1285€**

Un poco absurdo para una caja con un motor y dos contadores que no tienen más procesamiento que una calculadora de bolsillo, no?  
Y eso que estos son los precios más baratos que encontré. No quiero ni pensar en mirar componentes de mayor calidad.

Cuando se trata de accesorios para moto siempre pasa lo mismo. Si vas a una tienda y preguntas:

\_ "¿Cuánto cuesta este plástico?"  
\_ "Cuesta 15€. Ah, ¿es para una moto? Perdona, cuesta 400€."

Entiendo que son dispositivos electrónicos que van a estar expuestos a los elementos y a muchas, muchísimas vibraciones, pero que tres botones con un switch pegado cuesten 220€ me parece injustificable.

# Fabricación

El precio absurdo de los componentes sumado a que me gusta construir este tipo de cosas me llevó a la decisión de que lo haría yo mismo.

(La lista de componentes, el código fuente y los modelos 3D están disponibles para su descarga al final de este post)

¡Manos a la obra!

### Planificación

Para sustituir a los dos tripmasters, decidí utilizar un Arduino Nano sumado a dos pantallas de 7 secciones, parecidas a las de las calculadoras viejas. Buscaría un sensor magnético industrial para contar las vueltas de la rueda y así medir la distancia.

![](/images/diagrama.jpg)
_Boceto inicial del sistema completo_

### OpenTrip

Mi idea era hacer de esto un proyecto Open Source, y liberar tanto el código como los circuitos a quien quisiera fabricar su propio tripmaster. De ahí el nombre **OpenTrip**.

### Prototipos

Para el primer prototipo utilicé un Arduino Nano y la pantalla de un Nokia 5110 que tenía en casa:

{% include embed/youtube.html id='qvac0fP2cnE' %}

### Pantallas

Luego de investigar bastante, me decanté por estas pantallas de LCD con luz de fondo, que se ven decentemente a la luz directa del sol:

![](/images/pantallas.jpg)

E implementé algo de la lógica del prototipo para ver si funcionaban:

{% include embed/youtube.html id='mzY9mkRyIQc' %}

¡Vamos bien!

Además, desarrollé un sistema de menus para que el piloto pueda seleccionar lo que quiere ver en cada pantalla y configurar la [declinación magnética](https://es.wikipedia.org/wiki/Declinaci%C3%B3n_magn%C3%A9tica) y la circunferencia de la rueda:

{% include embed/youtube.html id='Wv49f0lw6Q4' %}

### Sensor magnético

Cada moto tiene una rueda de distinta forma y tamaño, por lo que para calcular distancias necesitamos saber su circunferencia exacta. De esta forma, la distancia recorrida se calcula multiplicando la cantidad de vueltas que ha dado la rueda por su circunferencia.

Luego de ver varios sensores, compré dos de tipo industrial:

![](/images/hall-sensor.jpg)

Pero debido a su tamaño, y que por algún motivo no fui capaz de hacerlos funcionar con mi Arduino, finalmente me decanté por una solución más simple, económica y pequeña; un sensor de efecto HALL (A3144):

![](/images/hall-sensor2.jpg)

Este sensor combinado a un imán de neodimio me dio resultados excelentes para detectar cada vuelta de la rueda.

Para instalar el sensor en la moto, llevé el cable junto con los cables de freno y del sensor del ABS, y coloqué el sensor cerca del disco de freno. Luego pegué el imán al disco de freno con superglue en un punto en el que no toque con nada al girar la rueda, y que pase justo por debajo del sensor.

### Conectores

Teniendo en cuenta que las conexiones entre las pantallas, el mando, el sensor de velocidad y el roadbook deben ser robustas y fáciles de conectar, me decanté por estos conectores:

![](/images/conectores.jpg)

De esta forma me aseguraría de que no se iban a desconectar por las vibraciones ni se iban a ver afectados por el agua o el polvo.

En la misma foto se puede ver uno de los botones que compré para el mando, pero de eso hablaremos más adelante.

### Software

El software que permite que todo esto funcione va dentro de un Arduino, por lo que no tuve otra opción que utilizar C++ para su desarrollo. Las ventajas que tiene C++ son las mismas que a su vez son desventajas. Permite trabajar a muy bajo nivel y se ejecuta de manera muy rápida y eficiente, pero a su vez, siendo de tan bajo nivel, nos obliga a lidiar con problemas de memoria, punteros y falta de simplicidad. Cosas tan banales como saber que cantidad de objetos hay dentro de un array se transforman en tareas complicadas con decenas de líneas de código, cuando en otros lenguajes más abstraídos se puede hacer con sólo una línea de código.

Por otra parte, los programas de Arduino se ejecutan en un [Bucle Infinito](https://bucleinfinito.podbean.com/). Para leer el valor del sensor y saber si la rueda ha dado una vuelta o no, mi instrucción de lectura debería coincidir justo con el momento exacto en el que el imán pasa por debajo del sensor. De otra manera, no detectaría que el imán ha pasado.  
Por suerte hay una solución perfecta para este problema: [Interrupciones](https://www.luisllamas.es/que-son-y-como-usar-interrupciones-en-arduino/) a nivel de procesador.  
Estas interrupciones funcionan de manera tal que cuando el sensor detecta que el imán ha pasado cerca, pide al Arduino que deje todo lo que está haciendo y registre que la rueda ha dado una vuelta más.

### Magnetómetro

Para calcular el heading, o dirección respecto al norte magnético, utilicé un sensor llamado HMC5883L, que es compatible con Arduino y hace que su utilización sea muy fácil:

![](/images/HMC5883L.jpg)

Para que los valores entregados por el sensor sean correctos, hay que especificar la [declinación magnética](https://es.wikipedia.org/wiki/Declinaci%C3%B3n_magn%C3%A9tica) del lugar en que vivimos.

La declinación magnética en un punto dado de la Tierra es el ángulo comprendido entre el norte magnético local y el norte verdadero (o norte geográfico). En otras palabras, es la diferencia entre el norte geográfico y el indicado por una brújula (norte magnético).

Dado que el campo magnético de la tierra no es homogéneo, estos valores varían dependiendo del lugar en la tierra en el que te encuentres. Por ejemplo, el valor de declinación magnética de Madrid es **-0° 47'**

### Esquema de conexiones

Este es el diagrama que incluye todos los componentes necesarios y sus conexiones con el Arduino Nano:

![](/images/open_trip_diagram.png)
_Diagrama de conexiones_

### Primeras pruebas

Teniendo este prototipo ya estaba en condiciones de hacer las primeras pruebas:

![](/images/prueba.jpg)

Como se ve en la foto, el odómetro de la moto marca 18 kms, y mi tripmaster 17,3 kms. Nada que un pequeño ajuste de la circunferencia no pueda solucionar :)

### Carcasa

Para la carcasa del tripmaster diseñé en 3D un modelo específico en el que entran todos los componentes y lo fabriqué con mi [Impresora 3D](https://matto.io/armando-una-impresora-3d-parte-1/)

![](/images/caja.png)

Una vez impreso, este es el resultado:

![](/images/trip.jpg)

![](/images/trip2.jpg)

![](/images/trip3.jpg)

![](/images/trip4.jpg)

![](/images/trip5.jpg)

![](/images/trip6.jpg)

He utilizado el componente mágico (pistola de silicona) para sujetar varios de los componentes y pegar los conectores para que no se desconecten con las vibraciones.

### Mando

Para fabricar el mando seguí un proceso parecido al de la carcasa del tripmaster. Primero el modelado en 3D:

![](/images/botones.png)

Y finalmente la impresión, montaje y soldadura de sus componentes:

![](/images/botones2.jpg)

![](/images/botones3.jpg)

![](/images/botones4.jpg)

Nuevamente utilicé silicona para mantener los componentes en su sitio y evitar vibraciones, polvo y agua.

# Porta Roadbook

El paso siguiente fue fabricar el porta roadbook eléctrico. Para ello utilicé un porta roadbook manual que es muy barato, y por lo tanto muy MUY malo:

![](/images/porta-roadbook.jpg)

La ventaja que tiene es que ya viene la caja hecha, con su tapa transparente y un o-ring de goma para que no entre agua ni polvo.  
La desventaja es que los ejes son de plástico, y los "rodamientos" de goma. Funciona bien tal y como está durante un momento, pero los compañeros de ruta con los que participé de los rallies pueden testificar que después de algunos kilómetros, el polvo los traba y se hace casi imposible de utilizar.

### Ejes y rodamientos

Lo primero que hice fue cambiar los ejes plásticos por unos tubos de aluminio de 10mm y los rodamientos de goma por unos rodamientos de verdad de 10mm de interior y 12mm de exterior:

![](/images/rodamientos.jpg)

![](/images/eje.jpg)

![](/images/eje1.jpg)

Como se ve en las fotos, también hice un adaptador impreso en 3D para el eje de 5mm donde van las poleas.

Del kit original me quedé con las ruedas para girar el papel de forma manual y las adapté a los tubos de aluminio:

![](/images/eje2.jpg)

![](/images/eje3.jpg)

### Motor

El siguiente paso fue el motor. Para ello utilicé un motor DC de 6v que viene con una caja reductora incluida, lo que da un torque realmente sorprendente para el tamaño que tiene.

![](/images/motor-1.jpg)

Hice un hueco en la caja plástica para que salga su eje hacia afuera, y otros para sujetarlo con bridas:

![](/images/motor1.jpg)

![](/images/motor2.jpg)

![](/images/motor3.jpg)

![](/images/motor4.jpg)

La elección de un motor tan pequeño tiene su motivo, y es que al ir dentro de la caja, uno más grande interferiría con los rollos de papel. La alternativa es dejar el motor fuera como hacen muchos fabricantes, pero eso lo dejaría más expuesto y me complicaría la estructura.

### Poleas

Luego de mucho investigar y probar diferentes combinaciones, decidí que utilizaría poleas dentadas y una correa de goma para conectar los ejes con el motor.

![](/images/poleas.jpg)

Para la correa de goma, siendo imposible encontrar una que tenga la cantidad de dientes que necesitaba para mi proyecto (56 para ser exactos), tuve que fabricarla yo mismo. Para ello compré algunos metros de correa GT2 de 6mm y la corté de forma perpendicular, para poder unir las dos puntas y atravesar alfileres por sus dientes, formando una pequeña correa cerrada bastante resistente:

![](/images/correas.jpg)

El resultado fue mejor de lo que esperaba:

{% include embed/youtube.html id='i7cvsNiHA-k' %}

La mala noticia es que éste método tiene un problema en el que no había pensado antes, y es que en la medida en que el papel se va enrollando en un eje, éste va aumentando su tamaño, actuando como una polea y haciendo que la velocidad de giro de ambos ejes sea distinta:

![](/images/poleas2.gif)

Por la forma en la que funciona mi monstruosidad, ambos ejes se ven forzados a girar a la misma velocidad por la correa dentada.  
Después de mucho probar, descubrí que en el peor de los casos el papel se iría aflojando dentro del roadbook, causando que vaya bien hacia adelante, pero si quería volver el motor tenía que dar varias vueltas antes de que el papel comience a moverse en el sentido contrario.

Con las fechas de los rallies acercándose y muy poco tiempo disponible decidí dejarlo así por el momento. A pesar de no ser ideal, no representaba ningún problema grave y la funcionalidad, aunque no del todo eficiente, no se veía afectada.

# Fusión

Para unir el roadbook con el tripmaster y tener todo en una sola pieza, utilicé ángulos metálicos y remaches:

![](/images/r1.jpg)

![](/images/r2.jpg)

![](/images/r3.jpg)

![](/images/r4.jpg)

El conjunto quedó muy robusto y en una sola pieza. Justo lo que quería.

### Prueba piloto

Una vez terminado todo, sólo quedaba hacer una prueba final:

{% include embed/youtube.html id='r4cZ02zJaJY' %}

¡Nada mal!

# La hora de la verdad

La verdad es que no tenía ningún tipo de confianza en la abominación que había creado. Lo hice a las apuradas y aprendiendo en el camino. Imaginaba que funcionaría durante los 3 primeros kilómetros y fallaría de forma catastrófica.

![](/images/r5.jpg)

Algunos días y 2 rallies después, tengo que tragarme mis palabras. Tanto el roadbook como el tripmaster funcionaron de maravilla en todo momento.  
En el primero de los rallies, un compañero tuvo problemas con su roadbook profesional: tiraba del papel de la hoja de ruta y lo rompía. El mío funcionó hasta el final.  
En el segundo rally, otro de los chicos tuvo problemas con su tripmaster profesional: no contaba las distancias recorridas. El mío funcionó de forma sorprendentemente precisa hasta el final.

![](/images/r6.jpg)

### El resultado

Estos son los videos de los dos rallies. En ambos se ve el invento funcionando:

{% include embed/youtube.html id='b1rLu5wKscQ' %}
_Trip &amp; Track Cuenca 2017_

{% include embed/youtube.html id='U3ZXECd14i0' %}
_Desert Adventure Costa de Almería 2017_

# Conclusión

Entiendo que el coste de estas cosas suele ser alto porque lleva su investigación y desarrollo detrás, y que además tienen que ser de una gran calidad para soportar las condiciones a las que las sometemos, pero creo que el motivo principal de su elevado precio es la falta de competencia en el mercado. Son muy pocas las empresas que fabrican estos productos y por tanto cobran lo que quieran por ellos. Creo que es momento de entrar en el mercado ;)

Yo por mi parte ya estoy pensado en la versión 2, que incluirá varias mejoras en todos los niveles: Otra placa base, otro lenguaje de programación y otras pantallas. A ver si me da el tiempo...

# Recursos

Listado de piezas necesarias, sus precios y conexiones con pines de Arduino:  
[https://goo.gl/jzX4uB](https://goo.gl/jzX4uB)

Código fuente:  
[https://github.com/mattogodoy/open-trip](https://github.com/mattogodoy/open-trip)

Modelos 3D del mando y la carcasa:  
[https://github.com/mattogodoy/open-trip/tree/master/3d\_models](https://github.com/mattogodoy/open-trip/tree/master/3d_models)
