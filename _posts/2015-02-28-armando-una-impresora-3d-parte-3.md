---
layout: post
title: Armando una Impresora 3D - Parte 3
date: '2015-02-28 20:41:00'
tags:
- electronica
- impresora-3d
---

Para finalizar esta serie de posts sobre la construcción y configuración de una impresora 3D open source, nos queda por entender el proceso de preparación por el que pasa cada pieza para poder ser impresa.

> Si no leíste la [parte 1](http://matto.io/armando-una-impresora-3d-parte-1/) y la [parte 2](http://matto.io/armando-una-impresora-3d-parte-2/) de la serie, te recomiendo que lo hagas antes de continuar.

# Proceso

Nuestra impresora no entiende de archivos 3D. Lo que entiende son instrucciones que ella seguirá en un orden secuencial. Por tanto, tenemos que lograr transformar la pieza que queremos imprimir a un formato que nuestra impresora pueda entender.

## Recursos

Antes que nada, debemos saber qué es lo que queremos imprimir. La ventaja es que podemos imprimir prácticamente cualquier archivo que esté modelado en 3D, viéndonos limitados sólo por algunos aspectos que veremos más adelante.

Las posibilidades y aplicaciones que nos brinda una impresora de este tipo son infinitas. Desde la fabricación de adornos, juguetes o prototipos, hasta la impresión de piezas de repuestos imposibles de conseguir o de coste muy elevado.

### Ya creados

La principal fuente de objetos ya modelados al día de hoy es [Thingiverse](http://www.thingiverse.com/), un repositorio de piezas de los creadores de la [Makerbot](http://www.makerbot.com/), una impresora que ha causado grandes debates en internet.

En resumidas cuentas, estos señores utilizaron todos los recursos de open software y open hardware, para hacer su propia impresora **de código cerrado**.

<figure class="kg-image-card"><img src="/content/images/2018/08/makerbot.png" class="kg-image"><figcaption><em>Más detalles sobre esta historia <a href="http://jonbengoetxea.com/2012/09/21/la-traicion-de-makerbot-hoy-puede-ser-un-mal-dia-para-el-open-hardware/">aquí</a>.</em></figcaption></figure>

Dejando esto de lado, en Thingiverse podemos encontrar una infinidad de piezas creadas por los propios usuarios. Quien quiera puede crearse una cuenta y subir sus propios modelos para que el resto de la humanidad pueda materializarlos.

En mi caso, modelé una [caja para la pantalla LCD](http://www.thingiverse.com/thing:117932) de la impresora y la puse a disposición de cualquier persona que esté interesada. Me alegró ver que varias personas la descargaron y la imprimieron. Hasta hay fotos de los modelos impresos.  
Si lo pienso un poco, es bastante loco que la gente alrededor del mundo esté materializando cosas que yo he modelado y les de una utilidad real.

Existen [algunas alternativas](http://www.reddit.com/r/3Dprinting/comments/26do2z/alternative_repositories_to_thingiverse/) a Thingiverse en las que también podemos encontrar cosas interesantes.

### Para crear

Prácticamente cualquier pieza modelada en 3D puede ser impresa, independientemente del programa que utilicemos para crearla.

Dado que no dispongo de conocimientos avanzados en modelado 3D, yo utilizo lo que a mi parecer es una de las maneras más fáciles de crear piezas que no requieran de mucha complejidad. Es un sitio web llamado [Tinkerkad](https://www.tinkercad.com/), lo que tiene la ventaja añadida de no tener que instalar nada. Es simplemente una página web.

Tinkerkad nos permite crear piezas muy fácil y rápidamente, pero se queda corto para piezas que requieran de cierta complejidad o precisión. Para ello existe programas más completos, como [OpenScad](http://www.openscad.org/), [Sketchup](http://www.sketchup.com/) y hasta los gigantes como [Catia](http://www.3ds.com/products-services/catia/) o [3D Studio Max](http://www.autodesk.com/products/3ds-max/overview).

> **Actualización (25/08/2018):**  
> La gente de Autodesk ha sacado un nuevo editor 3D gratuito y muy fácil de usar llamado [Fusion360](https://www.autodesk.com/products/fusion-360/overview). Es el que estoy usando actualmente para todos mis proyectos y lo recomiendo ampliamente.

El programa utilizado es indistinto, lo único importante es que el objeto resultante se almacene en un formato llamado [STL](http://en.wikipedia.org/wiki/STL_(file_format)) (STereo Litography). Este formato almacena una representación triangular de un objeto 3D. La superficie de la pieza se divide en series lógicas de triángulos que en conjunto forman la totalidad del objeto.

<figure class="kg-image-card"><img src="/content/images/2018/08/stl.png" class="kg-image"></figure>

A diferencia de los modelos 3D comunes, un modelo STL dispone de una superficie única para todo el objeto, simplificando al máximo el proceso de _cortado_.

# Proceso de cortado

Como ya he explicado antes, un objeto impreso en 3D es una sucesión de capas de plástico apiladas verticalmente, formando el volumen de la pieza. Cada capa se pega a la anterior debido a que el plástico que sale del extrusor está derretido al momento de la impresión. Las capas se van secando lentamente formando un objeto sólido.

<figure class="kg-image-card"><img src="http://matto.io/content/images/2015/02/printing3.gif" class="kg-image"></figure>

De esto deducimos que para poder imprimir una pieza, debemos _cortarla_ en capas antes. Esto se hace mediante un software específico que en base a ciertos parámetros como la altura de cada capa, la velocidad de impresión, el tipo de filamento, etc., nos genera un archivo de instrucciones GCODE.

El archivo [GCODE](http://en.wikipedia.org/wiki/G-code), como vimos en la [parte 2](http://matto.io/armando-una-impresora-3d-parte-2/), no es más que un conjunto de órdenes que indican a la impresora el camino que debe seguir en cada uno de sus ejes para ir dibujando la pieza. A su vez, indica también la temperatura a la que tiene que estar el hot-end y la cantidad de plástico que se debe extruír en cada momento.

<figure class="kg-image-card"><img src="/content/images/2018/08/skeleton.png" class="kg-image"><figcaption><em>Vista del resultado de un modelo 3D cortado en capas y transformado a instrucciones GCODE</em></figcaption></figure>

Estas instrucciones siguen las mismas convenciones que las máquinas de corte numérico (CNC) vienen utilizando desde hace años.

## Herramientas de cortado

Son cada vez más las herramientas de software que tenemos a disposición para cortar las piezas. La elección de una depende de los resultados obtenidos con la experiencia. En mi caso me quedo con [Slic3r](http://slic3r.org/), que es la que mejores resultados me ha dado.

<figure class="kg-image-card"><img src="/content/images/2018/08/slic3r.png" class="kg-image"></figure>

También he utilizado [Cura](https://ultimaker.com/en/products/software), [Skeinforge](http://fabmetheus.crsndoo.com/wiki/index.php/Skeinforge) y [KISSlicer](http://kisslicer.com/) con buenos resultados, aunque hay muchos más dando vueltas que no he probado.

La calidad de la pieza final dependerá en gran parte de la configuración de nuestro software de cortado, que consta de varios parámetros que tienen que ver con los componentes de nuestra impresora y el filamento que utilicemos. Mientras mas exactos seamos en especificar los valores, mejor será la calidad de las piezas obtenidas.

Una vez finalizado el proceso de cortado, el software nos generará un archivo con extensión _.gcode_ ya listo para enviar a nuestra impresora.

En mi caso, copio el archivo a una tarjeta de memoria SD que va en el panel LCD, por lo que puedo comenzar la impresión directamente.

Una alternativa es utilizar algún software como [Pronterface](http://www.pronterface.com/) o el propio Cura del que hablamos antes para enviar las instrucciones una a una desde nuestra computadora a la impresora por medio de un cable USB. La desventaja es que tenemos que tener la computadora encendida y conectada a la impresora durante todo el proceso de impresión.

## Limitaciones

La mayor de las limitaciones con la que nos encontramos a la hora de imprimir aparece cuando queremos hacer piezas que tienen partes que «cuelgan».

Me explico: Sabemos que las piezas se forman como resultado de una sucesión de capas apiladas verticalmente. El problema es que estas capas se apoyan una sobre la otra, siendo la capa anterior el soporte de la nueva capa.  
Para el caso de las piezas que tienen partes «colgantes», dado que el plástico está derretido y no tiene soporte donde apoyarse, se cae, deformando la pieza y dando un aspecto no deseado.

<figure class="kg-image-card"><img src="/content/images/2018/08/overhang1.png" class="kg-image"></figure>

En la imagen se observa que en la parte inferior de la letra H hay filamento que a falta de soporte, cayó derretido hacia abajo por efecto de la gravedad. Lo mismo podemos notar en la letra T. A este defecto se le llama «overhang». Para el caso de la letra Y vemos que no hay problemas, porque la transición entre capas es mucho más gradual, permitiendo que la nueva capa no cuelgue tanto.

Para esto existe una solución, y consta de imprimir unos soportes como parte de la pieza que están destinados a sostener las capas del modelo que estén colgando durante el proceso de impresión.

<figure class="kg-image-card"><img src="/content/images/2018/08/support.jpg" class="kg-image"></figure>

Como se ve en la imagen, el material de soporte hace las veces de superficie de apoyo para las capas colgantes, permitiendo que la pieza no se deforme. También se ve cómo la densidad del soporte es mucho menor a la de la pieza en sí. Esto permite que una vez finalizada la impresión, podamos removerlo con poco esfuerzo y sin afectar mucho a la calidad de la pieza final.

# Conclusiones

La contrucción de esta impresora ha sido para mí el mayor de los desafíos a los que me he enfrentado en cuanto a proyectos personales. Es por eso que disfruté tanto todo el proceso. Es curioso, pero me gusta mucho más construirla, calibrarla y mejorarla que imprimir cosas en sí.

Personalmente creo que las impresoras 3D son la próxima gran revolución, y que dentro de un futuro muy cercano todos tendremos una en casa, tal como sucedió con las impresoras de papel.

Ya no más piezas inconseguibes. Se acabó eso de tirar electrodomésticos casi perfectamente funcionales porque no conseguimos el engranaje que hace funcionar X. Basta de pagar precios desorbitados por repuestos.

A partir de ahora tenemos la libertad de crear y materializar cosas que antes sólo podíamos imaginar y ver en la pantalla. Ahora podemos tocarlas, usarlas.

Te reto a que te armes la tuya, pero con una condición: nada de comprarla hecha, que si no no aprendemos nada.

