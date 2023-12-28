---
author: matto
title: Armando un Quadcopter
date: 2015-12-14T19:32:00+01:00
image: 
  path: /images/uav-v2-1.jpg
categories:
tags:
- electronica
- robotica
---

Desde hace ya tiempo estoy interesado en el creciente desarrollo de los «drones». Tanto, que hace poco he finalizado un [_Máster en Vehículos Aéreos No Tripulados_](https://ixtitute.com/).

Lo que me motivó a hacer el máster fue un proyecto personal que veremos hoy: El armado de un drone multirotor. Aquí quiero hacer una aclaración: Un «drone» **no es lo mismo** que un juguete a radiocontrol. Un drone es un robot, al que asignamos una misión y debe cumplirla de manera **autónoma**. El tomará las medidas correctoras necesarias para mantenerse estable y en el rumbo indicado. Cumplirá con la misión por sí mismo sin ayuda de un ser humano.  
Lo aclaro porque hoy en día la gente llama _drone_ a cualquier cosa que vuela.

Para lograrlo se basa en una unidad central de procesamiento llamada **autopiloto** , que valiéndose de varios sensores como [giróscopos](https://es.wikipedia.org/wiki/Gir%C3%B3scopo), [acelerómetros](https://5hertz.com/tutoriales/?p=228), [magentómetros](https://es.wikipedia.org/wiki/Magnet%C3%B3metro), [barómetros](https://es.wikipedia.org/wiki/Bar%C3%B3metro), [GPS](https://gutovnik.com/como_func_sist_gps.htm), [tubos de Pitot](https://abcienciade.wordpress.com/2009/06/19/tubo-de-pitot-en-los-aviones/) y [sensores de ultrasonido](https://www.superrobotica.com/S320110.htm) entre otros, tiene la capacidad de evaluar su posición y estado y actuar en consecuencia, formando un lazo cerrado:

![](/images/lazo_cerrado.jpg)

## Lista de componentes

Una de las partes que más me costó a la hora de armar mi quadcopter fue encontrar un listado completo de piezas necesarias.

El motivo es que _todo depende de todo_. Dependerá del tipo y la finalidad del quadcopter que vamos a fabricar la cantidad y el tipo de motores que llevará, y dependerá del tipo de motor que usemos las hélices que debemos colocar. Además, dependerá de esa combinación de motor / hélice que elijamos la batería que debamos utilizar.  
Por otra parte, la capacidad de la batería es nuevamente un dilema, dado que a mayor capacidad, más tamaño y peso tiene la batería, por tanto, más gastan los motores. Debemos encontrar un equilibrio que nos sirva para cada caso.

De todo ello dependerá también la carga de pago que podamos llevar encima en base a cuánto peso pueda levantar nuestro bicho. Entendemos por carga de pago a todo equipo que no sea necesario para el funcionamiento de la aeronave, pero que cumple una función específica para lo que fue diseñado el drone. Por ejemplo, para el caso de un drone de vigilancia, la carga de pago sería una cámara.

Por otro lado, a pesar de que hay muchísima información sobre el armado de multirotores en internet, cada persona tiene sus preferencias y opiniones por lo que es difícil encontrar algo concreto.

Lo que yo haré es dar el listado de piezas que he utilizado para el mío:

- **Frame:** HJ X-Mode MWC Alien
- **Controladora de vuelo (inicial):** Multiwii Pro (descontinuada)
- **Controladora de vuelo (actual):** KK 2.1.5
- **Motores:** Turnigy D2830-11 1000kv Brushless Motor
- **Hélices** Slow Fly Electric Prop 1045R
- **Controladores de velocidad:** Turnigy Plush 30amp Speed Controller
- **Batería (inicial):** Turnigy 2650mAh 3S 30C Lipo Pack
- **Batería (actual):** Dynamite Reaction 11.1V 5000mAh 3S 30C LiPo
- **Alarma de batería baja:** 2-in-1 1~8S Lipo Battery Low Voltage Buzzer Alarm
- **Módulo Bluetooth:** JY-MCU Bluetooth Wireless Serial Port Module for Arduino
- **Sensor ultrasónico:** HC-SR04 Ultrasonic Sensor Distance Measuring Module
- **Radio Control:** Turnigy 9X (Mode 2)
- **Kit FPV:** FatShark Teleporter V3 RTF 5.8G

Compré la mayoría de estos componentes en [HobbyKing](https://www.hobbyking.com/), algunos en [Dealextreme](https://www.dx.com/) y solo unos pocos en una tienda de hobbies de Madrid.  
Inicialmente había puesto los enlaces a cada uno de los componentes, pero mientras escribía este post, varios de ellos dejaron de funcionar, por lo que dejo únicamente sus nombres.

> **NOTA:** Han pasado casi 2 años desde que hice este proyecto. Ten en cuenta que estas tecnologías avanzan excesivamente rápido, y es posible que varios de los componentes ya estén casi obsoletos, o que tengan mejores alternativas disponibles al día de la fecha.

### Detalle de los componentes

Veremos detalles de algunos componentes que he utilizado. Con el tiempo he ido cambiando algunos por cuestiones de practicidad o destrucción.

#### Frame

Llamamos «frame» a la estructura básica o chasis donde van montados todos los equipos.

El frame que yo utilizo es una copia del [TBS Discovery](https://team-blacksheep.com/products/product:98) y se llama **HJ X-Mode MWC Alien**

![](/images/frame.jpg)

El tamaño que elegí es de **450**. Ese número define la distancia que hay en diagonal entre los motores:

![](/images/f450-quadcopter-frame-3.jpg)

Armado se ve así:

![](/images/frame2.jpg)

La ventaja de este frame es que tiene bastante espacio para equipos como una cámara GoPro y un transmisor de video para [FPV](https://desdeelairerc.es/es/content/12-que-es-fpv).

#### Brazos

Los brazos son los encargados de sujetar los motores al frame, y son los primeros en recibir el golpe en caso de un accidente, por lo que tienen que ser muy resistentes.

Quise experimentar utilizando unos que [imprimí en 3D]({% post_url 2015-02-03-armando-una-impresora-3d-parte-1 %}):

![](/images/brazo.jpg)

Lo malo es que no tienen la misma resistencia que los de plástico inyectado, y se rompen muy fácilmente. Duraron poco.

![](/images/brazo2.jpg)

Los que vienen con el kit del frame se veían bien, pero al primer golpe fuerte se terminaron rompiendo.

Finalmente terminé comprando unos de la marca DJI que son increíblemente resistentes y no me costaron caros:

![](/images/brazos.jpg)

Estos aguantan cualquier cosa.

#### Controladora

La parte más importante del quadcopter es el «Flight Controller», o controladora de vuelo. Es el cerebro de la aeronave y es la que efectúa todos los cálculos para mantenerla en una posición estable.

Su trabajo principal se basa en recibir las señales que le enviamos desde nuestra radio y transformarlas en salidas que van hacia los motores de una manera que asegure un vuelo estable (siempre que sea eso lo que queremos).  
Para lograrlo, la controladora trae de base giróscopos y acelerómetros, que le permiten conocer su [actitud](https://es.wikipedia.org/wiki/Indicador_de_actitud) en todo momento y actuar en consecuencia para mantener un vuelo estable.

Algunas controladoras de vuelo traen funciones extra basándose en sensores especiales como GPS, barómetros y sensores de ultrasonido que permiten al controlador cumplir misiones de vuelo basadas en puntos marcados en un mapa, o conocer su altura exacta usando la presión atmosférica como referencia.

##### Multiwii Pro

Inicialmente utilicé una «Multiwii Pro», que es una copia del famoso [Ardupilot Mega](https://copter.ardupilot.com/wiki/common-autopilots/common-apm25-and-26-overview/). Al ser una copia, cuesta bastante más barato e inclusive trae el módulo GPS incluído en el kit:

![](/images/multiwii.jpg)

La verdad es que la calidad de las copias es siempre inferior a los productos originales. Esto se nota no sólo en la calidad de la construcción y los componentes, sino también a la hora de configurarlo. Las copias pueden dar algunos dolores de cabeza que normalmente los originales no causan.

![](/images/gps.jpg)
_Módulo receptor de señal GPS_

La ventaja de esta controladora es que está basada en Arduino (ya todos saben que soy fan) y nos permite instalarle el firmware que más se ajuste a nuestras necesidades.  
Para este caso, los más fuertes son dos: [Multiwii](https://code.google.com/archive/p/multiwii/) y [MegaPirate NG](https://www.megapirateng.com/). Ambos de código abierto.

Yo me decanté por la segunda porque la cantidad de opciones que aporta MegaPirate NG es bastante superior a Multiwii.

Otra ventaja de usar una controladora basada en Arduino y un firmware de código abierto es que me permite ver el código fuente, entenderlo, y si lo necesito, inclusive modificarlo para adaptarlo a lo que sea que quiera hacer.  
Además viene con todas las entradas y salidas analógicas y digitales que trae el [Arduino Mega](https://www.arduino.cc/en/Main/arduinoBoardMega), por lo que permite conectar sensores fácilmente.

Aprovechando esto, yo le hice un par de modificaciones:

Instalé un módulo Bluetooth **JY-MCU** que me permitía, por ejemplo, cambiar todos los parámetros de configuración y ver la posición y actitud del quadcopter desde mi móvil de manera inalámbrica:

![](/images/bluetooth.jpg)

Por otro lado, a pesar de que la Multiwii Pro trae un sensor barométrico para calcular en todo momento la altura de la aeronave, la presión atmosférica como referencia de altura no nos permite una gran resolución ni precisión, por lo que instalé también un sensor ultrasónico **HC-SR04** :

![](/images/ultrasound.jpg)

Y aquí ya instalado en el frame:

![](/images/ultrasound2.jpg)

La ventaja de este sensor es que tiene muy buena resolución para medir distancias de hasta 4 metros, entonces para alturas inferiores a 4 metros, el quadcopter utiliza como referencia el sensor ultrasónico. Para alturas mayores utiliza directamente el sensor barométrico.

{% include embed/youtube.html id='ThoqL8WakUw' %}

Esto ayuda al quadcopter a despegar y aterrizar automáticamente, y a mantener siempre la misma altura en su modo de vuelo **ALT HOLD**. Dependiendo del firmware instalado, habrá también otros modos que permitirán vuelos más estables, acrobáticos, etc.

Esta controladora, con la cantidad de opciones y de sensores que tiene, sirve perfectamente para convertir el quadcopter en un **Drone**. Nos permite cargar misiones basadas en puntos de interés puestos en un mapa que la aeronave irá recorriendo en el orden, tiempo, velocidad y altura especificados. Todo sin que intervenga ninguna persona durante el proceso.

El problema de esta placa es que a veces tantas opciones pueden convertirse en una complicación. Sobre todo a la hora de salir a hacer un vuelo corto. Demasiados modos de vuelo, demasiadas variables, demasiadas cosas que pueden salir mal.

Es por esto que en pos de la simplicidad me decanté por una placa mucho mas sencilla, sin tanta historia, fácil de configurar y de volar:

##### KK 2.15

Esta placa no dispone de sensores como GPS, barómetro, ultrasonido, Bluetooth, etc. Simplemente acelerómetros y giróscopos.

![](/images/kk215.jpg)

Está pensada únicamente para vuelo manual, por lo que no dispone de ningún modo de vuelo autónomo.

La configuración se hace de manera muy sencilla utilizando sólo la pantalla LCD y los botones que trae incorporados:

![](/images/maxresdefault-1.jpg)

Esta placa es ideal para salir a volar rápido y sin complicaciones, pero no dispone de las opciones geniales que trae la Multiwii Pro.

Cada una es ideal para cada situación específica. Actualmente, la **KK 2.1.5** es la estoy utilizando en mi quadcopter.

##### Configuración de la controladora de vuelo

La configuración de la **Multiwii Pro** no es tan sencilla dada la cantidad de parámetros disponibles, pero a su vez, eso es lo que la convierte en una controladora muy versátil y adaptable a cualquier misión.

{% include embed/youtube.html id='Ok42NJXCp2g' %}

Para configurarla se conecta por medio de un cable USB, un adaptador bluetooth o un módulo de telemetría a un ordenador. El software que se usa para la configuración dependerá del firmware instalado en la controladora.

{% include embed/youtube.html id='smH35BnKmrY' %}
_Mis disculpas por el video vertical. Yo también lo odio._

Para el caso de la **KK 2.1.5** la configuración es mucho más sencilla porque se hace directamente desde la pantalla LCD que trae incorporada, y la simplicidad de la controladora hace que los parámetros a configurar no sean demasiados.

No entraré en los detalles de configuración porque este post se convertiría en interminable.

Si, ya sé que llegaste a este post buscando justamente eso, pero es un tema que está en constante y rápida evolución, y cualquier cosa que escriba quedará obsoleta rápidamente.

Esto es así hasta tal punto que la **Multiwii Pro** que describo en este post ya está descontinuada al igual que sus dos alternativas de firmware, cuando no ha pasado más de dos años desde que empecé con el proyecto del quadcopter.

Las nuevas controladoras vienen con procesadores de 32 bits que permiten hacer cálculos mucho mas rápido y dan un nivel de respuesta mucho mejor.

Hay montones de tutoriales y muchísima información sobre este tema en Internet, pero mi recomendación es que entiendas cómo funciona y te hagas amigo del sistema de control PID:

{% include embed/youtube.html id='UR0hOmjaHp0' %}

El modelo PID se utiliza muchísimo tanto en robótica como en sistemas industriales de todo tipo.

Para el caso de los quadcopter, hay que configurar los parámetros _Kp_, _Ki_ y _Kd_ por medio de prueba y error hasta lograr un vuelo estable, pero ágil.

#### Motores

La elección de los motores siempre es difícil. Hay que encontrar un balance entre precio y calidad. Además, hay que tener en cuenta el tipo de multicóptero en el que se van a utilizar.

Para ello, hay que entender cómo se calcula la potencia de los motores brushless (sin escobillas). Esto se mide en **kV** (kilo Voltios), que son las revoluciones por minuto a las que gira el motor por cada Voltio que recibe. Una explicación un poco más extendida [aquí](https://rc.lapipadelindio.com/general/significado-kilo-volt-motor-brushless).

Por otro lado, se clasifican también en **Inrunner** (la carcaza con los imanes queda fija y lo que gira es el eje junto con las bobinas) y **Outrunner** (lo que gira es la carcaza con los imanes y las bobinas quedan fijas). Estos últimos son los más comunes en multirotores.

En mi caso utilicé unos **Turnigy D2830/11 de 1000 kV** :

![](/images/motor-uav.jpg)

Los motores traen 3 cables, los cuales reciben corriente en una secuencia predeterminada, con la cuál se puede regular la dirección y la velocidad de giro.  
Para ello utilizamos variadores, también llamados «Controladores de velocidad».

#### Hélices

Una vez elegido el motor, normalmente en las características del mismo se especifican las hélices recomendadas.

Inicialmente utilizaba hélices plásticas de 10x45:

![](/images/helices.jpg)

El problema es que se rompen muy fácilmente ante el más mínimo golpe. Es por ello que me pasé a las de fibra de carbono:

![](/images/helices2.jpg)

Son un poco más caras, pero duran mucho más.

Un punto importante a destacar sobre las hélices es que aunque se supone que vienen balanceadas de fábrica, siempre tienen alguna imperfección, por lo que debemos balancearlas para evitar vibraciones en nuestro quad.

El [proceso de equilibrado](https://rc.lapipadelindio.com/aeromodelismo/equilibrar-helice-rc-equilibrador-casero) es bastante fácil pero lleva tiempo. Nunca está de más utilizar algunas de las herramientas que nos facilitan esta tarea.

#### Controladores de velocidad

Llamados **ESCs** (Electronic Speed Controller), estos dispositivos son los encargados de traducir las señales que envía la controladora de vuelo en la cantidad de energía que se envía a los motores.

A la hora de elegirlos, hay que tener en cuenta el consumo de corriente que tienen los motores, lo cual debería estar entre las especificaciones del motor.

En mi caso, compré unos **Turnigy Plush de 30A** :

![](/images/esc.jpg)

Elegí estos porque me daban la posibilidad de «flashearlos». Esto significa que puedo cambiarles el firmware y poner otro con algunas mejoras como la velocidad de refresco con la que se reciben las órdenes desde la controladora de vuelo.

El firmware que utilicé es de código abierto (qué sorpresa) y se llama [BLHeli](https://github.com/bitdump/BLHeli).

Para poder flashearlos, tuve que quitar el plástico que los cubre y fabricar una herramienta que haga contacto en 3 puntos específicos del circuito impreso:

![](/images/esc2.jpg)![](/images/esc3.jpg)
_Si, es un broche de ropa_![](/images/esc4.jpg)

Utilizando un **Arduino Uno** como **programador AVR** USB y una máquina virtual con Windows fui capaz de ejecutar la aplicación para flashear BLHeli. El proceso es bastante rápido, pero luego tuve que volver a cubrir los ESCs con termoretráctil para que no queden a la intemperie:

![](/images/esc5.jpg)

Luego de flasheados los ESCs, la respuesta del quad es notablemente mejor y los motores hacen menos ruido. Lo recomiendo ampliamente, aunque ya hay varios ESCs que vienen con firmwares mejorados ya flasheados de fábrica.

#### Batería

La batería es uno de los aspectos más importantes del quadcopter y hay que tener en cuenta varias cosas a la hora de elegir una.

Como dijimos antes, todo está relacionado con todo, y en este caso, tenemos que ver qué voltaje soportan nuestros motores.

El tipo de baterías que se utilizan para el aeromodelismo en general son las **LiPo** (Litio-Polímero), y éstas a su vez se clasifican por dos factores importantes; voltaje y amperaje.

El voltaje viene definido por el número de «celdas» que tiene la batería. Cada celda tiene **3.7 volts** , por tanto, una batería de 3 celdas equivale a 3 placas de 3.7 volts, por lo que la batería será de **11,1 volts**. Tenemos que tener en cuenta este valor para no excedernos y quemar nuestros motores.

El amperaje es lo que define la cantidad de corriente que es capaz de almacenar la batería, por tanto, a mayor amperaje, más tiempo volará nuestro quad. Pero cuidado, que a mayor amperaje, mayor será el tamaño de la batería, por lo que pesará más, por lo que gastará más energía para mantenerse en vuelo. A esto me refería cuando mencionaba que hay que buscar un balance para cada componente. Para el caso de la batería, hay que buscar una buena relación peso-potencia.

La que yo elegí al principio era una **Turnigy de 3 celdas y 2.6 Amperes** :

![](/images/bateria-uav.jpg)

Con ella podía volar cerca de 6 minutos antes de agotarla.

Luego de un tiempo, me pasé a una batería que en realidad es para coches eléctricos (viene dentro de una especie de caja plástica). Esta vez de 5.0 Amperes (respetando las 3 celdas que soportan mis motores), con la cual llego a volar hasta 9 minutos:

![](/images/bateria-uav2.jpg)

Habrás notado que además, las baterías muestran un número de « **C** », que es un multiplicador que indica la cantidad máxima de energía que es capaz de entregar en un momento dado. Es decir, si la batería es de **2.6 A** y **30C** , (2.6 \* 30 = 78) significa que es capaz de entregar **78 Amperes** de manera segura.

Para cargarlas, es importante hacerlo con un cargador especial para baterías LiPo que balancee el voltaje en cada una de las celdas y las mantenga parejas.

#### Alarma de batería baja

Algo importante a tener en cuenta con éstas baterías es que no debemos consumir más del 20% de su carga. Si lo hacemos, las baterías se van arruinando y cada vez duran menos, por no mencionar que se pueden hinchar y puede llegar a ser peligroso dado que son altamente inflamables.

Por este motivo, y para no quedarnos sin batería a mitad del vuelo y que nuestro quad caiga cual roca, se utiliza una alarma sonora que avisa cuando la batería tiene una carga inferior a la especificada:

![](/images/lipo-meter-screamer.jpg)

Esta alarma es muy barata, pero en mi opinión indispensable para mantener la vida útil de la batería y del propio quad.

#### Radio control

Una de los principales componentes de este sistema es la radio. Es con lo que controlaremos el quad, por lo que debe ser de una calidad aceptable. Las radios modernas funcionan a altas frecuencias (2.4 GHz) y algunas disponen incluso de telemetría.

Algo a tener en cuenta es el número de canales que puede controlar. Esto es importante porque de ello dependerá la cantidad de funcionalidades que podremos activar mientras estamos en vuelo. Como mínimo necesitamos 4 canales (pitch, roll, yaw, y altura), pero siempre viene bien tener algunos más para controlar los modos de vuelo, mantener altura, mover la cámara (en caso de que tengamos una), etc.

Mi recomendación es la **Turnigy 9X** , que dispone de 8 canales y un display digital con mucha información útil:

![](/images/radio.jpg)

Además, se puede cambiar el firmware por uno de código abierto llamado [ER9X](https://github.com/MikeBland/mbtx), algo que me queda pendiente, pero que quisiera hacer ya que trae muchas ventajas frente al firmware original.

![](/images/receptor.jpg)
_«Receptor de la radio con 8 canales disponibles»_

Es una buena radio, a un precio muy aceptable (poco más de 50€).

#### Kit FPV

Algo que está muy de moda es el vuelo **FPV** (First Person View), que consta de unas gafas especiales, a través de las cuales podemos ver en tiempo real lo que transmite una pequeña cámara montada en el quadcopter. La sensación es como si estuvieras subido al quad y conduciéndolo desde arriba.

Yo compré unas **Fatshark Teleporter** , que es el kit más barato de la marca e incluye todo lo necesario para salir a volar (gafas, batería, transmisor, cámara, antenas, cables).

![](/images/fatshark.jpg)

Lamentablemente he volado poco con ellas, y me falta bastante práctica. Al principio da un poco de miedo porque no transmite sensación de distancia, profundidad o altura, entonces cuesta saber que tan lejos están los obstáculos, o que tan alto estas volando. Dicen que con un poco de práctica te acostumbras rápido. Veremos si es verdad :)

Una pequeña mejora que les hice fue cambiar las antenas por unas llamadas « **hoja de trébol** ». La ventaja que tienen frente a las que trae el kit es que son _omnidireccionales_, brindando una mejor señal y teóricamente mejor alcance:

![](/images/antena.jpg)

Hay algunas de mejor calidad, pero como estoy recién iniciando en el tema... compré estas.

## Primer vuelo

Después de configurar todo en base a prueba y error, este es el primer vuelo exitoso:

{% include embed/youtube.html id='Ki6ANzmBq4s' %}

La cámara con la que fue filmado tiene un pésimo sistema de autofoco y es por eso que el video no se ve muy bien, pero es lo que hay.

## Mejoras

Siempre estoy pensando en qué mejoras hacer al sistema que ya tengo. He pensado en agregar un gimbal para la cámara, pero de momento sólo he agregado un servo controlado desde un canal en la radio que me permite mover la cámara hacia arriba y abajo:

{% include embed/youtube.html id='4OSl-cKKpMQ' %}

También he agregado una cámara GoPro para filmar los vuelos desde arriba.

## Conclusión

Es un proyecto muy divertido con el que he aprendido muchísimo. Lamentablemente, como todo hobbie, no es barato pero por suerte los precios van bajando de a poco.

![](/images/uav-v1.jpg)
_Versión 1_

![](/images/uav-v2.jpg)
_Versión 2_

No es fácil, pero es justamente eso lo que nos atrae, no?
