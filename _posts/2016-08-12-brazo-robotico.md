---
layout: post
title: Brazo robótico
date: '2016-08-12 19:15:00'
tags:
- robotica
- electronica
- arduino
- programacion
- impresora-3d
---

Como ya he dicho antes, mi motivación para [montar una impresora 3D](https://matto.io/armando-una-impresora-3d-parte-1/) fue, además de imprimir montones de cosas sin utilidad alguna, la de tener la posibilidad de crear piezas estructurales de robots.

Este brazo robótico fue el primer proyecto que cumplió con ese cometido.

La idea era imprimir la estructura de un brazo robótico de 3 ejes que se pueda controlar desde una especie de joystick de forma intuitiva, de manera que el brazo copie cada movimiento hecho con el mando.

## Diseño

El diseño original del brazo es [éste](http://www.thingiverse.com/thing:34829/#files), pero hice algunas modificaciones con la ayuda de [Tinkercad](https://www.tinkercad.com/):

- Base del brazo simplificada
- Tramos de los brazos más largos
- Pinza simplificada y más liviana

También tuve que crear las piezas del controlador yo mismo:

- Base
- Uniones
- Brazo
<figure class="kg-image-card"><img src="/content/images/2018/08/brazo.png" class="kg-image"><figcaption>Una de las modificaciones que hice sobre el modelo original</figcaption></figure>

Todos los modelos creados o modificados por mi pueden obtenerse [aquí](https://www.tinkercad.com/users/hlAtf6r4quE-mattogodoy).

## Funcionamiento

El funcionamiento es muy básico. Lo que hice fue leer valores de un [potenciómetro analógico](https://es.wikipedia.org/wiki/Potenci%C3%B3metro), que básicamente es una resistencia variable. Tiene una perilla que al girarla en un sentido aumenta la resistencia, y al girarla en el otro la reduce.

<figure class="kg-image-card"><img src="/content/images/2018/08/potenciometro.jpg" class="kg-image"><figcaption>Potenciómetro analógico</figcaption></figure>

Las primeras pruebas antes de tener el mando impreso y montado:

<figure class="kg-embed-card"><iframe width="480" height="270" src="https://www.youtube.com/embed/9pPOXnLJ74U?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></figure>

Usé un potenciómetro como sensor de la posición de cada eje en el mando, de manera que al moverlo en cualquier eje, esto haría girar las perillas de los potenciómetros enviando señales que indican la nueva posición.

El resultado no es muy bonito, pero cumple su función:

<figure class="kg-image-card"><img src="/content/images/2018/08/brazo2-1.jpg" class="kg-image"></figure><figure class="kg-image-card"><img src="/content/images/2018/08/brazo3.jpg" class="kg-image"></figure>

Los valores de cada eje van a puertos de entrada de un [Arduino UNO](https://www.arduino.cc/en/Main/ArduinoBoardUno) y son transformados en valores [PWM](https://es.wikipedia.org/wiki/Modulaci%C3%B3n_por_ancho_de_pulsos) de salida para los actuadores.

Como actuadores usé 4 micro [servos](https://es.wikipedia.org/wiki/Servomotor_de_modelismo), que son pequeños motores eléctricos que tienen una caja reductora y otro potenciómetro dentro. Esto les permite tener mucho torque y ser conscientes de la posición en la que se encuentran en cada momento. Son el santo grial de la robótica.

<figure class="kg-image-card"><img src="/content/images/2018/08/servo2.jpg" class="kg-image"><figcaption>Micro servo de 9 gramos</figcaption></figure>

## Código

El código que hace funcionar todo esto es sumamente simple, y lo único que hace es leer la posición de los sensores y pasar esos valores a los actuadores.

    #include <Servo.h> // Librería de Arduino necesaria para controlar servos
    
    // Declaro las variables que identifican a cada servo
    Servo servo0;
    Servo servo1;
    Servo servo2;
    Servo servo3;
    
    // Declaro las variables que identifican a cada potenciometro
    // y las asocio a una entrada analógica del Arduino
    int potpin0 = A0;
    int potpin1 = A1;
    int potpin2 = A2;
    int potpin3 = A3;
    
    // Declaro las variables que contendrán los valores leídos de los sensores
    int val0;
    int val1;
    int val2;
    int val3;
     
    void setup(){ 
      // Asigno cada servo a un puerto PWM del Arduino
      servo0.attach(8);
      servo1.attach(9);
      servo2.attach(10);
      servo3.attach(11);
    } 
     
    void loop(){ 
      val0 = analogRead(potpin0); // Leo el valor del potenciometro (entre 0 y 1023) 
      val0 = map(val0, 0, 1023, 0, 45); // Escalo estos valores a un rango aceptado por el servo (entre 0 y 180) 
      servo0.write(val0); // Muevo el servo a la nueva posicion
      
      val1 = analogRead(potpin1);           
      val1 = map(val1, 400, 1023, 0, 179);     
      servo1.write(val1);
      
      val2 = analogRead(potpin2);           
      val2 = map(val2, 100, 923, 0, 179);   
      servo2.write(val2);
      
      val3 = analogRead(potpin3);
      val3 = map(val3, 0, 1023, 0, 179);   
      servo3.write(val3);
    } 

Y eso es todo! Más simple imposible.

## Resultado

El resultado de todo esto es un brazo robótico que imita los movimientos del mando en todos sus ejes, permitiendo controlarlo de forma remota de manera muy intuitiva:

En el video se aprecia que algunos de los movimientos del brazo son un poco "temblorosos". Eso se debe a que los servos son muy malos. Con servos de buena calidad se podría lograr movimientos mucho mas estables y precisos.

