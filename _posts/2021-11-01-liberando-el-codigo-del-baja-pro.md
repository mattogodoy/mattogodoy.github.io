---
layout: post
title: Liberando el código del Baja Pro
date: '2021-11-01 16:23:58'
---

> This article is also [available in English](https://matto.io/open-sourcing-the-baja-pro/) 🇬🇧

He decidido liberar el código y todos los esquemas del proyecto al que más tiempo y trabajo he dedicado en mi vida. En este post te contaré cual es mi motivación para hacerlo.

[https://github.com/mattogodoy/open-rally-computer](https://github.com/mattogodoy/open-rally-computer)

# Índice

- [Un poco de historia](#un-poco-de-historia)
- [Prototipo inicial](#prototipo-inicial)
- [Versión 1](#versi-n-1)
  - [La marca](#la-marca)
  - [Pantalla](#pantalla)
  - [Microcontrolador](#microcontrolador)
  - [GPS](#gps)
  - [Prototipo](#prototipo)
  - [Pruebas](#pruebas)
  - [Circuito impreso](#circuito-impreso)
  - [Caja](#caja)
  - [Mando](#mando)
  - [Resultado final](#resultado-final)
- [Versión 2](#versi-n-2)
  - [Nueva caja](#nueva-caja)
  - [Nueva PCB](#nueva-pcb)
  - [Nueva interfaz de usuario](#nueva-interfaz-de-usuario)
  - [Resultado final](#resultado-final-1)
- [Versión 3](#versi-n-3)
  - [Nueva pantalla](#nueva-pantalla)
  - [Nueva PCB](#nueva-pcb-1)
  - [Nueva antena GPS](#nueva-antena-gps)
  - [Resultado final](#resultado-final-2)
- [Versión 4](#versi-n-4)
  - [Nuevo módulo GPS](#nuevo-m-dulo-gps)
  - [Nueva PCB](#nueva-pcb-2)
  - [Cambio de tipo de microcontrolador](#cambio-de-tipo-de-microcontrolador)
  - [Memoria](#memoria)
  - [Actualizaciones OTA](#actualizaciones-ota)
  - [Nuevos conectores](#nuevos-conectores)
  - [Nuevo mando](#nuevo-mando)
  - [Mejoras en la caja](#mejoras-en-la-caja)
  - [Resultado final](#resultado-final-3)
- [La web](#la-web)
- [Las primeras (y únicas) unidades](#las-primeras-y-nicas-unidades)
- [El momento de la venta](#el-momento-de-la-venta)
- [La experiencia](#la-experiencia)
  - [Componentes](#Componentes)
  - [Tiempo y complejidad](#tiempo-y-complejidad)
  - [Fiscalidad](#fiscalidad)
  - [Precio](#precio)
- [Aprendizaje](#aprendizaje)
- [Liberando el código](#liberando-el-c-digo)
- [Presentando a Open Rally Computer](#presentando-a-open-rally-computer)
  - [Licencia](#licencia)
- [Conclusión](#conclusi-n)

* * *

# Un poco de historia

Soy un amante de las motos desde que tengo uso de razón. Lo primero que hice cuando conseguí mi primer trabajo (a los 18 años) fue comprarme una moto.

Desde entonces nunca he dejado de disfrutar de las sensaciones y la libertad que sólo una moto (y tal vez un avión de caza) te pueden dar.

Fue en el año 2015 cuando me compré mi primera moto con capacidades para meterme por campo. Hasta entonces había tenido exclusivamente motos de carretera, y no sabía de lo que me estaba perdiendo.

Fue durante ese mismo año que me dispuse a buscar compañeros de ruta y mentores de lo que para mí era algo completamente nuevo. En esa búsqueda me encontré con el [Motoclub Trail Madrid](http://trailmadrid.es/), un foro en el que conoces gente del mundillo y donde he hecho grandes amigos con los que a día de hoy sigo compartiendo salidas.

Fue por culpa de (o gracias a?) estos amigos que me enganché con los rallies de [navegación con roadbook](https://www.youtube.com/watch?v=gUxTGKPrCos). Una de las primeras cosas que noté fue que el coste de los equipos necesarios para participar de este tipo de eventos era demasiado elevado, sobre todo para un piloto principiante como yo.

# Prototipo inicial

Uno de mis tantos hobbies es la electrónica y siempre me han gustado los desafíos con los que pueda aprender cosas nuevas, por lo que me dispuse a fabricar mis propios equipos. Incluso [escribí un post al respecto en este mismo blog](https://matto.io/roadbook-con-tripmaster/).

Lo más importante que salió de ese proyecto fue el tripmaster, que desde un primer momento fue de [código abierto](https://github.com/mattogodoy/open-trip) para que cualquier persona interesada pudiera fabricarse uno.

<figure class="kg-image-card"><img src="/content/images/2021/11/image-1.png" class="kg-image"><figcaption>Primer prototipo de tripmaster</figcaption></figure>

Esta versión inicial utilizaba un sensor magnético que iba instalado en la pinza de freno de la rueda delantera. Combinado con un imán que iba instalado en la rueda, era capaz de detectar cada vez que la rueda hacía un giro completo. Multiplicando la cantidad de vueltas por la circunferencia de la rueda obtenía la distancia recorrida. Si a eso le sumamos el tiempo, también era capaz de calcular la velocidad.

Para marcar el rumbo disponía de un magnetómetro digital.

El primer prototipo funcionó muy bien, incluso lo usé para correr algunos rallies, pero quería llevar el proyecto un poco más allá.

# Versión 1

Una nueva versión implicaba un rediseño total del tripmaster, dejando atrás todo lo que había hecho en la versión anterior.

Este cambio, sumado a la gran demanda que recibía por parte de amigos y conocidos para fabricar tripmasters me llevó a pensar que podría desarrollar un producto decente y comercializarlo, por lo que en ese momento decidí no liberar los esquemas ni el código fuente. A partir de entonces, era un proyecto privado.

### La marca

Si quería emprender un nuevo proyecto, tenía que pensar en una marca y en un nombre para el modelo del tripmaster.

Inspirado por el famoso rally [Baja 1000](https://es.wikipedia.org/wiki/Baja_1000), decidí que el nombre de mi marca sería **Baja Rally Computers**. Mi gran amigo Jaime de [Cabras Sobre Ruedas](https://www.youtube.com/c/CabrasSobreRuedasLaAventuraEmpiezaAqui) diseñó un logo para el proyecto que a día de hoy todavía me encanta:

<figure class="kg-image-card"><img src="/content/images/2021/11/working.png" class="kg-image"><figcaption>Logotipo de Baja Rally Computers</figcaption></figure>

En cuanto al modelo, este sería el **Pro** , por lo que de ahora en adelante, me referiré al tripmaster como **Baja Pro**.

### Pantalla

Las pantallas del prototipo inicial eran del tipo "7 segmentos", como las calculadoras antiguas. Esto tiene varias limitaciones, siendo la primera que sólo permiten mostrar números. Además el uso del espacio no es muy eficiente.

Una de las cosas que más me costó entender cuando descubrí los equipos de navegación con roadbook es que los tripmasters de las marcas más conocidas (ICO, RNS, etc) sólo muestran 1 dato a la vez: &nbsp;distancia velocidad o rumbo. Es decir, no sólo son tremendamente caros sino que además tienes que comprar 2 (generalmente quieres saber distancia y rumbo en todo momento).

<figure class="kg-image-card"><img src="/content/images/2021/11/image-2.png" class="kg-image"><figcaption>Configuración estándar: Dos tripmasters y un porta-roadbook</figcaption></figure>

Para esta nueva versión quería utilizar alguna pantalla que me permita mostrar más información, y de esa manera utilizar sólo 1 dispositivo para ver ambos datos.

Esto me llevó a una espiral de locura interminable en la que pasé muchísimas horas comparando diferentes tipos de pantallas y probándolas todas para ver cuál era la que más se adecuaba a mis necesidades. Debo haber probado al menos 8 tipos de pantallas diferentes (LCD, OLED, tinta electrónica, etc.).

Mi requisito principal es que la información sea altamente visible en condiciones de sol directo sobre la pantalla (que es lo normal durante un rally). Esto resultó ser bastante complicado, porque las pantallas que más prestaciones me daban y más fáciles eran de implementar, prácticamente no se veían al sol directo.

<figure class="kg-image-card"><img src="/content/images/2021/11/20170610_132138.jpg" class="kg-image"><figcaption>Comparación de una pantalla OLED (a la izquierda) con una de tinta electrónica (a la derecha) bajo la luz directa del sol</figcaption></figure>

Mi opción preferida era la pantalla de tinta electrónica. Su mayor cualidad es que mientras más sol haya, mejor se ve. Como si fuese tinta impresa en un papel.

<figure class="kg-image-card"><img src="/content/images/2021/11/20170613_210925-1.jpg" class="kg-image"><figcaption>Probando una pantalla de tinta electrónica</figcaption></figure>

Pero estas pantallas tienen una gran desventaja: No tienen una velocidad de refresco muy alta. Cada vez que quieres cambiar algo de lo que estás mostrando, hay que hacer un proceso de "borrado" primero y luego mostrarlo. Cualquiera que tenga un lector de libros electrónico sabe de lo que estoy hablando. Si quisiéramos saltarnos el paso del borrado y simplemente mostramos la información (por ejemplo, un número cambiando), sucede lo que se conoce como "ghosting" y es lo que se puede apreciar en la imagen anterior.  
Otra desventaja es que las pantallas de tinta electrónica cuestan unas 10 veces más caras que el resto de opciones.

Al final, luego de mucho investigar, probar y debatir conmigo mismo, terminé decidiéndome por una pantalla de LCD de 128 por 64 pixeles.  
Esta pantalla combina las ventajas de las de 7 segmentos, que se ven perfectamente al sol, con las del resto que permiten dibujar cosas más complejas. Además, tienen como ventaja añadida una luz de fondo que permite ver la pantalla en plena oscuridad.

<figure class="kg-image-card"><img src="/content/images/2021/11/20170622_183232.jpg" class="kg-image"><figcaption>Pantalla LCD 128x64</figcaption></figure>

Como se ve en la foto, en este punto ya estaba mostrando varios datos a la vez en la misma pantalla.

### Microcontrolador

El cerebro del prototipo del tripmaster era un [Arduino Nano](https://www.arduino.cc/en/pmwiki.php?n=Main/ArduinoBoardNano); un microcontrolador muy simple y muy económico que cumplía con su función a la perfección.

Para esta nueva versión, al tener unos requisitos más exigentes como la nueva pantalla o el módulo GPS, necesitaba algo más potente.

Me decanté por el [ESP32](https://www.espressif.com/en/products/socs/esp32), un microcontrolador de la empresa Esperessif que no sólo es mucho más potente que el Arduino Nano, sino que además dispone de capacidades para WiFi y Bluetooth.

### GPS

Por otra parte, el uso de un sensor magnético para calcular los datos, si bien es bastante preciso, tiene algunas desventajas. Sobre todo cuando va montado en una moto de campo que está constantemente expuesta a los elementos y al maltrato.

Fue por ello que decidí implementar un módulo GPS en su lugar. De esta forma podría calcular los mismos datos (y algunos más) de manera más precisa y completamente integrada dentro de la misma caja, sin necesidad de un sensor externo.

Este cambio implicó bastantes horas invertidas en aprender cómo funciona el sistema de GPS (he hecho un [episodio completo de mi podcast dedicado a este tema](https://bucleinfinito.pinecast.co/episode/b026f728de464fee/76-sistemas-de-posicionamiento-global)) y cómo comunicarme con el módulo receptor.

<figure class="kg-image-card"><img src="/content/images/2021/11/20170729_205440.jpg" class="kg-image"><figcaption>Implementando el módulo GPS</figcaption></figure>

La gran desventaja del GPS es que al pasar por túneles o zonas muy cerradas, se pierde la señal y dejamos de obtener datos de distancia. Mi solución a este problema fue guardar el último punto donde perdí la señal (punto A), y al recuperar la señal luego de salir del túnel (punto B), calcular la distancia en línea recta entre el punto A y el B. No es un valor muy exacto, pero rara vez los túneles tienen curvas dentro, por lo que sigue manteniendo una precisión más que aceptable en esa situación.

### Prototipo

Llegado este punto, ya tenía en mis manos el primer prototipo funcional de Baja Pro v1. Todavía no había diseñado un circuito impreso para el proyecto (ni sabía tampoco cómo hacerlo), pero tenía todo soldado en una placa de prototipado, también conocida como "perfboard".

<figure class="kg-image-card"><img src="/content/images/2021/11/20170820_213527.jpg" class="kg-image"><figcaption>Prototipo del primer Baja Pro</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20170820_213536.jpg" class="kg-image"><figcaption>Prototipo del primer Baja Pro</figcaption></figure>
### Pruebas

Para comprobar que el Baja Pro se comportaría según lo esperado en una situación real, lo instalé de manera precaria en mi moto y lo llevé todos los días al trabajo durante una semana.

En esos trayectos iba verificando que los valores de distancia, tiempo y velocidad se correspondían con los valores que indicaba mi Garmin GPSMAP64.

<figure class="kg-image-card"><img src="/content/images/2021/11/20170821_090302.jpg" class="kg-image"><figcaption>Primeras pruebas del prototipo</figcaption></figure>

Para mi sorpresa, los resultados eran prácticamente idénticos. No podía estar más contento.

### Circuito impreso

Una vez afinado el prototipo, y sabiendo que funcionaba correctamente, era hora de diseñar una placa de circuito impreso (PCB) para instalar los componentes de una manera más profesional.

Hasta entonces yo nunca había diseñado una PCB, ni tenía idea de cómo era el proceso. Aprender esto me llevó bastantes horas, pero luego de un tiempo logré hacer los primeros diagramas y los mandé a fabricar a China.

El resultado fueron las primeras PCBs que había diseñado en mi vida:

<figure class="kg-image-card"><img src="/content/images/2021/11/20171003_110333.jpg" class="kg-image"><figcaption>Placas de circuito impreso de la versión 1 del Baja Pro</figcaption></figure>

Como era de esperar, tuve un par de errores en el diseño de esta versión, siendo el más grave que me equivoqué al trazar los circuitos del conector de la pantalla y los puse todos al revés, en espejo 🤦🏻

Como extra, añadí puertos para conectar un termistor, porque siempre me ha gustado saber la temperatura exterior.

### Caja

Para esta primera versión diseñé una caja que imprimí en 3D con un filamento reforzado (ASA) y pinté con una especie de epoxy especial para piezas impresas en 3D para hacerlo impermeable. El acabado no era especialmente bonito, pero cumplía con su función.

<figure class="kg-image-card"><img src="/content/images/2021/11/20171113_005023.jpg" class="kg-image"><figcaption>Parte trasera de la caja impresa en 3D</figcaption></figure>

En esta foto se aprecian también los primeros conectores que utilicé. Si bien eran perfectamente válidos e impermeables, no daban mucho aspecto de calidad.

### Mando

En el prototipo inicial había diseñado una botonera impresa en 3D, pero luego de mucho buscar por internet di con un diseño muy compacto y simple que servía perfectamente para lo que yo necesitaba: 3 botones (dos delante y uno detrás).

<figure class="kg-image-card"><img src="/content/images/2021/11/20191215_132227.jpg" class="kg-image"></figure>

De todas maneras, los botones que traía este mando (los que se ven en la foto) no eran los indicados. Los reemplacé todos por otros de mayor calidad porque tenían que ser impermeables al agua y el polvo.

### Resultado final

Combinando todos estos cambios con la nueva PCB obtuve lo que sería un Baja Pro v1 terminado.

<figure class="kg-image-card"><img src="/content/images/2021/11/20171026_223420.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20171026_223438.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20171113_004815.jpg" class="kg-image"></figure>

Algunos amigos me pidieron que les fabrique una unidad, por lo que hice unas 4 o 5 y se las vendí a precio de coste.

A día de hoy, un par de ellos las tienen funcionando luego de muchos años y rallies a cuestas. Eso si, han tenido que repararlos más de una vez :)

# Versión 2

El uso de la versión 1 en un entorno real me enseñó muchas cosas, siendo la principal que las condiciones a las que son sometidos los aparatos electrónicos que van en una moto de rally son mucho más extremas de lo que yo habría imaginado.

Vibraciones, golpes, agua, tierra, piedras, calor y frío son algunas de las cosas que tiene que soportar el Baja Pro para estar a la altura.

### Nueva caja

Por los motivos descritos anteriormente, me di cuenta de que lo primero que tendría que hacer sería reemplazar la caja por una mucho más resistente.

No puedo describir con palabras la cantidad de tiempo, investigación, emails y dolores de cabeza que me supuso encontrar una caja que se adapte a mis necesidades. Este es un problema que describo en detalle en [otro episodio de mi podcast](https://bucleinfinito.pinecast.co/episode/e66c4ae1d55348ec/62-fabricaci-n-de-nivel-2), por si alguien está interesado.

Finalmente no pude encontrar una caja que se adapte a mis necesidades (ni podía permitirme mandar a fabricar una de plástico inyectado a medida), por lo que terminé diseñando la mía propia, que constaba de varias capas de metacrilato cortado con láser, que apiladas formaban el volumen del Baja Pro.

<figure class="kg-image-card"><img src="/content/images/2021/11/20180407_011501.jpg" class="kg-image"></figure>

Además utilicé un metacrilato transparente rugoso como protector de la pantalla. Esta rugosidad permitía que se vean los números perfectamente, pero además eliminaba gran parte del reflejo producido por el sol.

### Nueva PCB

Para esta segunda versión diseñé una nueva PCB con algunos cambios:

- Nueva distribución de los componentes
- Espacio dedicado para la antena del GPS
- Espacio dedicado para el termistor
- Protección contra polaridad invertida
- Corrección del error de la posición de los pines de la pantalla
<figure class="kg-image-card"><img src="/content/images/2021/11/20180219_192442.jpg" class="kg-image"><figcaption>Placa de circuito impreso de la versión 2 del Baja Pro</figcaption></figure>
### Nueva interfaz de usuario

Sin dudas el cambio más significativo de esta versión fue la interfaz de usuario.

Dediqué muchísimo tiempo a diseñar una interfaz más agradable y usable en la que los datos se veían de manera mucho mas clara y el acceso a la información era mucho más rápido.

### Resultado final

Nuevamente, algunos amigos me pidieron que fabrique unidades para ellos (por supuesto, a precio de coste) por lo que hice 7 unidades. Una de ellas tenía la pantalla azul porque era para una moto Yamaha.

<figure class="kg-image-card"><img src="/content/images/2021/11/20180506_184222.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20180506_184243.jpg" class="kg-image"><figcaption>Segunda versión de la PCB ya montada</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20180413_144234.jpg" class="kg-image"><figcaption>Versión terminada del Baja Pro v2</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20180413_144240.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20180525_182705.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20180524_232802.jpg" class="kg-image"></figure>

De esta versión sólo hubo una tirada de 7 unidades.

<figure class="kg-embed-card"><iframe width="200" height="113" src="https://www.youtube.com/embed/GV5TdtcInaw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><figcaption>Una explicación de las funcionalidades</figcaption></figure>
# Versión 3

Luego de muchas pruebas con la versión 2 del Baja Pro llegamos a la conclusión de que, si bien el tripmaster funcionaba como era esperado, la caja era demasiado grande y pesada para montarla en la moto. Tenía que encontrar una solución al bendito problema de las cajas, cuya búsqueda nunca había cesado desde los comienzos del proyecto.

Luego de comprar muchas cajas para proyectos electrónicos y ver que no eran lo que yo buscaba, di con la solución: la [Retex Serie 32](https://www.retex.es/producto/serie-32/).

<figure class="kg-image-card"><img src="/content/images/2021/11/image-4.png" class="kg-image"></figure>

Esta caja no sólo era lo suficientemente robusta como para aguantar golpes y vibraciones, sino que además trae una junta de goma que la hace resistente al agua.

En cuanto al tamaño, es bastante pequeña, pero el hecho de que lo sea me empujó a llevar la electrónica de mi proyecto un paso más allá; tuve que buscar una pantalla más pequeña que entre dentro de la caja, cambiar la antena del módulo GPS por una más pequeña y cambiar varios componentes convencionales por sus equivalentes de montaje superficial para ahorrar espacio. Todo esto, acompañado de una nueva versión del circuito impreso que se adapte al interior de la caja.

### Nueva pantalla

Para lograr que toda la electrónica entre dentro de la nueva caja, tuve que buscar una alternativa a la pantalla que estaba utilizando, que era bastante grande.

Luego de mucho buscar, di con el modelo [ERC12864](https://www.displayfuture.com/Display/datasheet/monographic/ERC12864-4.pdf), una pantalla que se adaptaba perfectamente a mis necesidades: muy plana, 128x64 pixeles y retroiluminación integrada.

<figure class="kg-image-card"><img src="/content/images/2021/11/20181008_203729.jpg" class="kg-image"><figcaption>Nueva pantalla ERC12864</figcaption></figure>

Hacerla funcionar me llevó un tiempo, pero siguiendo las instrucciones indicadas en la hoja de datos del fabricante funcionó a la perfección.

Esta pantalla, al ser tan pequeña, no incluye algunos componentes electrónicos que la otra ya traía de serie, por lo que tuve que hacer espacio para varios condensadores y resistencias en la nueva placa.

### Nueva PCB

Tantos cambios en los componentes requería de una nueva placa de circuito impreso. Además tenía que adaptarla para que entre dentro de la nueva caja.

Para comprobar que meter tantos componentes en un espacio tan reducido era posible, hice primero un prototipo en perfboard de lo que sería la nueva placa.

<figure class="kg-image-card"><img src="/content/images/2021/11/20181010_082900.jpg" class="kg-image"><figcaption>Muy feo, lo sé :)</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20181010_082853.jpg" class="kg-image"><figcaption>Prototipo de PCB v3</figcaption></figure>

Una vez confirmado que el tamaño era el correcto, procedí a diseñar la placa y fabricarla.

<figure class="kg-image-card"><img src="/content/images/2021/11/20181105_221904.jpg" class="kg-image"><figcaption>Tercera versión del circuito impreso del Baja Pro</figcaption></figure>

Esta versión estaba específicamente diseñada para entrar dentro de la nueva caja y ser atornillada en los soportes que venían incluidos dentro de la propia caja.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190101_163753.jpg" class="kg-image"><figcaption>La nueva placa dentro de su caja</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20190111_195320.jpg" class="kg-image"><figcaption>El lateral de la caja con un baja montado. Aquí se aprecia hasta qué punto he tenido que miniaturizar los componentes</figcaption></figure>

### Nueva antena GPS

Dado que el espacio de la nueva caja era mucho más reducido, la antena de GPS que estaba utilizando hasta entonces ya no era una opción. Encontré una alternativa mucho más pequeña y que funcionaba prácticamente igual de bien. La ventaja es que con la nueva ubicación, esta antena apuntaba hacia el cielo como es recomendado.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190114_104723.jpg" class="kg-image"><figcaption>La nueva antena GPS (arriba a la izquierda)</figcaption></figure>
### Resultado final

Con esto ya tenía una versión muy robusta y del tamaño que estaba buscando. Todo entraba correctamente en la caja y funcionaba como debía.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190101_173942.jpg" class="kg-image"><figcaption>El primer Baja Pro v3</figcaption></figure>
# Versión 4

Una vez tuve la versión 3 funcionando y bien probada, decidí hacer la que sería la versión definitiva. La que saldría a la venta.

Esta tendría que ser la versión más "profesional" de todas y tener unos acabados de mayor calidad, tanto por dentro como por fuera.

### Nuevo módulo GPS

Para esta versión decidí cambiar el módulo GPS por uno que no solo soportaba la red convencional de satélites de GPS, sino que además soportaba Glonass (sistema ruso), Galileo (sistema europeo) y Beidou (sistema chino), con lo que la velocidad para obtener un fix de GPS era mucho mejor, y el margen de error bastante menor.

Todo esto en un componente que no además de traer la antena integrada, tenía un tamaño mucho menor.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190401_181447.jpg" class="kg-image"><figcaption>A la izquierda el nuevo módulo. A la derecha el anterior.</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20190401_181438.jpg" class="kg-image"><figcaption>A la izquierda el nuevo módulo. A la derecha el anterior.</figcaption></figure>
### Nueva PCB

Como el nuevo módulo traía la antena integrada, tuve que rediseñar el circuito impreso para hacerle lugar. Lo que se me ocurrió fue hacer un hueco en la placa donde ubicar el módulo. Era la única manera de poder instalarlo dentro del espacio tan reducido de la caja.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190505_170435.jpg" class="kg-image"><figcaption>Nueva PCB para la versión 4, con su hueco para el módulo GPS.</figcaption></figure>
### Cambio de tipo de microcontrolador

Hasta ahora venía usando lo que se conoce como un "kit de desarrollo" (o devkit) del ESP32 (el microcontrolador). Este kit esta pensado para simplificar la vida a la gente que hace proyectos como el mío. Básicamente es un ESP32 con varios componentes extra que permiten programarlo por USB, acceder a algunos de sus pines, resetearlo, etc.

Como el cambio de módulo GPS me obligó a rediseñar la placa, aproveché para hacer lo que quería desde hace mucho tiempo: Implementar el ESP32 directamente, sin devkit. La ventaja de hacerlo así es que el espacio que ocupa es mucho menor.

<figure class="kg-image-card"><img src="/content/images/2021/11/20211108_212101.jpg" class="kg-image"><figcaption>A la izquierda el devkit que venía usando hasta ahora. A la derecha el módulo que empecé a utilizar en la versión 4.</figcaption></figure>

Si bien esto añade un poco de complejidad, da un acabado más limpio y compacto y ahorra mucho espacio.

### Memoria

El tema de la memoria fue otro de esos grandes desafíos que me llevó a aprender muchísimo sobre un tema del que no tenía intenciones de instruirme.

El Baja Pro tenía que almacenar información de alguna manera. Los datos de distancia total, distancia parcial, velocidad promedio, velocidad máxima, configuración etc. no se podían perder cada vez que el piloto apaga la moto.

Hasta entonces, estos valores se almacenaban en una memoria interna del ESP32 que se llama EEPROM. El problema es que esta memoria “se gasta”. Tiene una cantidad limitada de ciclos de escritura (100.000 ciclos aproximadamente), luego de las cuales empieza a dar fallos.

Inicialmente para solucionar este problema, en vez de guardar los datos de manera periódica, lo que hacía era guardarlos cuando detectaba que la moto se había detenido (en base a los datos de velocidad del GPS). Esto ahorraba muchísimos ciclos de escritura en memoria, pero tenía un problema muy grande: Muchos pilotos están acostumbrados a apagar sus motos cuando todavía están en marcha y llegar al destino con el envión. Al apagar la moto se apagaba también el Baja Pro, y éste no había detectado que la moto se había detenido porque la velocidad no había llegado a 0 km/h. Lo que sucedía entonces era que se perdían todos los datos que se habían acumulado hasta entonces. Esto en un rally de navegación en el que dependes de esos datos, es inaceptable.

Pasé mucho tiempo pensando en una solución e investigando alternativas para ver cómo almacenar datos de manera fiable.

Finalmente llegué a una alternativa que es la utilizada por la industria automotriz para solucionar problemas de este tipo. Es una memoria bastante moderna fabricada por Texas Instruments que se llama FRAM (un acrónimo para Ferroelectric Random Access Memory).

<figure class="kg-image-card"><img src="/content/images/2021/11/20190125_203619.jpg" class="kg-image"><figcaption>Un módulo de FRAM</figcaption></figure>

La memoria FRAM garantiza 100 **trillones** de ciclos de escritura, y mantener los datos almacenados por un periodo de 100 años. Increíble.

Evidentemente esta memoria es mucho más cara que una EEPROM convencional, pero es justo lo que necesitaba. A partir de ese momento ya podia almacenar los datos de manera periódica sin miedo a desgastar la memoria. Problema solucionado.

### Actualizaciones OTA

Otra cosa que tenía en mente desde hace tiempo era la posibilidad de actualizar la versión del firmware del Baja Pro de manera inalámbrica.

Como ya comenté anteriormente, el ESP32 tiene la capacidad de conectarse por WiFi. Esto es una gran ventaja, porque nos permitiría comunicarnos con un servidor para ver si hay actualizaciones, y en caso de haberlas, descargarlas.

Como el Baja Pro sólo se controla con 3 botones, poner la contraseña de una red WiFi no sería tarea fácil. En primer lugar tendría que programar una interfaz gráfica de un teclado sólo para esta funcionalidad. Luego tendría que implementar una especie de "wizard" que te guíe a través de los pasos de la conexión a internet. Muy complicado e incómodo para el usuario.

Después de mucho pensarlo se me ocurrió que podía hacerlo al revés. El Baja Pro intentaría conectarse siempre a una red WiFi con un nombre y una contraseña predefinidos. Entonces para actualizarlo, lo único que habría que hacer es crear dicha red con dicha contraseña con tu teléfono móvil, y el Baja Pro se conectaría a ella y bajaría la actualización automáticamente. Simple.

### Nuevos conectores

Continuando con la búsqueda de un acabado más profesional, lo siguiente que decidí mejorar fueron los conectores de la electricidad y el mando.

Tras mucho investigar, me decidí por que se conocen como "conectores M8".

<figure class="kg-image-card"><img src="/content/images/2021/11/20211108_214204.jpg" class="kg-image"><figcaption>Conectores de tipo M8 de 4 y 3 pines respectivamente</figcaption></figure>

Estos conectores no solo eran de mucha mayor calidad respecto a los anteriores, sino que además son un estándar en el mundo de los tripmasters. Esto me permitió hacer que el Baja Pro sea compatible con alguna instalación ya existente en una moto. La idea era que cualquier piloto pudiese reemplazar un ICO por un Baja Pro y viceversa sin tener que cambiar todo el cableado de la moto.

### Nuevo mando

Ya puestos a cambiar cosas, decidí también mejorar la calidad del mando del Baja Pro.

Anteriormente utilizaba una versión de plástico. A partir de ahora pasaría a ser de metal y tendría el nuevo conector.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190517_204614.jpg" class="kg-image"><figcaption>Nueva versión del mando hecho de metal y con el nuevo conector</figcaption></figure>

### Mejoras en la caja

Como he mencionado anteriormente, la caja necesitaba una "ventana" para que la pantalla del Baja Pro quede visible. Hasta ahora había estado cortando esta ventana a mano con unos resultados desastrosos. Tenia que hacer algo.

<figure class="kg-image-card"><img src="/content/images/2021/11/20181121_210944.jpg" class="kg-image"><figcaption>Un template del tamaño de la ventana de la caja</figcaption></figure>

Se podría decir que utilicé el tema de las cajas como una excusa para algo que quería hacer desde hacía ya mucho tiempo: comprar una fresadora CNC.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190407_203607.jpg" class="kg-image"><figcaption>Mi nueva fresadora CNC</figcaption></figure>

Si bien es una máquina muy pequeña, esto me permitiría cortar las ventanas en las cajas con una precisión muy superior a la que venía teniendo hasta ahora.

Para ello, fabriqué con la propia fresadora un soporte que mantendría a la caja bien sujeta siempre en el mismo lugar, lo que me permitiría automatizar el proceso de corte.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190416_193347.jpg" class="kg-image"><figcaption>Cortando la ventana en una caja</figcaption></figure>

Además de las cajas, la fresadora me permitiría cortar el protector de pantalla de metacrilato a un tamaño que encajaría perfectamente.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190416_211158.jpg" class="kg-image"><figcaption>Caja y protector de pantalla cortados con la fresadora CNC</figcaption></figure>

Cuando gané un poco más de experiencia con la máquina, me animé a grabar el logo de Baja en el propio protector de la pantalla:

<figure class="kg-image-card"><img src="/content/images/2021/11/20191130_185747.jpg" class="kg-image"><figcaption>Logo grabado con la fresadora CNC</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20190929_204352.jpg" class="kg-image"><figcaption>Montando la caja completa</figcaption></figure>
### Resultado final
<figure class="kg-image-card"><img src="/content/images/2021/11/20200304_204143.jpg" class="kg-image"><figcaption>Un Baja Pro v4 terminado</figcaption></figure>

Esto ya estaba empezando a parecer un producto que se podía vender.

# La web

Hoy en día es difícil promocionar cualquier producto sin tener una web.

En este caso creé una web bastante simple, pero que mostraba las funcionalidades principales del Baja Pro.

<figure class="kg-image-card"><img src="/content/images/2021/11/image-6.png" class="kg-image"></figure>

La web sigue funcional a día de hoy:

[https://baja.matto.io](https://baja.matto.io)

En la misma web se podía descargar el manual de instrucciones, apuntarse en la lista de correos para recibir novedades, había algunas reviews y una zona de preguntas frecuentes.

# Las primeras (y únicas) unidades

Con todas estas mejoras ya estaba listo para fabricar la primera tanda de Baja Pros y ponerlos a la venta.

Por una cuestión de tiempo y presupuesto, decidí fabricar 25 unidades. Para ello tuve que comprar todos los componentes, flashear el firmware en los microcontroladores, soldar todos los componentes electrónicos, cortar las ventanas en las cajas, cortar y grabar los protectores de pantalla, cortar los cables a medida, montar los mandos con sus botones, y un largo etcétera.

<figure class="kg-image-card"><img src="/content/images/2021/11/20190612_193321.jpg" class="kg-image"><figcaption>El pedido con las cajas</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20190916_195153.jpg" class="kg-image"><figcaption>El pedido de los módulos GPS</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20190908_162855.jpg" class="kg-image"><figcaption>Soldando componentes electrónicos de montaje superficial</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191013_192724.jpg" class="kg-image"><figcaption>Cajas con sus ventanas ya cortadas</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191214_161355.jpg" class="kg-image"><figcaption>Cajas con la cinta de doble cara para pegar el protector de pantalla</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191026_154209.jpg" class="kg-image"><figcaption>Mandos con sus botones resistentes al agua instalados</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191106_213726.jpg" class="kg-image"><figcaption>Placas con casi todos los componentes electrónicos soldados</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191110_180005-1.jpg" class="kg-image"><figcaption>Pantallas soldadas</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191109_202907.jpg" class="kg-image"><figcaption>Probando una pantalla recién soldada</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191117_125513.jpg" class="kg-image"><figcaption>Control de calidad: Probando unidad por unidad para confirmar que funcionan correctamente</figcaption></figure>

# El momento de la venta

Había llegado el momento. Ya tenía 25 unidades completamente probadas y funcionales.

Envié un correo electrónico a las personas que se habían apuntado a la lista de distribución de [la página del Baja Pro](https://baja.matto.io/) para avisar que tenía 22 unidades a la venta (me guarde 3 como backup por si alguno fallaba y tenia que reemplazarlo).

Nunca imaginé el resultado: Se vendieron todas las unidades en menos de 9 horas de haber enviado el correo.

Para el envío mande a imprimir unas cajas personalizadas con el logo de Baja Rally Computers:

<figure class="kg-image-card"><img src="/content/images/2021/11/20191215_225332.jpg" class="kg-image"><figcaption>Caja del Baja Pro</figcaption></figure><figure class="kg-image-card"><img src="/content/images/2021/11/20191227_211139.jpg" class="kg-image"><figcaption>Los pedidos listos para ser enviados por correo</figcaption></figure>

Afortunadamente, a día de hoy (2 años después de la venta) ninguna de las unidades ha fallado, por lo que no he tenido que reemplazar ni una.

# La experiencia

Cualquiera diría que luego de un éxito de ventas como ese me pondría inmediatamente a fabricar más unidades para poder seguir vendiéndolas y transformar esto en un gran negocio. Mejor dicho, cualquiera que no haya tenido que pasar por el proceso de fabricación por el que he pasado yo diría esto.

La verdad es que la experiencia de fabricarlos fue mucho más compleja y agotadora de lo que esperaba. Esto me desanimo bastante. Tanto que decidí no fabricar más unidades.

Los motivos son varios.

### Componentes

Conseguir una fuente fiable y estable de componentes electrónicos es muy complicado. Los proveedores un día tienen stock, y al día siguiente ya no lo tienen. Para colmo los precios son muy volátiles y cambian constantemente.

La mayoría de componentes no se fabrican en Europa, por lo que tenía que importarlos, con el consiguiente gasto de aduanas que eso implica, lo que hacía que los precios se disparen.

No existe un proveedor que venda todos los componentes que necesitas para hacer un Baja Pro, por lo que hay que buscar múltiples proveedores, hacer múltiples pedidos, seguir múltiples paquetes alrededor del mundo que llegarán todos a diferentes tiempos, y que hasta que no tengas todos no puedes continuar.

Otros componentes como las cajas, tornillería, etc. sí que se pueden conseguir en Europa, pero curiosamente el proveedor de las cajas (Retex) fue el que mas problemas me dio. Por lo visto, al ser la mía una orden tan pequeña no tenía prioridad y tuve que estar persiguiéndoles para que me las envíen incluso luego de haberlas pagado.

### Tiempo y complejidad

Fabricar una unidad de principio a fin implica muchísimos pasos:

- Cortar las ventanas en las cajas
- Cortar y grabar los protectores de pantalla
- Cortar el pegamento del protector de pantalla a medida
- Flashear el firmware en el microcontrolador
- Soldar todos los componentes electrónicos
- Cortar y soldar los cables
- Instalar los tornillos de soporte en la caja
- Instalar y soldar los botones en el mando
- Cortar y soldar los cables del mando
- Probar que todo funcione correctamente

por mencionar los principales.

Todo este proceso lleva MUCHO tiempo. Tiempo que sólo podía dedicar por las tardes al salir de mi trabajo de lunes a viernes.

En un momento dado empecé a estar bastante cansado. Empecé con este proyecto porque es algo que me gusta mucho, y no quería empezar a odiarlo. Era justamente lo que me estaba empezando a pasar.

Por otra parte, si yo dedicase la misma cantidad de tiempo a otras cosas (desarrollar software, por poner un ejemplo) ganaría mucho más dinero que fabricando Baja Pros. Es decir que como negocio tampoco me cuadraba.

### Fiscalidad

Lamentablemente España es un lugar horrible para emprender.

Para poder facturar hay que hacerse autónomo, lo cual implica pagar más de 200€ mensuales (como mínimo), incluso si durante ese mes no has facturado nada.

Ni hablar de registrar una empresa, que también tiene un costo absurdamente elevado.

Es como si no quisieran dar lugar a los pequeños emprendedores.

Siendo este un proyecto con el que no tuve mucha ganancia, no me daban las cuentas para pagar todos los impuestos que Hacienda me demandaba.

### Precio

Mi idea inicial era lograr un tripmaster que sea asequible para pilotos nóveles que quisieran iniciarse en el mundo de la navegación con roadbook.

Lamentablemente subestimé los costes de los materiales, los impuestos y el tiempo que dedicaría al proyecto.

Si bien el precio al que vendí esas unidades era bastante más bajo de lo que cuesta un ICO (sobre todo teniendo en cuenta la cantidad de funcionalidad extra que añade el Baja Pro), seguía siendo más alto de lo que me hubiese gustado.

No había logrado mi objetivo principal.

# Aprendizaje

La verdad es que durante todo este proceso he aprendido innumerables cosas nuevas y es lo que me llevo del proyecto.

Esto fue para mí una excusa para estudiar e implementar cosas que quería aprender desde hacía mucho tiempo, y qué mejor manera que concentrarlo todo en un sólo proyecto que además se fusiona con otro de mis hobbies: las motos.

Siempre me ha gustado resolver problemas, aprender cosas nuevas y enfrentarme a nuevos desafíos. El Baja Pro me ha dado todo eso y mucho más.

Ir a un rally y ver a pilotos que llevan un Baja Pro instalado en sus motos y que están contentos con el producto es una sensación bastante genial y difícil de explicar.

# Liberando el código

Luego de darle muchas vueltas he decidido transformar este proyecto en uno de código abierto.

Siempre he sido un gran defensor del open source, y me sentía un poco hipócrita manteniendo el código del Baja Pro cerrado. El BajaPro lleva ya un par de años estancado y no me gustaría que caiga en el olvido.

Por otra parte me da muchísima curiosidad saber qué aportes y mejoras hará la comunidad a este proyecto, que espero que siga creciendo durante muchos años más.

Creo honestamente que esto es algo que podría beneficiar a esos pilotos que se están iniciando, o incluso a pilotos profesionales que echen de menos algunas funcionalidades en los actuales y retrógrados tripmasters que tan caros cuestan.

# Presentando a Open Rally Computer

Mi empresa “Baja Rally Computers” seguirá existiendo por si se me ocurre alguna otra locura.

Es por esto que he decidido cambiar el nombre al proyecto. A partir de ahora se llamará _ **Open Rally Computer** _. Es un nombre más acorde con lo que será en adelante un tripmaster de código abierto que cualquier persona podrá fabricar.

No sólo he liberado el código fuente. También he liberado el listado de materiales, diagramas de conexión, el diseño del circuito impreso y el manual de instrucciones.

Todo esto se puede encontrar en el repositorio de GitHub que será a partir de ahora el hogar de Open Rally Computer:

[https://github.com/mattogodoy/open-rally-computer](https://github.com/mattogodoy/open-rally-computer)

Con un poco de suerte esta iniciativa ganará algo de tracción y podremos formar una comunidad de desarrolladores que aporten nuevas ideas y funcionalidades.

### Licencia

Algo muy importante a la hora de crear un proyecto open source es elegir la licencia correcta.

En este caso yo he elegido [GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html).

⚠️ Esto significa que el código de Open Rally Computer se puede copiar, modificar, distribuir, e incluso comercializar, pero con una condición muy importante: cualquier proyecto que utilice este código (total o parcialmente) deberá liberar también la totalidad de su código. De lo contrario quedarían expuestos a acciones legales.

Eso es lo que más me gusta de esta licencia. Es como un virus. Un virus bueno que contagia a otros proyectos haciendo que pasen a ser de código abierto.

# Conclusión

El desarrollo del Baja Pro ha sido un largo y tortuoso camino, pero me ha dejado innumerables enseñanzas y una experiencia que espero aplicar a futuras aventuras.

<figure class="kg-image-card"><img src="/content/images/2021/11/20200621_155419-1.jpg" class="kg-image"></figure>

Estoy impaciente por ver el futuro de este proyecto y espero que la comunidad open source me ayude a lograr lo que yo sólo no pude; un tripmaster de código abierto que sea asequible, pero a la vez tan bueno y fiable que pase a ser la elección por defecto de pilotos profesionales del Dakar. Soñar es gratis.

