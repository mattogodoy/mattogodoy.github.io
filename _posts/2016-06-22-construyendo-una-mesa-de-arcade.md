---
author: matto
title: Construyendo una mesa de arcade
date: 2016-06-22T18:57:00+01:00
image: 
  path: /assets/images/arcade28-1.jpg
categories:
tags:
- electronica
- video-juegos
---

Dando vueltas por internet me encontré con un proyecto que consta de montar una máquina arcade de videojuegos retro en una de las famosas mesitas Lack de IKEA (creo que todo el mundo tiene una) y decidí construirla.  
Es increíble la cantidad de cosas que hace la gente con esta mesita. Por ejemplo, el LackRack: [https://wiki.eth0.nl/index.php/LackRack](https://wiki.eth0.nl/index.php/LackRack)

## Materiales

Lo primero que hice fue averiguar dónde comprar los joysticks y botones, que desde mi punto de vista son lo más importante que tiene la máquina. Di con una tienda que se llama Arcade Madrid ([https://www.arcademadrid.com](https://www.arcademadrid.com)), donde compré un kit que trae todo lo necesario:

- Dos mandos
- 6 botones por jugador
- 2 botones adicionales para servicio
- Botón de 1 player y 2 player
- Relays de los botones
- Cableado de señal y masa
- Interface arcade USB de dos jugadores
- Cable USB

Todo por **59€**. Bien, no?

La mesita cuesta **10€** en IKEA y viene de varios colores. Yo elegí el negro.

![](/assets/images/lack.jpg)

Para la pantalla, pasé por una tienda de segunda mano y compré un monitor LCD Phillips de 17” por algo de **15€**

![](/assets/images/mon_pic.jpg)

Para la parte del hardware de la máquina, pensé en utilizar una Raspberry Pi, pero inclusive el último modelo no es lo suficientemente potente como para correr algunos emuladores un poco mas exigentes.  
Tenía una netbook dando vueltas por casa que no estaba usando, y me vino de primera para el proyecto. No es muy potente, pero mueve los emuladores de distintas consolas sin problemas.

## Software

A la hora de instalar el software y los juegos, me encontré con que el proceso es mucho más difícil de lo que pensaba. Esto se debe a que cada juego salió para una consola, y para cada consola hay que descargar y configurar un «emulador» diferente. Un emulador es un software que imita las condiciones de hardware sobre las que funcionaban esos juegos en su época para poder ejecutarlos. Existen muchos emuladores de cada consola, por lo que hay que investigar y probar el que mas te guste o mejor te funcione.

Por otra parte, para tener una interfaz gráfica con una lista ordenada y bien presentada de todos los juegos, hay que instalar un «launcher». El launcher es un software que muestra todos los juegos que tengas instalados categorizados por consola y que lanza el emulador correspondiente a cada juego.  
Existen muchos launchers, siendo [HyperSpin](https://www.hyperspin-fe.com/) el más famoso, pero también uno de los más complicados de configurar.

{% include embed/youtube.html id='xYmOI9EbBMM?feature=oembed' %}
_Así se ve HyperSpin una vez configurado completamente_

Cuando digo complicado me refiero a que todas las imágenes, sonidos, videos, logos, etc. que se ven por cada juego, deben ser descargadas, renombradas y ubicadas en directorios específicos por cada uno de los juegos que tengas. Y estamos hablando literalmente de miles de juegos...

Luego de investigar bastante y de probar varios launchers, di con [LaunchBox](https://www.launchbox-app.com). Su ventaja es que da muchas facilidades a la hora de organizar los juegos, y se encarga de descargar todas las imágenes automágicamente. Desde mi punto de vista es el que menos tiempo de configuración lleva, y además funciona genial.

{% include embed/youtube.html id='AeGMjt9FJ6M' %}
_Así se ve LaunchBox, en su modo BigBox_

Además su desarrollador mantiene actualizaciones constantes y hace sesiones en vivo por [YouTube](https://www.youtube.com/channel/UCSIht6UXIEXIgz4eXAEShxA) en las que muestra cómo lo desarrolla.

![](/assets/images/launchbox.jpg)
_LaunchBox instalado en la Netbook_

## Construcción

Lo primero que hice fue desarmar el monitor, para quitarle el pie y todos los plásticos que ocupan mucho espacio, y como va a ir dentro de la mesa no los vamos a necesitar.

![](/assets/images/arcade1.jpg)![](/assets/images/arcade2.jpg)![](/assets/images/arcade3.jpg)

Lo siguiente es decidir dónde van a ir las cosas y marcar la mesa para cortarla.

![](/assets/images/arcade4.jpg)

Para la distribución de los botones busqué un poco por internet, y di con ésta que es la que más me gustó (y además creo que es la más clásica):

![](/assets/images/button_layout.jpg)![](/assets/images/arcade5.jpg)![](/assets/images/arcade6.jpg)

Una vez decidida la posición de cada uno de los componentes, empezamos a cortar.

![](/assets/images/arcade7.jpg)![](/assets/images/arcade8.jpg)![](/assets/images/arcade9.jpg)

Como se ve en las fotos, la mesa es tan mierda mala que viene rellena de una especie de panal de cartón. El hueco en la parte de atrás de para poder acceder a los joysticks y los botones desde abajo y poder cablearlos.

Para los huecos de los botones usé un taladro con unas brocas de 21mm, el diámetro exacto de los botones.

![](/assets/images/arcade10.jpg)![](/assets/images/arcade11.jpg)

En esta última imagen se puede ver que hice dos huecos en el frente de la mesita. Allí es donde irán los botones de _Player 1_ y _Player 2_.

Para proteger la pantalla y la propia mesa, lo que hice fue usar un metacrilato transparente de 3mm por encima. Para ello tuve que hacer los agujeros correspondientes para los joysticks, los botones y los tornillos que lo sostendrán, no sin antes hacer una prueba en un pedazo de metacrilato sobrante para asegurarme de que no iba a arruinar la pieza principal (que no tenía otra!).

![](/assets/images/arcade12.jpg)

Viendo que la prueba salió aceptablemente bien, seguí con los agujeros reales.

![](/assets/images/arcade13.jpg)![](/assets/images/arcade14.jpg)

Usando la misma broca que para los huecos de la madera logré hacer los de los botones. Para mi agradable sorpresa, el joystick no necesita más espacio que el de un botón para funcionar correctamente, así que también usé la misma para eso.

En el proceso arruiné la batería de mi taladro, y como estaba inspirado y no quería esperar un par de días a que llegue el repuesto de Amazon, decidí utilizar una de las baterías del [quadcopter]({% post_url 2015-12-14-armando-un-quadcopter %}) y conectarla de manera más que precaria al taladro.

![](/assets/images/arcade15.jpg)

El resultado fue mejor de lo que esperaba y logré terminar de taladrar todo :)

Con todo eso en su lugar, empecé a meter componentes dentro de la mesa. Lo primero fue el monitor, que encajó a presión por el hueco que había hecho en la parte inferior.

![](/assets/images/arcade16.jpg)

También instalé los botones y los joysticks para comprobar que todo estaba bien.

![](/assets/images/arcade17.jpg)

Nada mal. Ahora a poner el metacrilato y empezar a cablear!

![](/assets/images/arcade18.jpg)![](/assets/images/arcade19.jpg)

Todos los cables de los botones van a una controladora USB que venía con el kit, y que hace creer a la netbook que se trata de un joystick USB común y silvestre.

Haciendo algunas pruebas me di cuenta de que el monitor, al ser LCD, tiene un ángulo de visión reducido, y que mirándolo desde la posición en la que normalmente se jugaría, se veía mal.

![](/assets/images/viewing-angles.jpg)

También me di cuenta de que mirándolo desde arriba (el lado contrario al de los controles) se veía mucho mejor, así que la solución fue dar vuelta el monitor 180º dentro de la mesa. Para ello tuve que hacer un hueco más grande en la parte de abajo, y ya que estaba, agregué unas bisagras para que en el futuro si tengo que quitar el monitor no sea un dolor de pelotas cabeza.

![](/assets/images/arcade20.jpg)![](/assets/images/arcade21.jpg)

Y con esto, todo solucionado. Bueno, «casi» todo. Los controles del monitor ahora me quedaban del otro lado, así que no me quedó otra que cortar el cable y hacer una extensión.

![](/assets/images/arcade22.jpg)![](/assets/images/arcade23.jpg)![](/assets/images/arcade24.jpg)

El siguiente paso fue instalar una especie de bandeja de madera en la parte inferior de la mesa sobre la que irá la netbook.

![](/assets/images/arcade25.jpg)

Además, una regleta de enchufes sujetada a una de las patas con bridas. Allí van enchufadas la netbook, el monitor y cualquier cosa que quiera agregar más adelante. Como ventaja adicional, tiene un switch que corta la electricidad de todo lo que tenga enchufado.

![](/assets/images/arcade26.jpg)

Esto es lo que quedó después de tanta carnicería:

![](/assets/images/arcade27.jpg)![](/assets/images/arcade28.jpg)![](/assets/images/arcade29.jpg)

Para facilitar un poco las cosas, lo que hice fue configurar Windows para que al iniciar ejecute LaunchBox directamente, y así no necesito teclado ni ratón. Se controla todo con el joystick y los botones.

Y eso es todo! Ahora sólo queda jugar.
