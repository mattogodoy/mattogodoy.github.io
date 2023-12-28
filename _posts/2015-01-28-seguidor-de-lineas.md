---
author: matto
layout: post
title: Seguidor de líneas
date: '2015-01-28 01:31:00'
image: 
  path: /images/arduino.jpg
tags:
- electronica
- robotica
- programacion
- arduino
---

Hace algunos años (exactamente el 13 de Octubre de 2012) tuve la suerte de participar de la 2da Competencia Regional de Robótica organizada por la Facultad de Ingeniería de la Universidad de Mendoza.

Mi interés por la robótica siempre ha estado latente, y aunque no fui alumno de la universidad organizadora, era una competencia abierta, por lo que me inscribí apenas me enteré.

## Reglas

La premisa era formar equipos de mínimo 1 persona (como fue mi caso) y máximo 4 para construir un robot capaz de seguir una línea blanca pintada sobre una pista con fondo negro.

Este tipo de competencias es muy común, y a estos robots se los llama "Seguidores de líneas". Original, ¿no?

Cada vuelta consta de dos robots sobre la pista, compitiendo entre sí.

### Robots

Estan limitados en dimensiones, y deben tener un pulsador en la parte delantera. Con esto nos aseguramos de que al momento de la largada, los robots estaran frente a una compuerta que mantiene el pulsador presionado, y ni bien se abre, ambos robots salen a la vez.

### Pista

La pista era un circuito de unos 40 cm de ancho, de color negro y tenía dos líneas blancas pintadas. Una para cada robot.  
Además tenía una pendiente de 20º que formaba un puente, y un area de zig-zag.

![](/images/pista_seguidor_lineas.jpg)
_Los chicos de la Universidad de Mendoza también habían instalado unas cámaras en los puntos mas críticos, para poder verlos de cerca y lo proyectaban en una pared._

### Reglamento

El documento oficial del reglamento se puede ver [aquí](https://matto.io/files/seguidor_lineas/Reglamento_Carreras_2012.pdf).  
Está bien detallado y no deja lugar a dudas.

## Construcción

### Idea inicial

Soy un poco fan de Arduino, y desde el principio supe que iba a encarar este proyecto usándolo.

> [Arduino](https://arduino.cc/), para quien no sepa, es una placa de desarrollos con un microcontrolador que nos permite hacer proyectos de electrónica de manera muy simple.

Inicialmente tenía idea de hacer un robot que usara dos motores. Uno en cada rueda delantera, y una rueda loca trasera (odio ese nombre), lo que le permitiría girar sobre su propio eje para cambiar de dirección simplemente haciendo que uno de los motores vaya más rápido que el otro, o inclusive, en sentido contrario.

Hice un prototipo y una rutina de pruebas:

{% include embed/youtube.html id='bhYZy4x66rA' %}

Luego de algunas pruebas llegué a la conclusión de que la manera más fácil sería usar sólo un motor para la tracción, y un servo para la dirección, girando las ruedas frontales como un auto común.  
Esto me ahorraría varios dolores de cabeza y simplificaría el diseño tanto en el hardware como en el software del robot.

### Sensores

Para detectar la línea de guía pintada en la pista, inicialmente pensé en usar emisores y receptores Infra Rojos. El funcionamiento es el siguiente:

- Se coloca un [LED IR](https://www.sparkfun.com/products/9349) emisor apuntando hacia el piso de la pista, y un LED receptor IR al lado, apuntando en la misma dirección.
- El LED emisor irradia luz IR (invisible para nosotros). La pista tiene distintos colores, y cada uno absorbe un rango de longitudes de onda específicos y hace rebotar al resto (de hecho, éste fenómeno es lo que permite que veamos [diferentes colores](https://es.wikipedia.org/wiki/Color)).
- El LED receptor capta la luz que rebota en la pista, y en función de la cantidad que recibe, podemos saber si lo que tenemos debajo es un color claro, o uno oscuro. Los colores claros rebotan mucha luz y los oscuros absorben mucha, por lo que rebotan poca.

Para las pruebas iniciales, en vez de LEDs IR, utilicé LEDs comunes de color blanco, y como receptores utilicé [fotorresistores LDR](https://es.wikipedia.org/wiki/Fotorresistor) (sensores que varían su resistencia en función de la cantidad de luz que reciben). ¿Por qué? Porque era lo que tenía a mano, y además al funcionar con luz visible me permitió tener una idea más tangible de cómo hacer funcionar el sistema. Además, los resultados son los mismos.

Este es el circuito. El buzzer de la parte superior era para pruebas y no lo integré al circuito final:

![](/images/Arduino-line-follower.png)

Y este es el array de sensores terminado:

![](/images/sensor.jpg)

Como se ve en la imagen, lo que hice fue usar 3 "sensores". El del medio debería detectar siempre color blanco (significaría que estoy dentro de la línea). Los de los extremos son los que detectarán que me estoy desviando y actuarán en consecuencia. Si el de la iquierda detecta la línea, significa que me estoy yendo a la derecha y debo corregir doblando a la izquierda. El mismo caso se aplica para el sensor derecho.

Por otra parte, encapsulé cada sensor con unas piezas de plástico (sí, viste bien, es un resaltador cortado) para que la luz de cada sensor no genere "ruido" en sus vecinos.

### Motor

Para la tracción del robot utilicé un motor DC común y silvestre.

![](/images/motor.jpg)

### Caja reductora

El mayor de los problemas fue conseguir una caja reductora. Estos motores llegan a velocidades bastante altas, pero no tienen mucha fuerza.  
Sin una caja reductora nunca iba a mover mi robot.  
Estas cajas son simplemente un conjunto de engranajes que reduce la velocidad, pero aumenta el torque. Justo lo que necesitaba.

Normalmente, en el mundo civilizado, son muy fáciles de encontrar, y además muy baratas, pero gracias a la sensacional política de importaciones que hay en Argentina, no tenía la posibilidad de comprar una. Al menos no a un precio razonable.

Tras muchas pruebas, terminé comprando un par de juguetes chinos de los que quité y adapté las cajas reductoras, y además aproveché las ruedas que traían.

![](/images/seguidor_lineas.jpg)

Una vez conectada al motor, mi robot ya tenía fuerza suficiente como para moverse, y a una buena velocidad.

### Controlador del motor

Algo importante es que los Arduino no manejan grandes cantidades de corriente eléctrica, y conectar un motor a una de sus salidas directamente es garantía de que lo vas a freír.  
Para solucionarlo, tuve que hacer un circuito que se llama [puente H](https://es.wikipedia.org/wiki/Puente_H_(electrónica)), para lo que usé un [controlador L298N](https://www.sparkfun.com/datasheets/Robotics/L298_H_Bridge.pdf) el cual me permite controlar la dirección de giro del motor.  
Por otra parte tiene la gran ventaja de que recibe las órdenes desde el Arduino, pero utiliza una fuente de energía separada para alimentar el motor, lo cual soluciona el problema del alto consumo de corriente.

Este es el resultado (no soy muy prolijo, ya lo sé):

![](/images/puente_h.jpg)

De paso, aproveché la placa y agregué resistencias para los leds de los sensores, sus respectivos conectores, un potenciómetro para la velocidad del motor y un botón de reset para reiniciar el software.  
No es muy elegante, pero funciona.

Lamentablemente no puedo encontrar los planos del circuito, pero es muy simple y se puede encontrar fácilmente en internet.

### Dirección

Respecto a la dirección, el servo que utilicé es uno de los más baratos, llamado 9g (porque pesa en total 9 gramos).

![](/images/servo.jpg)

Este consume mucha menos corriente, y por tanto sí va conectado directamente al Arduino. Además tiene la ventaja de que traen la caja reductora integrada (como se ve en la foto), por lo que tienen mucha fuerza.

### Alimentación

Para alimentar el Arduino utilicé 4 pilas AA, y para el motor una batería de 6 volts que, ni bien es grande y pesa mucho, me daría la autonomía y la potencia que necesitaba.

![](/images/bateria.jpg)

### Código

El código que controla todo esto es el siguiente:

```c++
#include <Servo.h>
Servo servoDireccion;

// ========
// Sensores
// ========
// Posicion
int sensor_derecha = 3;
int sensor_medio = 2;
int sensor_izquierda = 1;

// Valor default (calibracion)
int def_val_derecha = 0;
int def_val_medio = 0;
int def_val_izquierda = 0;

// Valores leidos
int val_derecha = 0;
int val_medio = 0;
int val_izquierda = 0;

// Frontal (distancia)
int sensor_frontal = 9;

// =======
// Motor
// =======
int enable = 6;
int motor = 5;

// =====
// Pines
// =====
// Varios
int potenciometro = 0;
int buzzer = 8;

// =========
// Variables
// =========
int umbral = 45; // Umbral de deteccion de linea
int velocidad = 0; // Velocidad de desplazamiento
int detenido = 1; // Para el freno
int ultimo_detectado = 0; // Para retomar camino si se pierde la linea (1 izda - 2 dcha)
int perdido = 0; // Tiempo que lleva sin conocer posicion de la linea
int centro = 85; // Centrado de direccion
int radio_giro = 40; // Cantidad en grados de giro de la direccion
int doblar = 0; // Cuanto doblar
int ledPin = 13; // Led
int tpo_delay = 9; // Delay para doblar
int linea = 2; // 1 = blanca; 2 = negra
int largada = 1;

// Frecuencias
int freq_obstaculo = 1000;
int freq_perdido = 2000;


void setup() {
  Serial.begin(9600); // Inicio comunicacion serial
  servoDireccion.attach(10);
  servoDireccion.write(centro); // Servo de direccion recto

  // Inicializacion de pines
  pinMode(sensor_derecha, INPUT);
  pinMode(sensor_medio, INPUT);
  pinMode(sensor_izquierda, INPUT);

  pinMode(potenciometro, INPUT);
  pinMode(sensor_frontal, INPUT);

  pinMode(enable, OUTPUT);
  pinMode(motor, OUTPUT);

  // Calibro sensores
  delay(500);
  def_val_derecha = analogRead(sensor_derecha);
  def_val_medio = analogRead(sensor_medio);
  def_val_izquierda = analogRead(sensor_izquierda);    
  delay(500);

  doblar = centro;
}


void loop() {
  // Leo el valor de los sensores
  leer_sensores();
  
  // Asigno la velocidad fija con el potenciometro
  velocidad = map(analogRead(potenciometro), 0, 1023, 0, 255);

  // Linea en el centro
  if (val_derecha < (umbral - 10) && val_izquierda < (umbral - 10)) { // Dejo un margen de 10
    if(doblar > centro){
      doblar--;
    } else if(doblar < centro){
      doblar++;
    }
  } else {
    // Detecto linea a la derecha
    if (val_derecha > umbral) {
      doblar --;
      delay(tpo_delay);
      velocidad -= 18;
    }
    
    // Detecto linea a la izquierda
    if (val_izquierda > umbral) {
      doblar ++;
      delay(tpo_delay);
      velocidad -= 18;
    }
  }

  if(doblar < centro - radio_giro)
    doblar = centro - radio_giro;
  if(doblar > centro + radio_giro)
    doblar = centro + radio_giro;

  servoDireccion.write(doblar);

  // Avanzo
  if(digitalRead(sensor_frontal) == HIGH){
    parar();
    digitalWrite(ledPin, HIGH);
    largada = 1;
  } else {
    if(largada == 1){
      adelante(velocidad + 30);
      delay(200);
      largada = 0;
    } else {
      adelante(velocidad);
    }
    digitalWrite(ledPin, LOW);
  }
}

void leer_sensores(){
    if(linea == 1){
      // Para linea negra
      val_derecha = analogRead(sensor_derecha) - def_val_derecha;
      val_medio = analogRead(sensor_medio) - def_val_medio;
      val_izquierda = analogRead(sensor_izquierda) - def_val_izquierda;
    } else {
      // Para linea blanca
      val_derecha = (analogRead(sensor_derecha) - def_val_derecha) * -1;
      val_medio = (analogRead(sensor_medio) - def_val_medio) * -1;
      val_izquierda = (analogRead(sensor_izquierda) - def_val_izquierda) * -1;
    }
    
    if(val_derecha < 0)
      val_derecha = 0;
    if(val_medio < 0)
      val_medio = 0;
    if(val_izquierda < 0)
      val_izquierda = 0;
}

void adelante(int velocidad) {
  // Evito errores
  if(velocidad < 0)
    velocidad = 0;
  if(velocidad > 255)
    velocidad = 255;

  analogWrite(enable, velocidad);
  digitalWrite(motor, HIGH);
  
  detenido = 0;
}

void atras(int velocidad) {
  // Evito errores
  if(velocidad < 0)
    velocidad = 0;
  if(velocidad > 255)
    velocidad = 255;

  analogWrite(enable, velocidad);
  digitalWrite(motor, LOW);

  detenido = 0;
}

void parar() {
  if(detenido == 0) {
    analogWrite(enable, 0);
    digitalWrite(motor, LOW);

    detenido = 1;
  }
}
```

El código es muy simple, pero bastante efectivo.  
Lo que hace es mover el servo si detecta que el sensor de un lado tiene lecturas mas bajas que el del otro, lo que significa que está sobre la línea y el robot se está saliendo de curso.  
En el caso de que ambos sensores midan valores parecidos, significa que la línea está en medio (o que el robot ya se salió definitivamente).

Al final no utilicé el sensor del medio, ni un [control PID](https://es.wikipedia.org/wiki/Proporcional_integral_derivativo) que había configurado en un principio porque preferí hacerlo lo más simple posible.

Había pensado en una lógica de recuperación que se active cuando el robot se salía completamente de la línea, para volver de alguna manera al circuito, pero por falta de tiempo lo dejé como está.

### Resultado

Todo junto y armado, terminó siendo este Frankestein:

![](/images/robot.jpg)

## El día de la competencia

El día de la competencia se nos dio algunas horas para que configuremos nuestros robots y nos preparemos para las carreras.

![](/images/robot2.jpg)

Los robots de todos los participantes estaban muy bien. Es interesante ver la creatividad de cada uno y la manera de resolver los problemas desde distintos puntos de vista.

![](/images/robots.jpg)

_El mío es el último de la derecha._

Finalmente, de cerca de 18 competidores, de los cuales muchos ni siquiera lograron llegar al punto de partida, quedé en el 6to puesto.  
Mi robot funcionó mucho mejor de lo que esperaba, sobre todo teniendo en cuenta que no había tenido posibilidad de probarlo antes de la competencia.

El problema fue que debido al gran peso de las baterías, cada vez que llegaba a la pendiente, se quedaba en la subida y no lograba pasar.

Lamentablemente no pude filmarlo, pero sí logré filmar la carrera final. La última parte del video es genial:

{% include embed/youtube.html id='eWdejd4fHu4' %}

## Conclusión

La experiencia fue muy interesante y aprendí mucho en el camino. Si bien hoy lo haría de otra manera, me sirvió para entender el funcionamiento de muchas cosas, y me doy por satisfecho de haber logrado competir teniendo tan poco tiempo para armar el robot.

Espero que les haya gustado.  
¡Hasta la próxima!

