---
layout: post
title: Head tracker para videojuegos
date: '2016-10-12 19:39:00'
tags:
- electronica
- video-juegos
---

Con toda esta moda de la realidad virtual están apareciendo montones de ideas innovadoras para hacer que la experiencia sea lo más inmersiva posible. Una de ellas es el "Head tracking", o "seguimiento de cabeza" en español.

# ¿Qué es un Head Tracker?

Un poco antes de la salida de las nuevas [Oculus Rift](https://www3.oculus.com/en-us/rift/) o las [HTC Vive](https://www.vive.com/eu/product/), lo más cercano a esto era un dispositivo simple basado en Arduino (cómo no) que al sujetarlo a los auriculares, y basándose en mediciones tomadas por [acelerómetros](https://es.wikipedia.org/wiki/Aceler%C3%B3metro), [giróscopos](https://es.wikipedia.org/wiki/Gir%C3%B3scopo) y [magnetómetros](https://es.wikipedia.org/wiki/Magnet%C3%B3metro) es capaz de saber en qué posicion se encuentra nuestra cabeza en todo momento.

Usando esa información podemos indicar a algún juego en concreto hacia dónde debería mirar nuestro jugador.

Como siempre, un video dice mas que mil palabras:

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/GazOjrQ30fo?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

El del video soy yo jugando al [Elite Dangerous](https://www.elitedangerous.com/), y el head tracker es el circuito impreso que se ve al costado izquierdo de mis auriculares.

Al mover la cabeza como si estuviera mirando, el personaje del juego mira en la misma dirección en la que yo lo hago.

# Construcción

Hay muchas variantes de head trackers, pero hay una que me llamó la atención por ser completamente open hardware y open software: **[EdTracker](http://www.edtracker.org.uk/)**.

### Componentes

La lista de componentes es bastante simple:

- Procesador: [Arduino Micro](https://www.arduino.cc/en/Main/ArduinoBoardMicro)
<figure class="kg-image-card"><img src="/content/images/2018/08/arduino.jpg" class="kg-image"></figure>
- IMU (Unidad de Medición Inercial): Aquí tenemos dos posibilidades. Hay dos tipos de sensores que son compatibles; el **[MPU-6050](http://playground.arduino.cc/Main/MPU-6050)** que trae acelerómetro y giróscopo, o el **[MPU-9250](https://www.sparkfun.com/products/13762)** que es un poco más caro pero trae también un magnetómetro (brújula digital) que permite evitar un efecto no deseado llamado **drifting** (ya hablaré de esto más adelante). &nbsp;
<figure class="kg-image-card"><img src="/content/images/2018/08/accelerometer.jpg" class="kg-image"></figure>
- Un [botón](https://www.sparkfun.com/products/9190). 
<figure class="kg-image-card"><img src="/content/images/2018/08/button.jpg" class="kg-image"></figure>
- Un circuito impreso sobre el que montar todos los componentes. Aquí de nuevo contamos con 2 opciones; la primera es comprar la [placa con su correspondiente circuito](http://www.edtracker.co.uk/shop/my-basket/edtracker-diy-pcb) a los chicos de EdTracker. La segunda es hacer el circuito nosotros mismos usando una [placa de prototipado](https://www.sparkfun.com/products/12702) y hacer las conexiones entre componentes. Yo opté por la segunda, porque aunque queda más desprolijo, es algo que me gusta hacer. 
<figure class="kg-image-card"><img src="/content/images/2018/08/protoboard.jpg" class="kg-image"></figure>

### El circuito

El proceso de creación de la placa es bastante sencillo. Simplemente tenemos que hacer las conexiones entre los pines de los distintos componentes de la siguiente manera:

<figure class="kg-image-card"><img src="/content/images/2018/08/pinout.png" class="kg-image"></figure>

El diagrama sería algo así:

<figure class="kg-image-card"><img src="/content/images/2018/08/circuit-1.png" class="kg-image"></figure>

Y puesto en la placa de prototipado de la manera más compacta posible se podría lograr algo como esto:

<figure class="kg-image-card"><img src="/content/images/2018/08/circuit2.png" class="kg-image"><figcaption>Nótese que algunos de los cables pasan de un lado de la placa al otro.</figcaption></figure>

Lo que yo hice fue agregar unos zócalos que me permiten poner y quitar tanto el Arduino como el sensor cuando yo quiera, por si pienso usarlos para otro proyecto en un futuro.

El resultado es este:

<figure class="kg-image-card"><img src="/content/images/2018/08/headtracker1.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2018/08/headtracker2.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2018/08/headtracker3.jpg" class="kg-image"></figure>

Aquí destaca el _para nada estético pero práctico_ sistema de sujeción: Un broche para ropa :)  
No es muy elegante, pero cumple su función.

<figure class="kg-image-card"><img src="/content/images/2018/08/headtracker4.jpg" class="kg-image"></figure>

Hacer el circuito no presenta ninguna complicación. Simplemente un par de soldaduras siguiendo los diagramas y ya lo tenemos funcionando.

El botón sirve para "resetear" la vista. Es decir que una vez estemos dentro de un juego, debemos poner nuestra cabeza en una posición centrada mirando a la pantalla y presionar el botón. En ese momento el head tracker tomará esa posición como la inicial y pasará a ser el centro de todos los ejes (0, 0, 0).

### Firmware

Para que el sistema funcione, necesitamos flashear el firmware del head tracker dentro del Arduino.

Tenemos 2 formas de hacerlo: Por medio del IDE de Arduino con [estas librerías](https://github.com/brumster/EDTracker2_ArduinoHardware) y [éste código fuente](https://github.com/brumster/EDTracker2), o con la ayuda de una interfaz gráfica creada por los chicos de EdTracker.

La segunda opción es la que yo recomiendo si valoras tu tiempo y tus cabales.

Para ello tendremos que descargar el GUI desde la página de descargas de EdTracker: [http://www.edtracker.org.uk/index.php/downloads](http://www.edtracker.org.uk/index.php/downloads)

Este mismo GUI es el que usaremos para la calibración más adelante, y es necesario para hacer creer a los juegos que el Arduino es un joystick y de esa manera controlar la vista del jugador.

Allí también podemos encontrar los drivers de Arduino, que son indispensables para que el ordenador pueda comunicarse con la placa sin problemas.

Una vez abierta la interfaz gráfica, vemos algo así:

<figure class="kg-image-card"><img src="/content/images/2018/08/config.jpg" class="kg-image"></figure>

Si tenemos los drivers de Arduino correctamente instalados, la aplicación debería detectar nuestro EdTracker casi al momento.

### Calibrado

Como no podía ser de otra manera, este bicho tiene que pasar por un proceso de calibrado. Afortunadamente es bastante simple y gracias al software que descargamos en el paso anterior el proceso es muy rápido.

La calibración es necesaria porque muchas veces el ruido generado por los sensores y la precisión relativamente baja de los mismos generan errores en la posición del mismo. Tenemos que tener en cuenta que es un sensor MUY barato, por lo que no podemos exigirle demasiado. Este efecto de desviación constante se llama " **drift**", y si no lo corregimos, es como si estuviéramos moviendo la cabeza en una dirección de manera constante.

Otra cosa que entra en juego a la hora de calibrar el sensor es la temperatura del mismo. Por lo visto las variaciones de temperatura afectan a las mediciones, por lo que lo ideal es esperar a que el sensor tome una temperatura ambiente y recién ahí aplicar las correcciones. El software nos da esta información en la parte superior derecha. Cuando la temperatura varía, la etiqueta _ **temperature** _ tiene un color rojo, indicando que no es un buen momento para hacer la calibración. Lo que tenemos que hacer es esperar un rato (normalmente es poco tiempo) hasta que las temperaturas se estabilicen y la etiqueta se ponga de color verde. En ese momento hacemos click en el botón _ **Reset View** _ y el software compensará automágicamente por el error inducido del sensor, manteniendo así la posición de manera correcta a lo largo del tiempo.

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/RToMDDz6K3A?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

Como se ve en el video, los movimientos son exponenciales. Esto es a propósito para no tener que mover la cabeza mucho, hasta el punto de dejar de ver la pantalla. Esto es configurable independientemente para cada eje y lo que recomiendo es que busques los valores que te parezcan cómodos.

### Conclusión

Un proyecto fácil, rápido y barato que puede hacer que los videojuegos sean todavía más divertidos.

¿Qué estas esperando?
