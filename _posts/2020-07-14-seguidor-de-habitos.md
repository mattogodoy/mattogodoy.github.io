---
layout: post
title: Seguidor de hábitos
date: '2020-07-14 16:19:35'
tags:
- corte-laser
- electronica
---

Este es un proyecto del que ha pasado un tiempo ya, pero no quería dejar de documentarlo.

A fines del año 2018, y como era de esperar dada la época, tocaba empezar a pensar cuál sería el regalo de navidad que haría a Laura. Decidí que a lo mejor sería más valioso regalarle algo hecho por mí en vez de alguna tontería comprada en Amazon.

Por supuesto tenía que contar con algunos requisitos:

- No tenía que ser horrible a la vista
- Claramente algo de electrónica/electricidad tenía que tener
- El diseño tenía que ser 100% mío
- Tenía que tener una utilidad en la vida real

## La idea

Después de mucho pensar, se me ocurrió que Laura tenía algunas tareas diarias que muchas veces se le olvidaban. Buscando por internet me encontré con que ya había soluciones para este tipo de cosas. Están basadas en papel, y se llaman "Habit Trackers"

<figure class="kg-image-card"><img src="/content/images/2020/07/image-1.png" class="kg-image"></figure>

Lo primero que había que solucionar era el tema del papel. ¿¿Papel?? ¿Qué estamos, en 1870?

## Planificación

Quería que sobre todas las cosas primase la sencillez. Tenía que ser práctico y fácil de usar. Basándome en esa premisa decidí que este sería un calendario de un mes completo, y que sólo podría llevar la cuenta de una tarea.

Al ser un calendario de un sólo mes, y dado que dependiendo del año y del mes actual la distribución de días cambia, el orden de los días tenía que estar bien pensado antes de empezar. Para ello hice una planilla con todas las combinaciones posibles:

<figure class="kg-image-card"><img src="/content/images/2020/07/image-3.png" class="kg-image"></figure>

Dado un mes de 31 días (el mas largo posible), el día 1 podría caer en Lunes, Martes, etc. Esto nos da 7 combinaciones diferentes, y necesitamos cubrir todos los casos. En color naranja dibujé una plantilla con la que es posible cubrir cualquier mes de cualquier año, independientemente del día de la semana en que empiece.

## Funcionalidad

Ya tenía la estructura, ahora tenía que decidir cómo iba a fabricar este calendario.

El funcionamiento es simple: Tiene que haber algo que te indique en el calendario si el día en el que estás ya has completado la tarea que te has propuesto cumplir o si todavía está pendiente.

Estuve evaluando utilizar LEDs. Poner uno por día del calendario y que esté encendido si has cumplido con la tarea, o apagado si todavía no lo has hecho. El problema es que para encender o apagar cada LED tendría que haber un botón debajo de cada uno, y para mantener el estado tendría que haber un microcontrolador detrás que lleve la cuenta, pero que al desenchufarlo perdería la información que habías puesto antes. Eso se podría solucionar con una memoria EEPROM, pero esto ya se estaba complicando más de lo que tenía planeado inicialmente.

En un ataque de pragmatismo, me di cuenta de que simplemente usando interruptores de esos que traen una luz que al estar activados se enciende, y al desactivarlos se apaga, solucionaría el problema de la manera más simple.

Inicialmente pensé en usar interruptores de este tipo:

<figure class="kg-image-card"><img src="/content/images/2020/07/image-4.png" class="kg-image"></figure>

pero después de pensarlo un poco me di cuenta de que no sería muy agradable a la vista y que a lo mejor hasta podría ser incómodo de usar.

Finalmente me decanté por estos:

<figure class="kg-image-card"><img src="/content/images/2020/07/image-5.png" class="kg-image"></figure>
## Diseño

Como dije antes, el diseño tendría que ser propio. En ese momento todavía no tenía mi fresadora CNC, por lo que opté por hacer el diseño en Autocad y enviarlo a una empresa de corte láser.

Después de incontables horas de aprender a usar Autocad a base de golpes, terminé con esto:

<figure class="kg-image-card"><img src="/content/images/2020/07/Screenshot-2020-07-14-at-16.56.56.png" class="kg-image"><figcaption>Los bordes rojos indican que hay que cortar por ese contorno. Los morados y los verdes significan que es un grabado.</figcaption></figure>

Como se ve en la imagen, diseñé un calendario con la disposición que había calculado antes, añadí los días de la semana y alguna que otra decoración. Los rectángulos que se ven en los laterales son para hacer una especie de caja.

El material que elegí para el calendario fue madera de Abedul de 4mm de grosor.

## Fabricación

Generalmente suelo hacer fotos de todo lo que puedo durante el proceso de fabricación de mis proyectos, pero en este caso lamentablemente se me pasó sacar alguna en el momento en que me entregaron los materiales cortados.

De todas maneras aquí hay algunas del resto del proceso:

<figure class="kg-image-card"><img src="/content/images/2020/07/20181218_204514.jpg" class="kg-image"><figcaption>Instalación de los botones</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2020/07/20181218_204523.jpg" class="kg-image"><figcaption>Parte frontal con todos los botones en su lugar</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2020/07/20181218_213437.jpg" class="kg-image"><figcaption>Cableado de todos los botones usando una línea en común para el positivo y otra para el negativo. Al estar en diferentes alturas y al ser un cable relativamente rígido, no se pueden tocar entre sí.</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2020/07/20181218_213243.jpg" class="kg-image"><figcaption>Primera prueba de funcionamiento.</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2020/07/20181218_225819.jpg" class="kg-image"><figcaption>Añadiendo los laterales de la caja y el conector para el transformador de 12 volts que daría energía a todo el sistema.</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2020/07/20181218_230124.jpg" class="kg-image"><figcaption>Terminado!</figcaption></figure>

Para dar un toque más agradable, pinté la caja con tinte especial para maderas que le da un toque más oscuro y resalta mejor las vetas.

## Conclusión

De esto han pasado ya casi 2 años, y me alegra saber que a día de hoy Laura utiliza su seguidor de hábitos todos los días.

<figure class="kg-image-card"><img src="/content/images/2020/07/image-6.png" class="kg-image"><figcaption>Foto tomada casi 2 años después de terminado el proyecto.</figcaption></figure>

A lo mejor tendría que fabricar uno para mí, para hacerme al hábito de escribir más seguido en este blog...

