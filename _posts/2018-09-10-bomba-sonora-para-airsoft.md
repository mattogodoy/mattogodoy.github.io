---
author: matto
title: Bomba sonora para airsoft
date: 2018-09-10T22:50:00+01:00
image: 
  path: /assets/images/front2-1.jpg
categories:
tags:
- electronica
- programacion
- arduino
---

En mi [post anterior]({% post_url 2018-08-21-sistema-de-retroceso-para-realidad-virtual %}) comentaba que desde hace un tiempo tengo una nueva afición: el [Airsoft](https://es.wikipedia.org/wiki/Airsoft).

Todo comenzó de la manera más inocente posible. Estaba investigando un poco sobre mecanismos para simular el retroceso de un arma para juegos de realidad virtual. En el proceso me encontré con que muchas de las armas de airsoft (especialmente las pistolas) usan gas comprimido para accionar el mecanismo de recarga de munición, exactamente de la misma manera en que lo hace un arma real. Esto genera como resultado un golpe de retroceso que era lo que yo estaba intentando replicar.

Una cosa lleva a la otra, y terminé viendo videos de YouTube de [NOVRITSCH](https://www.youtube.com/user/novritsch), [Silo](https://www.youtube.com/user/SILOonPC) y [Dutch The Hooligan](https://www.youtube.com/channel/UCh68wF825IGaY9h7chPzHgQ) entre otros. Verlos jugar me generó muchísima curiosidad. Tanto que logré convencer a [un amigo](https://twitter.com/mormubis) de ir un fin de semana a probarlo. Han pasado ya 3 meses de ese día y no hemos dejado de ir ni un solo domingo.

Es una actividad muy interesante. Hago deporte sin darme cuenta y puedo disparar a la gente sin que la policía me pida explicaciones. Todas las armas son réplicas exactas de las reales y el equipamiento también se suele imitar de grupos especiales de asalto de todas partes del mundo.

![](/assets/images/airsoft.jpeg)
_Nuestro equipo. Yo soy el último de la derecha 👆🏻_

Durante las partidas hay muchos modos de juego. Uno de ellos es que uno de los bandos pone una bomba en un lugar especificado y tiene que protegerla por un tiempo determinado hasta que "explota". El otro bando tiene que llegar hasta ese lugar e intentar desactivar la bomba antes de que explote.

Esto se suele hacer con una bomba que no es mas que una caja aburrida e inanimada. Yo, habiendo sido un ávido jugador de Counter Strike hace muchos años, me imaginaba una bomba más parecida a ésta:

{% include embed/youtube.html id='-tcK_yQ8N_E' %}

## La bomba

La idea era hacer un proyecto pequeño, que no me llevara mucho tiempo y que pudiera aportar algo a las partidas.

Como base quería una bomba basada en Arduino que tuviese una pantalla, un teclado numérico, luces y un altavoz para dar el aviso de alarma o "explosión".

## Componentes

Estos son algunos de los componentes que utilicé:

![](/assets/images/components.jpg)
_Un Arduino Nano, una pantalla LCD de 16*2 caracteres, un teclado numérico, un buzzer y una caja plástica._

Mas adelante, a lo que se ve en la foto agregue dos LEDs RGB que obtuve de unas tiras que usé para otro proyecto (del que hablaré más adelante) y un interruptor con llave que tenía dando vueltas por ahí.

Como batería para todo el sistema he usado una LiPo de 3S que tenía de [un proyecto anterior](https://matto.io/armando-un-quadcopter/) y un regulador de voltaje para ajustarlo a 5 volts.

Con la ayuda de un taladro, un cutter y un poco de paciencia hice los huecos necesarios para todos los componentes.

![](/assets/images/inside.jpg)
_No es mi mejor trabajo, pero cumple su función._

El interior es muy poco atractivo, pero he pegado todos los componentes con silicona para que la bomba aguante golpes y caídas. Las partidas pueden ser muy intensas.

El resultado es éste:

![](/assets/images/front1.jpg)
_Disposición final de los componentes._

## Modos de juego

Mi idea era hacer que el código de la bomba fuese muy simple y con pocos modos de juego, pero que permita agregar nuevos modos si se me ocurren más adelante.

Por ahora los modos de los que dispone son:

- **Sólo código:** Un equipo activa la bomba manteniendo presionado **#** durante un tiempo determinado. El equipo contrario debe poner un código usando el teclado numérico y presionar **#** para desactivar la bomba.
- **Sólo botón:** Un equipo activa la bomba manteniendo presionado **#** durante un tiempo determinado. El equipo contrario debe mantener presionado **#** durante un tiempo determinado para desactivar la bomba.
- **Código + Botón:** Un equipo activa la bomba manteniendo presionado **#** durante un tiempo determinado. El equipo contrario debe poner un código usando el teclado numérico luego mantener presionado **#** durante un tiempo determinado para desactivar la bomba.

Los modos son bastante simples porque siempre es complicado explicar las reglas del juego, y a eso sumar el funcionamiento de de la bomba. Especialmente cuando hay mucha gente (las partidas suelen ser de 20 contra 2o personas aproximadamente).

## Configuración

La bomba cuenta con varios parámetros configurables:

- Modo de juego
- Tiempo de armado
- Tiempo de desarmado
- Código de desarmado
- Intentos fallidos (códigos incorrectos)
- Duración de la partida

Estos valores se establecen antes de empezar la partida usando el teclado numérico. La tecla **\*** borra los valores para corregirlos y la tecla **#** funciona como "enter" para guardarlos.

Una vez configurada los jugadores no necesitan hacer nada aparte de activarla o desactivarla. La idea es que sea lo más fácil de usar posible para los participantes de la partida.

## Funcionamiento

Aquí se puede ver el proceso de configuración, armado y desarmado de la bomba:

{% include embed/youtube.html id='O8ZCUXwC3zo' %}
_Configuración y uso de la bomba_

Como se puede ver en el video, si el jugador suelta el botón antes de que se cumpla el tiempo de armado/desarmado la cuenta empieza nuevamente desde cero, por lo que deberá mantener presionado el botón de manera ininterrumpida durante el tiempo especificado.

La llave permite que la organización pueda encender la bomba y que no pueda ser apagada por los usuarios.

## Conexiones

Las conexiones entre el Arduino Nano y los distintos componentes son las siguientes:

```
Arduino Pin Module - Pin
----------- ------------

5V LCD - 2
5V LCD - 15
5V LEDs

GND LCD - 1
GND LCD - 3
GND LCD - 5
GND LCD - 16
GND Buzzer - Negative
GND LEDs

D2 Keypad - 1
D3 Keypad - 2
D4 Keypad - 3
D5 Keypad - 4
D6 Keypad - 5
D7 LCD - 4
D8 LCD - 6
D9 LCD - 11
D10 LCD - 12
D11 LCD - 13
D12 LCD - 14

A0 (D14) Keypad - 6
A1 (D15) Keypad - 7
A2 (D16) Buzzer - Positive
A3 (D17) LEDs
```

## Código fuente

El código es bastante simple y está comentado en su mayoría:

[https://github.com/mattogodoy/airsoft-bomb](https://github.com/mattogodoy/airsoft-bomb)

## Pruebas

Hace algunos días fue el aniversario de _La Atalaya_, el campo al que solemos ir a jugar. Ese día se hizo una partida nocturna en la que tuve la suerte de probar la bomba.

La verdad es que funcionó perfectamente, y al haber sido de noche las luces se veían mucho mejor. Realmente fue una sorpresa positiva. Estas cosas no suelen funcionar bien a la primera.

Personalmente creo que aporta bastante a la partida. Se podría complementar con cosas como tener que buscar el código en algún lugar para luego poder desactivar la bomba que está en otro sitio.

## Mejoras

Finalmente agregué un poco de cinta amarilla alrededor de la caja para darle más visibilidad:

![](/assets/images/front2.jpg)
_Bomba terminada_

Otra mejora importante que tengo pendiente es poner un botón grande y con luz para activar y desactivar la bomba. Actualmente eso se hace con la tecla **#** del teclado numérico, pero es muy pequeña y no se ve en la oscuridad además de ser poco intuitivo.

El botón ya está pedido y viene en camino. La idea es instalarlo en la parte inferior derecha de la bomba para que quede simétrico con el buzzer. Una vez llegue y lo instale actualizaré esta publicación.

<p style="text-align: center; font-size: 80px">💣</p>
