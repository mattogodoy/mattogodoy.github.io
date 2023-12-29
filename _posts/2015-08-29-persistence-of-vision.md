---
author: matto
title: Persistence of vision
date: 2015-08-29T18:11:00+01:00
image: 
  path: /assets/images/persistence.jpg
categories:
tags:
- electronica
- programacion
---

Por allá por Agosto de 2009 se me dio por aprender a programar microcontroladores. Los microcontroladores son circuitos integrados que pueden ser programados para ejecutar órdenes.

Si hay algo más divertido que programar, es hacer que tu código haga cosas en el mundo real, y no sólo en el virtual.

Como Arduino nació recién en 2005 y no se hizo conocido hasta bastante más tarde, mi interés se desvió hacia el mítico **[PIC16F84](https://www.microchip.com/wwwproducts/Devices.aspx?product=PIC16F84)**, un microcontrolador muy básico con una arquitectura de [8 bits](https://histinf.blogs.upv.es/2011/01/12/computadores-de-8-bits/) y 18 pines:

![](/assets/images/PIC16F84.png)

Se programa en lenguaje máquina (assembler), por tanto, escribir un programa por simple que sea es un suplicio (aunque también existen compiladores que interpretan **C** o **Basic** ).

Para aprender me compré uno de los libros más famosos sobre el tema: «[MICROCONTROLADOR PIC16F84. Desarrollo de proyectos](https://www.pic16f84a.org/)» (muy recomendable).

El proyecto más interesante que hice se basó en el concepto de «Persistence of vision» o persistencia de la visión: un fenómeno visual por el cual una imagen permanece en la retina humana una décima de segundo antes de desaparecer por completo.

Aprovechándome de eso, escribí un programa (del cual he perdido el código) que mostraba mi nombre en mayúsculas pasando de derecha a izquierda muy rápido por una sola línea vertical de 4 LEDs a modo de marquesina. Un video vale más que mil palabras:

{% include embed/youtube.html id='kPh3ivZpy78' %}

El mensaje pasa tan rápido, que si miramos los LEDs parecen encendidos todo el tiempo, pero si los movemos de un lado a otro, da la sensación de que la palabra «MATTO» queda escrita en el aire.

Básicamente lo que mostraba el programa a final de cuenta era algo así como:

```
1010010011101110010
1110101001000100101
1110111001000100101
1010101001000100010
```

Sí, parece raro, pero es en realidad bastante simple: Cada dígito binario representa un estado de un LED, siendo 1 encendido y 0 apagado. Cada columna vertical de izquierda a derecha representa a la línea de 4 LEDs que se ve en el video.

Ahora, si quito los 0 y dejo solamente los 1, se entenderá un poco mejor:

```
1 1  1  111 111  1 
111 1 1  1   1  1 1
111 111  1   1  1 1
1 1 1 1  1   1   1
```

El concepto es interesante y podría instalarse por ejemplo en la rueda de una bicicleta, un ventilador, o lo que sea que gire a una velocidad más o menos constante.
