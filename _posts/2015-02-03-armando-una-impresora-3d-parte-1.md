---
author: matto
title: Armando una Impresora 3D - Parte 1
date: 2015-02-03T19:24:00+01:00
image: 
  path: /images/Prusa-i2-1.jpg
categories:
tags:
- electronica
- impresora-3d
---

> Dada la longitud y complejidad de este proyecto, voy a dividirlo en 3 partes. Esta es la primera de ellas. Ya están disponibles la _[parte 2](https://matto.io/armando-una-impresora-3d-parte-2/)_ y la [parte 3](https://matto.io/armando-una-impresora-3d-parte-3/).

Afortunadamente hoy en día en internet esta TODO, y eso nos da [poder ilimitado](https://en.wikipedia.org/wiki/Scientia_potentia_est).

Siempre lo digo: Me encanta vivir en esta época. Muchas cosas geniales estan pasando. Los desarrolladores de software estamos entendiendo que el conocimiento pertenece a las personas y estamos [compartiendo más](https://github.com), lo que nos lleva a lograr avances más interesantes. [Multimillonarios chiflados que quieren viajar a Marte](https://www.spacex.com/), máquinas autoreplicantes (como la que veremos hoy), [drones civiles](https://www.dji.com/), robótica cada vez mas inteligente y apta para [usos de la vida real](https://www.irobot.com/For-the-Home/Vacuum-Cleaning/Roomba.aspx) y [realidad virtual](https://www.oculus.com/dk2/) convincente entre una infinidad de otras pequeñas revoluciones que están sucediendo en el mundo de la tecnología.

![](/images/3d_printer.png)
## Motivación

[Siempre me gustó mucho la robótica](https://matto.io/seguidor-de-lineas/), pero cada vez que quería empezar algún proyecto me topaba con el mismo problema: las piezas. Los robots normalmente tiene formas complejas y normalmente distintas a las de otros robots, por lo que conseguir una plataforma para un sensor específico o un soporte para un servo es muy complicado.

La idea de construír mi propia impresora 3D surge de dicho problema. Teniendo una herramienta tan potente como esa tendría acceso ilimitado a piezas para construír mis robots (y algunas otras mierdas inservibles) y hasta podría diseñarlas yo mismo.

Claro está que existe infinidad de [modelos comerciales](https://www.makerbot.com/) de estas impresoras que podría comprar hasta en un supermercado, pero ¿donde está la gracia de eso?  
Si te estás preguntando por qué elijo construír mi propia impresora desde cero en vez de comprar una hecha, te pido amablemente que dejes de leer este blog ahora mismo :D

## Investigación

Cada uno de mis proyectos se basa en horas y horas de investigación en internet. Sobre todo cuando se tratan de algo en lo que no tengo la mas mínima experiencia. Este fue uno de esos casos.

Afortunadamente me encontré con el proyecto [RepRap](https://reprap.org/), que es un conjunto de locos dispersados por el mundo que se dedican a compartir conocimiento y experiencia acerca de la fabricación de impresoras 3D.

Dentro de ese proyecto, se encuentra la rama de habla hispana: [Clone Wars](www.reprap.org/wiki/Proyecto_Clone_Wars).

Es a ellos a quienes doy gran crédito de la construcción y configuración de mi impresora, porque sin su información jamás habría logrado hacerlo. En especial al más chiflado de todos: [Obijuan](https://twitter.com/obijuan_cube).

Este señor se ha tomado el increíble trabajo de hacer un detallado [video tutorial](https://www.youtube.com/watch?v=52wb_QHu6zg&list=PLCAQvhl6-PSRHSYWJNJK81KCXl_FGOJ1f) _sobre cómo construír una [Prusa i2](https://reprap.org/wiki/Prusa_Mendel%28iteration_2%29)_.  
Este tutorial consta de 63 partes (sí, 63). Cada una en un video que nos va guiando en orden hasta completar la construcción y el calibrado. La guía se encuentra también en formato web con texto y fotos [en su página personal](https://www.iearobotics.com/wiki/index.php?title=Guia_de_montaje_de_la_Prusa_2).

El dia que me cruce con este hombre le voy a dar un abrazo.

Lo mejor del tema es que todo lo que hay en el proyecto es [Open Source](https://es.wikipedia.org/wiki/Código_abierto), lo que significa que no hay cajas negras. Podemos ver como funciona por dentro, podemos modificar el código, podemos aportar mejoras, podemos cambiar los planos, podemos hacer una versión personalizada a nuestro gusto... todo sin pagar a nadie. Es un proyecto basado en aportes altruistas de la comunidad de makers.

Cuando mas arriba escribía sobre «máquinas autorreplicantes» no estaba desvariando. Es que para construír esta impresora, las piezas que unen la estructura y forman gran parte del mecanismo han sido impresas por otra impresora 3D. Impresoras que imprimen impresoras. ¿Qué tal?

## Presupuesto

El presupuesto aproximado para comprar todo lo que hace falta es de entre 350€ y 400€.

Esto variará dependiendo de la calidad de los componentes y el proveedor donde se compren, pero ese rango de precios es bastance acertado.

También es verdad que con el boom que esta tecnología ha despertado en el mundo, los precios de los componentes no paran de bajar de precio y mejorar.

## Componentes

Para construir una Prusa i2 hace falta una [extensa cantidad de piezas](https://www.nextdayreprap.co.uk/1-0-bill-of-materials-prusa-mendel-build-manual/) que, aunque pueden conseguirse fácilmente, son tantas que lleva un buen tiempo juntarlas todas. Además es muy fácil equivocarse y comprar una medida incorrecta de alguna de ellas.

En mi caso particular, me puse en contacto con una persona que se dedica a juntar todas las piezas, meterlas en una caja y enviarlas por correo.

![](/images/prusa1.jpg)

Me costó algo de 50€ más caro que comprarlo todo por mi cuenta, pero me ahorro tiempo y dolores de cabeza.

![](/images/prusa2.jpg)
_Contenido de la caja con todos los componentes necesarios para armar tu impresora 3D_

Los componentes más importantes son:

- **Fuente** : Mucha gente utiliza [fuentes de ordenadores](https://en.wikipedia.org/wiki/Power_supply_unit_(computer)) de sobremesa, que son muy baratas y confiables. En mi caso utilizo una fuente industrial de 12 volts y 20 amperes de salida.

![](/images/fuente.jpg)

- **Arduino** : Para mi satisfacción el cerebro de este aparato es un [Arduino Mega](https://arduino.cc/en/Main/arduinoBoardMega), y su funcionamiento emula básicamente a una [máquina de corte numérico](https://es.wikipedia.org/wiki/Control_numérico) (CNC), con la diferencia de que agrega el [eje Z](https://www.vitutor.com/analitica/vectores/vectores_espacio.html) al plano de coordenadas.

![](/images/mega.jpg)

- **RAMPS** : Es un [shield](https://arduino.cc/en/Main/ArduinoShields) de Arduino que hace de interfaz para controlar los motores, end-stops, coolers, hot-end y cama caliente. Va montada sobre el Arduino y tiene la capacidad de manejar corrientes bastante altas necesarias para los calentadores y los motores.

![](/images/ramps.jpg)

- **Drivers de motor** : Es lo que nos permite controlar los motores y regular la corriente, velocidad y dirección de cada uno. Necesitamos 5; uno por cada motor. Van montados sobre la RAMPS.

![](/images/pololu.jpg)

- **Extrusor** : Es el mecanismo más importante de la impresora. Fabricado en base a piezas impresas, es el encargado de empujar el filamento hacea adentro del _hot-end_ utilizando uno de los motores para hacer girar el _hobbed bolt_.

![](/images/extrusor.jpg)

- **Hobbed bolt** : Es un tornillo que tiene una ranura dentada en el centro. La cabeza del tornillo encaja en el engranaje principal del extrusor, y al girar, empuja el filamento dentro del hot-end.

![](/images/hobbed.jpg)

- **Motores** : En total hacen falta 5 [motores paso a paso](https://reprap.org/wiki/Stepper_motor). Normalmente de tipo [NEMA 17](https://reprap.org/wiki/NEMA_17_Stepper_motor). Se utiliza uno para el eje X (cama caliente), otro para el eje Y (carro del extrusor en el eje horizontal), dos para el eje Z (carro del extrusor en el eje vertical) y uno para el extrusor (empuja el filamento hacia el interior del hot-end).

![](/images/nema.jpg)

- **Hot-end** : Es la «punta caliente». Se encarga de derretir el filamento usando un [calentador](https://reprap.org/wiki/RepRapPro_Mendel_hot_end_assembly) y reporta su temperatura por medio de un [termistor](https://es.wikipedia.org/wiki/Termistor). Es una de las partes más importantes de la impresora, tanto para su buen funcionamiento como para la calidad de las piezas impresas. Existen de distintos tipos, tamaños y formas. En un principio utilicé un [Farynozzle](https://reprap.org/wiki/Farynozzle2.0/es) que funcionó muy bien por un tiempo, pero empecé a tener atascos de filamento. Intenté con un[M-02](https://www.makeables.nl/products/hot-end-m-02-for-3mm-filament-0-3mm-nozzle/) que nunca funcionó bien, y terminé pasándome a un [E3D v6](https://e3d-online.com/E3D-v6) que es una maravilla (por el momento). Su temperatura de funcionamiento es de 110ºC para PLA y 230ºC para ABS.

![](/images/hot_end.jpg)

- **Boquilla** : Se enrosca en la punta del hot-end y tiene un pequeño agujero por el que sale el plástico derretido. Éste puede ser de distintos diámetros, siendo los mas comunes 0.3mm, 0.4mm y 0.5mm. Actualmente yo utilizo 0.4mm. A menor diámetro, más calidad de las piezas impresas, pero más tiempo de impresión.

![](/images/nozzle.jpg)

- **Filamento** : Es el plástico en bruto que viene enrollado en una bobina. Mientras más pasa el tiempo, mayor es la diversidad de materiales con las que se puede imprimir. Los más utilizados son plásticos de tipo [ABS](https://reprap.org/wiki/ABS) o [PLA](https://reprap.org/wiki/PLA) de varios colores. Cada uno tiene sus características particulares y hay que tenerlas en cuenta a la hora de la configuración. Otra característica es el diámetro del filamento. Los más comunes son de 1.75mm y 3mm. Yo utilizo ABS de 3mm.

![](/images/filamento.jpg)

- **Cama caliente** : También conocida como «heated bed», es una superficie de 200mm X 200mm cubierta con una resistencia que genera calor. Se utiliza para plásticos ABS y su función es la de aminorar la velocidad de enfriamiento del plástico una vez impreso, evitando que la pieza se deforme. Debido a las características térmicas del ABS, éste se contrae cuando se enfría, lo cual afecta a la calidad de las piezas haciendo que se doblen(sobre todo a las de gran superficie). También controlamos su temperatura por medio de un termistor, y trabaja a una temperatura promedio de 110ºC.

![](/images/heated_bed.jpg)

- **Endstops** : También llamados «sensores de fin de carrera». Son simplemente [pulsadores](https://reprap.org/wiki/Endstop) que detectan cuando alguno de los ejes de la impresora ha llegado a su límite y los motores debe detenerse para evitar daños en la estructura.

![](/images/endstop.jpg)

- **LCD** : Normalmente durante el proceso de impresión la impresora debe estar conectada a un ordenador, el cual va dando las instrucciones que tiene que ir siguiendo en cada momento. Con este módulo tenemos la ventaja que la impresora pasa a ser completamente independiente, procesando los archivos que encuentra dentro de una tarjeta SD y mostrándonos información útil por la pantalla. También tiene una rueda de control que nos permite ajustar parámetros, seleccionar los archivos a imprimir, iniciar o detener el proceso, etc. 

![](/images/lcd.jpg)

- **Estructura** : Hace un momento mencioné el tema de las máquinas autorreplicantes. Es para esta parte de la impresora donde hacen falta piezas creadas con otra impresora. Las vigas de la estructura están formadas por [varillas roscadas](https://www.arqhys.com/construccion/varilla-roscada.html)_, pero los elementos que mantienen todo unido, y hasta los engranajes del extrusor están hechos de piezas impresas en 3D. El listado de piezas y sos modelos 3D correspondientes_ [_están disponibles_](https://reprap.org/wiki/Prusa_Mendel%28iteration_2%29#Printed_Parts) _en la página del proyecto RepRap.Estas son sólo las piezas más importantes. Para ver el listado completo, te recomiendo que vayas a la [página de RepRap](https://reprap.org/wiki/Prusa_Mendel%28iteration_2%29)_. 

![](/images/Prusa-i2.jpg)

## Funcionamiento

Ahora que conocemos los nombres de los componentes, el funcionamiento (muy simplificado) es el siguiente:

1. El mecanismo del extrusor empuja el filamento hacia el interior del _hot-end_ valiéndose del _hobbed bolt_ para traccionar.
2. Dentro, el plástico se derrite y sale por la boquilla en un flujo constante.
3. Mientras tanto, la impresora va moviendo la punta del _hot-end_ dibujando la forma que queremos imprimir.
4. El plástico derretido que sale de la boquilla se pega a la base de la _cama caliente_ y va dibujando la primera capa de nuestro modelo 3D.
5. Una vez finalizada la primera capa, el motor que controla el eje Z incrementa levemente la altura del _extrusor_ y todo el proceso comienza nuevamente formando una nueva capa.
6. Los pasos se repiten hasta que la última capa es dibujada y la impresora termina la pieza.

{% include embed/youtube.html id='N3Arm4q7p-g' %}

![](/images/hr.png)

Así finaliza la primera de tres partes de este proyecto. En la siguiente veremos el proceso de construcción y calibración de la impresora.

¿Dudas? ¿Comentarios?
