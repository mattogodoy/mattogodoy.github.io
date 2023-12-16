---
layout: post
title: Armando una Impresora 3D - Parte 2
date: '2015-02-12 20:01:00'
tags:
- electronica
- impresora-3d
---

En la [parte 1](http://matto.io/armando-una-impresora-3d-parte-1/) de este post vimos una introducción al funcionamiento y los componentes de una impresora 3d.

> Ya está disponible también la [parte 3](http://matto.io/armando-una-impresora-3d-parte-3/).

En esta segunda parte veremos los procesos de construcción y calibración de a impresora.

# Construcción

Es en mi opinión la parte más divertida de todo el proceso. Es el momento en que unimos todos los componentes y realmente empezamos a entender cómo funciona este aparato.

El montaje de las piezas debe hacerse en un orden específico. De esta manera podremos probar si los distintos subsistemas de la impresora funcionan correctamente antes de armar todo el conjunto. Así es más fácil solucionar cualquier problema que surja.

Vamos en orden:

### Electrónica

Lo primero que debemos hacer es comprobar que podemos instalar el Firmware que hace que todo funcione.

Hay dos grandes proyectos de código abierto en este momento: [Sprinter](https://github.com/kliment/Sprinter) y [Marlin](https://github.com/MarlinFirmware/Marlin).

Inicialmente utilicé Sprinter, dado que es más simple y requiere menos configuración. Más adelante, cuando instalé el módulo de la pantalla LCD mencionado en el post anterior, tuve que pasarme a Marlin, dado que Sprinter no lo soporta (al menos por el momento).

Este cambio fue muy positivo, dado que no sólo me da la posibilidad de utilizar la pantalla LCD, sino que tiene algunas mejoras respecto a las velocidades de movimiento de los motores, utilizando [easing](http://www.robertpenner.com/easing/easing_demo.html) para moverse, lo cual hace que la impresora haga mucho menos ruido y los movimientos sean sorprendentemente suaves, y no por ello más lentos.

Si estás pensando en armar tu propia impresora, mi recomendación es que uses Marlin directamente. La configuración puede llevar un poco más de tiempo, pero vale la pena.

Volviendo al proceso: lo primero que hay que hacer es comprobar que podemos comunicarnos con el Arduino. Para ello se conecta por USB y se intenta subir un código de ejemplo al microcontrolador utilizado el [IDE de Arduino](http://arduino.cc/en/main/software).

Si tienes la desdicha de utilizar Windows, tendrás que instalar algunos [drivers adicionales](http://arduino.cc/en/Guide/Windows) antes. Y por favor, considera cambiar de sistema operativo.

El código que subiremos será muy simple. Lo único que hace es encender y apagar intermitentemente un [LED](http://es.wikipedia.org/wiki/Led) que viene integrado en el pin 13 del Arduino:

    /*
      Blink
      Turns on an LED on for one second, then off for one second, repeatedly.
     
      This example code is in the public domain.
     */
     
    // Pin 13 has an LED connected on most Arduino boards.
    // give it a name:
    int led = 13;
    
    // the setup routine runs once when you press reset:
    void setup() {                
      // initialize the digital pin as an output.
      pinMode(led, OUTPUT);     
    }
    
    // the loop routine runs over and over again forever:
    void loop() {
      digitalWrite(led, HIGH); // turn the LED on (HIGH is the voltage level)
      delay(1000); // wait for a second
      digitalWrite(led, LOW); // turn the LED off by making the voltage LOW
      delay(1000); // wait for a second
    }

Subimos este código al Arduino. Si vemos un LED parpadear, sabremos que estamos en condiciones de comunicarnos con él correctamente y podemos pasar al siguiente paso.

Ahora es el turno del firmware. El proceso es bastante parecido y no debería tener mucha complicación:  
Descargamos Marlin desde su [repositorio de Github](https://github.com/MarlinFirmware/Marlin), abrimos el proyecto en el IDE de Arduino y (asegurándonos de que está conectado por USB) lo cargamos al Arduino.

El paso siguiente es conectar todos los controladores de motores en la RAMPS, y la RAMPS sobre el Arduino, quedando un bloque compacto que contiene toda la electrónica.

<figure class="kg-image-card kg-width-wide"><img src="/content/images/2018/08/prusa3.jpg" class="kg-image"></figure>

Este bloque ya se comporta como una impresora 3D, por lo que estando conectado por USB, ya podríamos utilizar algún software de impresión para enviarle órdenes y comprobar que todo funciona correctamente.

Uno muy utilizado es [Pronterface](http://www.pronterface.com/). Éste nos permite enviar comandos simples, o modelos completos a nuestra impresora.

Los archivos utilizados por las impresoras 3D son los mismos que para las máquinas CNC; en formato [GCODE](http://en.wikipedia.org/wiki/G-code).

Un archivo GCODE es simplemente un conjunto secuencial de órdenes que la impresora va ejecutando en orden. Para ello dispone de una [lista de posibles comandos](http://reprap.org/wiki/G-code) que se envían en cada línea.

El siguiente es un ejemplo de archivo GCODE que dibuja un círculo desde la posición **X=-0.5, Y=0, Z=0**. Cuando termina, vuelve a la posición **X=0, Y=0, Z=0.25** (la punta del extrusor un poco levantada):

    G17 G20 G90 G94 G54
    G0 Z0.25
    X-0.5 Y0.
    Z0.1
    G01 Z0. F5.
    G02 X0. Y0.5 I0.5 J0. F2.5
    X0.5 Y0. I0. J-0.5
    X0. Y-0.5 I-0.5 J0.
    X-0.5 Y0. I0. J0.5
    G01 Z0.1 F5.
    G00 X0. Y0. Z0.25

Para comprobar si el firmware funciona bien, conectamos los motores a la RAMPS (el orden y la dirección de los motores no importa en este momento).

También es importante alimentar la RAMPS con la salida de 12 volts de la fuente. De lo contrario los motores no se moverán ಠ\_ಠ

<figure class="kg-image-card"><img src="/content/images/2018/08/motores.jpg" class="kg-image"></figure>

Con los motores ya conectados, podemos probar si nuestra impresora interpreta bien las órdenes. Para ello, yo utilicé un archivo GCODE muy particular: Uno que al hacer girar los motores, lo hace en una dirección y velocidad específica generando un sonido que suena como la [Marcha Imperial](https://www.youtube.com/watch?v=n4rHGubRqpw).

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/lMhPuMIk59Q?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

El archivo está disponible para su descarga [aquí](https://github.com/Obijuan/Clone-wars/blob/master/Calibration/imperial.gcode).

El siguiente paso es probar los sensores de fin de carrera. Para ello, simplemente los conectamos a la RAMPS en los conectores con etiqueta _x-min_, _y-min_ y _z-min_. Como sus nombres lo indican, sirven para los dos extremos de cada eje. En mi caso sólo utilizo sensores para un extremo, aunque en más de una ocasión me habría venido bien tenerlos en el otro extremo también. En cualquier momento los agrego.

Para comprobar que funcionan correctamente, en vez de ejecutar el GCODE de la marcha imperial, esta vez hacemos «homing» de cada uno de los ejes usando el Pronterface. El _homing_ es el proceso de llevar cada uno de los ejes hasta su posición inicial. Los motores girarán hasta que presionemos los finales de carrera. Si al hacerlo los motores se detienen, significa que todo funciona como corresponde.

Bien, ya tenemos el «cerebro» funcionando.

### Poleas

En mi caso, los motores paso a paso venían con un eje de sección circular. Para evitar que las poleas resbalen, debemos aplanar los ejes de todos los motores utilizando una lima para hierro. Un buen consejo de la guía de Obijuan es utilizar una arandela pegada al cuerpo del motor para no rayarlo con la lima mientras los aplanamos.  
Hecho esto, las poleas quedarán firmes utilizando el tornillo de ajuste y no se deslizarán.

### Tuercas

Muchas de las piezas impresas de las estructura tienen hendiduras en las que encajan tuercas de métrica 3 (23 tuercas, para ser exactos).

Dependiendo de la exactitud con que se hayan impreso las piezas de la estructura, puede que sea un poco difícil encajar las tuercas, y hasta corremos peligro de romper las piezas si hacemos mucha presión, por lo que a mi parecer, la mejor manera de empotrarlas es utilizando un soldador de estaño.  
Ubicamos la tuerca sobre el encastre alineándola para que las formas coincidan, y con la punta del soldador caliente empujamos la tuerca. Entrará fácilmente y quedará bien agarrada.

Ahora hay que repetir este proceso 22 veces más...

### Carro del eje X

Lo siguiente es armar el carro del eje X, donde se une el extrusor con el hot-end.

<figure class="kg-image-card"><img src="/content/images/2018/08/eje_x.jpg" class="kg-image"></figure>

Para ello se utilizan 2 varillas lisas de métrica 8 sobre las que se deslizará el carro utilizando 3 rodamientos lineales que harán que la fricción sea mínima:

<figure class="kg-image-card"><img src="/content/images/2018/08/linear-ball-bearing.jpg" class="kg-image"></figure>

También aquí instalaremos el primero de los motores que por medio de una correa de tipo T2.5 y un rodamiento de tipo 608 moverá el carro en ambas direcciones del eje X.

Lo que queda es más o menos esto:

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/BwfnwRrXj-Q?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

También nos adelantamos y colocamos los rodamientos lineales y las tuercas de métrica 8 que nos servirán para el desplazamiento del **eje Z**.

### Estructura

La estructura principal se compone de 2 triángulos formados con varillas roscadas y piezas impresas.

<figure class="kg-image-card"><img src="/content/images/2018/08/estructura.jpg" class="kg-image"></figure>

Estos triángulos se unen por medio de otras varillas roscadas que contiene las piezas necesarias para sostener el motor, los rodamientos y las varillas lisas para carro del eje Y.

<figure class="kg-image-card"><img src="/content/images/2018/08/estructura2.jpg" class="kg-image"></figure>

El orden en que se colocan las piezas y las tuercas es muy importante. Darse cuenta de que te olvidaste algo una vez que está todo armado no es muy divertido.

En la parte superior se colocan también los soportes para los motores del eje Z. Una vez armado, esto es lo que queda:

<figure class="kg-image-card kg-width-wide"><img src="/content/images/2018/08/estructura3.jpg" class="kg-image"></figure>

Ya se va pareciendo más a una impresora ¿No?

### Eje Y

La base de este eje es una placa de madera a la cual se atornillan 3 rodamientos lineales por los cuales pasan las varillas lisas que se conectan a las piezas que habíamos preparado en el **eje X**.

También se atornillan las piezas que presionarán la correa y la mantendrán tensada.

<figure class="kg-image-card"><img src="/content/images/2018/08/estructura4.jpg" class="kg-image"></figure>

Colocamos ahora la correa del eje Y y continuamos.

### Eje Z

Instalamos los 2 motores en los soportes del eje Z y pasando las varillas lisas por los rodamientos lineales que habíamos preparado en el **eje X** los instalamos en sus correspondientes soportes.

Los motores se conectan a varillas roscadas de métrica 8 que van dentro de las tuercas del soporte del **eje X**. Gracias a esto, cuando los motores del **eje Z** giran, hacen que el carro completo del **eje X** se eleve.

<figure class="kg-image-card"><img src="/content/images/2018/08/estructura5.jpg" class="kg-image"></figure>

¡Estructura lista!

### Prueba general

Ahora que tenemos toda la estructura armada, comprobamos que todos los motores funcionan correctamente y que todos los ejes se desplazan sin problemas en ambas direcciones. ¿Qué mejor que una marcha imperial a gran escala?

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/JHD9WMfdCuI?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

Lo bueno de este archivo GCODE es que además de tocar la marcha imperial, lo hace de tal forma que no permite que ninguno de los carros llegue a los extremos de los ejes (sobre todo ahora que todavía no hemos instalado los sensores de fin de carrera).

### Finales de carrera

Se utilizan 3 sensores de final de carrera y van atornillados a las piezas instaladas para tal fin en cada uno de los ejes. Estos tienen la importantísima tarea de detener los motores si están muy cerca del final del recorrido, evitando la catástrofe.

### Cama caliente

La cama caliente va apoyada sobre 4 resortes que sirven para absorber cualquier golpe que reciba en caso de que el eje Z baje más de lo normal y la empuje con el hot-end.

<figure class="kg-image-card"><img src="/content/images/2018/08/muelle.jpg" class="kg-image"></figure>

Una vez instalada conectamos los cables que van a la alimentación. Para esto mucha gente la conecta directamente a la salida que tiene la RAMPS para este fin, pero dada la cantidad de corriente que consume, el [MOSFET](http://es.wikipedia.org/wiki/MOSFET) se calienta muchísimo y corre riesgo de quemarse.

Lo que yo hice fue conectarla directamente a la fuente utilizando un [relay](http://es.wikipedia.org/wiki/Relé), a su vez conectado a la RAMPS. Así no corro riesgos de quemar nada.

Por otra parte, para que podamos saber a qué temperatura está la base usaremos un [termistor](http://es.wikipedia.org/wiki/Termistor) que va pegado a la parte posterior de la cama caliente y encaja en un agujerito que trae para tal fin. Éste se conecta a su correspondiente entrada en la RAMPS. Es importante que el cableado desde la fuente hasta la cama caliente se haga utilizando cables preparados para una buena cantidad de corriente. De lo contrario se derretirá.

Una mejora importante es la instalación de un LED indicador para saber cuando la cama caliente está recibiendo corriente. La placa base de la cama ya trae los conectores para instalarlo. Lo único que debemos hacer es soldar una [resistencia](http://es.wikipedia.org/wiki/Resistor) de 1K y un LED en los zócalos.

Una vez instalada y conectada, ya podemos probarla utilizando Pronterface. Podemos asignarle una temperatura y ver si enciende el led, y sobre todo si la base se calienta. La temperatura reportada por Pronterface puede no ser la correcta, dado que todavía no configuramos el _firmware_, pero con saber que funciona nos basta por ahora.

Una buena práctica es colocar un espejo de 20cm X 20cm sobre la cama caliente. Esto nos permite despegar las piezas fácilmente una vez impresas, y además protege el [PCB](http://es.wikipedia.org/wiki/Circuito_impreso).

### Extrusor

Para armar el cuerpo del extrusor usamos el _hobbed bolt_ como eje del engranaje, y lo sostenemos con dos rodamientos que permitirán que gire libremente.

Un tercer rodamiento se usa para presionar el filamento contra las ranuras del _hobbed bolt_ con la ayuda de unos resortes y unas mariposas que permiten variar la presión.

<figure class="kg-image-card"><img src="/content/images/2018/08/extrusor2.jpg" class="kg-image"></figure>

Hecho esto podemos comprobar la fuerza de tracción del extrusor utilizando un poco de filamento y activando el motor con Pronterface. Te sorprendería la fuerza que puede llegar a tener.

### Hot-end

El hot-end va sujetado a la base del carro del eje X. Lo atornillamos y llevamos el cableado hasta la RAMPS. Al igual que la cama caliente, el hot-end tiene un termistor que nos permite saber a qué temperatura se encuentra.

Para este caso, no necesitaremos un relay dado que la cantidad de corriente utilizada para calentar el hot-end es mucho menor y con el MOSFET de la RAMPS nos alcanza.

<figure class="kg-image-card"><img src="/content/images/2018/08/hot_end-1.jpg" class="kg-image"></figure>

Como se ve en la foto, para probar el hot-end le asignamos una temperatura de 230º usando Pronterface y cuando esté bastante caliente (de nuevo, todavía no tenemos medidas precisas hasta que no configuremos el _firmware_) insertamos filamento por el agujero de entrada y presionamos levemente con la mano. El filamento debería salir derretido por la punta.

Ahora que sabemos que funciona, atornillamos el extrusor en la parte superior del carro del eje X. Para asegurarnos primero probaremos girando el engranaje con la mano, y cuando estemos seguros de que funciona, utilizando el motor del extrusor para empujar el filamento:

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/nR9dhcskIvk?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

¡Ya casi estamos! Nos queda calibrar y configurar algunas cosas, pero lo más difícil ya está hecho.

# Calibración y configuración

La calidad de nuestras impresiones dependerá en su gran mayoría de la precisión con la que configuremos los parámetros de nuestra impresora.

### Pasos por milímetro

Para lograr ubicar la punta del hot-end en las coordenadas exactas, el cerebro de la impresora debe saber la cantidad de pasos que debe moverse el motor en una dirección para que uno de los ejes se desplace exactamente un milímetro. Para el caso del extrusor, es la cantidad de pasos que debe moverse el motor para extruír un milímetro de filamento.

Esta configuración se encuentra en el archivo «Configuration.h» del firmware en la línea:

    float axis_steps_per_unit[] = {80, 80, 2560, 719};

Dentro del array, vemos que hay 4 valores, que representan los pasos por milímetro de los ejes X, Y, Z y el extrusor respectivamente.

Para calibrar el eje X, lo que debemos hacer es medir con un [calibre](http://es.wikipedia.org/wiki/Calibre_(instrumento)) (en lo posible digital) la distancia entre el carro y uno de los soportes del eje de guía.  
Una imagen vale más que mil palabras:

<figure class="kg-image-card"><img src="/content/images/2018/08/eje_x2.jpg" class="kg-image"><figcaption><em>Imagen robada de la <a href="http://www.iearobotics.com/wiki/index.php?title=Guia_de_montaje_de_la_Prusa_2">guía de Obijuan</a></em></figcaption></figure>

Ahora usando Pronterface damos la orden de desplazar el eje X 100 milímetros. Volvemos a medir y verificamos cuál fue el desplazamiento real del carro.  
Nos dará un número que probablemente esté cerca de 100mm, pero seguramente tendrá un error. Eso es lo que queremos corregir.

<figure class="kg-image-card"><img src="/content/images/2018/08/eje_x3.jpg" class="kg-image"><figcaption><em>Imagen robada de la <a href="http://www.iearobotics.com/wiki/index.php?title=Guia_de_montaje_de_la_Prusa_2">guía de Obijuan</a></em></figcaption></figure>

En la imagen ya vemos un carro calibrado (99,97mm de los 100mm que le pedimos que se desplace es más que aceptable), pero imaginemos un escenario más real, en el que la medida nos dará, por ejemplo, **86mm**.

Para corregir este error de desplazamiento (100mm - 86mm = 14mm de error) hay una fórmula muy simple:

    (valor actual * distancia solicitada) / distancia recorrida = nuevo valor

En nuestro caso, los parámetros serían:

- Valor actual: **80** (visto en _Configuration.h_)
- Distancia solicitada: **100** (en milímetros)
- Distancia recorrida: **86** (en milímetros)

quedando la cuenta:

    (80 * 100) / 86 = 93,02

Esto significa que el nuevo valor que debemos asignar para el eje X en el archivo de configuración es de **93**. Dado que los motores paso a paso pueden hacer una cantidad discreta de pasos, no tiene sentido que agreguemos los decimales.

Modificamos el archivo quedando de esta manera:

    float axis_steps_per_unit[] = {93, 80, 2560, 719};

y cargamos nuevamente el firmware en el Arduino para actualizarlo con los nuevos valores.

Lo ideal es repetir este proceso unas 3 veces para lograr mayor exactitud.

Para los ejes Y y Z el proceso es el mismo. Para el caso del extrusor, la única diferencia es que debemos medir es desplazamiento del filamento. Lo que podemos hacer es usar un pedazo de cinta adhesiva o un marcador indeleble para marcar la distancia, ejecutar la orden con Pronterface y medir nuevamente.

### Endstop del eje Z

Otro punto importante es calibrar la altura exacta a la que el hot-end debe detenerse sobre la cama caliente.

Para ello debemos desplazar verticalmente la pieza que sostiene el sensor de fin de carrera del eje Y, para lograr que la punta del hot-end se detenga a la altura exacta al hacer un _homing_.

En mi caso, agregué [una mejora](http://www.iearobotics.com/wiki/index.php?title=Evolucionando_la_Prusa_2#Regulador_de_altura_para_el_eje_z) que me permite regular la altura del eje Z usando un tornillo en vez de tener que desplazar la pieza completa.

La altura ideal es la utilizada para la primera capa. Normalmente alrededor de 0,2mm.

### Configuración del firmware

Además de la cantidad de pasos por milímetro de los motores, el archivo [Configuration.h](https://github.com/MarlinFirmware/Marlin/blob/Development/Marlin/Configuration.h) contiene algunos parámetros que pueden servirnos para dejar todo funcionando correctamente.

**Termistores**

Debemos definir qué tipo de termistor tenemos en el extrusor (_TEMP\_SENSOR\_0_) y en la cama caliente (_TEMP\_SENSOR\_BED_). Para mi caso los valores son **5** y **1** respectivamente, pero pueden variar.

    #define TEMP_SENSOR_0 5
    #define TEMP_SENSOR_1 0
    #define TEMP_SENSOR_2 0
    #define TEMP_SENSOR_BED 1

El valor **0** indica que los sensores están desactivados, como es el caso de _TEMP\_SENSOR\_1_ y _TEMP\_SENSOR\_2_ que pueden ser usados para un segundo extrusor u otra funcionalidad.

Normalmente los fabricantes brindan esta información. De todas maneras el código está bien comentado y en la parte superior tiene un listado de todos los tipos de termistor posibles.

**PID**

Para mantener una temperatura constante tanto en el hot-end como en la cama caliente, se utiliza control del tipo _[Proporcional Integral Derivativo](http://es.wikipedia.org/wiki/Proporcional_integral_derivativo)_ (PID), por lo que debemos establecer los parámetros correctos para que el comportamiento sea el que buscamos. &nbsp;Por suerte el firmware nos da la opción de descubrirlos por su cuenta de manera empírica, ahorrándonos muchísimo trabajo.

Para conseguir los parámetros debemos seguir [una serie de pasos](http://reprap.org/wiki/PID_Tuning) en los que la impresora nos devolverá unos parámetros que debemos reemplazar en _Configuration.h_ con los obtenidos.

Para el extrusor:

    #define DEFAULT_Kp 22.2
    #define DEFAULT_Ki 1.08
    #define DEFAULT_Kd 114

Para la cama caliente:

    #define DEFAULT_bedKp 10.00
    #define DEFAULT_bedKi .023
    #define DEFAULT_bedKd 305.4

Al igual que con el calibrado de los pasos de los motores, mientras más veces repitamos este proceso, más exactos serán los valores que obtengamos.

Esto nos permitirá ahorrar energía y mantener las temperaturas en los valores correctos.

**Temperatura mínima de extrusión**

Por un tema de protección, es importante que no permitamos que se de la orden de extruír si el hot-end no está a la temperatura correcta. Si eso pasara, el filamento entraría en el hot-end frío y no se derretiría. Teniendo en cuenta la fuerza que tiene el extrusor, es muy probable que rompamos algo.

Para evitar eso, tenemos el siguiente parámetro:

    #define EXTRUDE_MINTEMP 210

Yo lo he puesto en **210º** dado que es la temperatura en la que el plástico ya está derretido, a pesar de que la ideal sean **230º**.

**Otros**

Hay muchos parámetros muy útiles y muy bien documentados. [Te invito a que veas el código](https://github.com/MarlinFirmware/Marlin/blob/Development/Marlin/Configuration.h) y decidas por tu cuenta qué cambiarías y qué no.

En mi caso tuve que hacer algunos cambios extra para habilitar el funcionamiento del [panel LCD](http://reprap.org/wiki/RAMPS_LCD).

## Primera impresión

Con todo esto armado y configurado, ya podemos empezar a imprimir. ¡Al fin!

Lo primero que imprimí fue una [ficha de casino](http://www.thingiverse.com/thing:4688). Su forma permite saber si hemos calibrado bien los pasos de los motores, y a la vez vemos si el resto de parámetros son correctos. Sobre todo, sabremos si nuestro Frankestein funciona para lo que fue concebido.

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/x77h3cfLWX8?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

Por suerte todo salió como esperaba, aunque es verdad que el mantenimiento es un proceso constante durante la vida de la impresora. Es común hacer cambios frecuentemente dado que el simple hecho de cambiar de color o marca de filamento, o la época del año en que estamos (frío o calor) pueden hacer que la impresora se comporte de manera diferente y debamos ajustar algo.

<figure class="kg-image-card"><img src="/content/images/2018/08/impresora.jpg" class="kg-image"></figure>

¡Funciona!

## Galería

Todas las fotos y videos del proceso de construcción están en un [álbum de Flickr](https://www.flickr.com/photos/96215205@N02/sets/72157634010097482/), y son éstas:

[![Impresora 3D](https://farm3.staticflickr.com/2829/8988999116_188546ca65_z.jpg)](https://www.flickr.com/photos/96215205@N02/albums/72157634010097482 "Impresora 3D")<script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script><figure class="kg-image-card"><img src="http://matto.io/content/images/2015/02/hr.png" class="kg-image"></figure>

Nadie dijo que sería fácil, pero sin duda es divertido y se aprende mucho en el camino.

Si estás pensando en armar tu propia impresora 3D, te recomiendo que sigas los tutoriales de Obijuan mencionados en el [primer post](http://matto.io/armando-una-impresora-3d-parte-1/). Lo mío es mas un registro de mi propia experiencia que una guía y estoy seguro de que me he saltado muchos pasos importantes a lo largo de esta entrada.

En el próximo post veremos cómo es el proceso de impresión, empezando por la pieza modelada en 3D y terminando con una pieza ya impresa en el mundo real. Veremos también recursos de software y un repositorio de piezas en 3D para imprimir.

¡Hasta la próxima!

