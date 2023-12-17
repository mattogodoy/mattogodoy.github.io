---
author: matto
title: Fabricación de un Roadbook con Tripmaster
date: 2017-06-03T19:50:00+01:00
image: 
  path: /images/header.jpg
categories:
tags:
- electronica
- programacion
- arduino
- video-juegos
---

Resulta que desde hace un tiempo tengo unas [gafas de realidad virtual](https://www.oculus.com/), y paso algunas horas perdido en algún que otro juego. La verdad es que es una sensación realmente inmersiva. Tanto que a veces te olvidas de que estás dentro de un mundo que en realidad no existe.

Uno de mis juegos preferidos es "[Hot Dogs, Horseshoes & Hand Grenades](https://store.steampowered.com/app/450540/Hot_Dogs_Horseshoes__Hand_Grenades/)". Es un simulador de armas con un nivel de realismo asombroso. La cantidad y variedad del arsenal del que dispone es increíble, pero lo mejor de todo es que todas las piezas móviles y mecanismos de cada arma se pueden accionar, y funcionan exactamente igual que en la realidad real.

Acompañados de las gafas, y para incrementar la sensación de inmersión, el jugador interacciona con el mundo virtual por medio de unos mandos llamados _Oculus Touch_:

![](/images/touch-controllers.jpg)

El problema es que a pesar de que hacen un trabajo impecable detectando la posición de mis manos en el espacio real, no son capaces de reproducir el &nbsp;fuerte retroceso que genera un arma real al ser disparada. En cambio nos tenemos que conformar con una triste vibración parecida a la de cuando nos llega un mensaje de WhatsApp al móvil.  
Ese retroceso es a mi parecer lo único que haría falta para que la inmersión sea total. La experiencia mejoraría en un 63%.

## Comienza la búsqueda

Luego de darle algunas vueltas decidí ponerme manos a la obra. Un par de horas de búsquedas tanto en Google como en YouTube (mi nuevo motor de búsqueda preferido) me llevaron a varios resultados. Algunos de ellos muy interesantes, como por ejemplo, patentes de mecanismos para lograr este mismo objetivo, pero con distintos fines. Algunos recreativos, otros de entrenamiento militar:

![](/images/pat3.png)
_Dispositivo para entrenamiento militar adaptable a cualquier tipo de arma_

![](/images/pat2.png)
_Sistema de retroceso eléctrico para máquinas recreativas de arcade_

![](/images/pat1.png)
_Sistema de retroceso basado en aire (o gas) comprimido adaptable a pistolas reales_

## Requisitos

Las ideas de las patentes son interesantes y bastante ingeniosas, pero no cumplen con los requisitos mínimos que necesitamos en un sistema de realidad virtual:

1. **Peso reducido** : A menor masa, más intenso será el efecto del retroceso al disparar.
2. **Tamaño reducido** : El sistema tendrá que tener un tamaño aproximado al de un arma real. Ya sea una pistola, o un rifle de asalto.
3. **Inalámbrico** : En lo posible no debería depender de cables, dado que limitaría notablemente la sensación de inmersión y quitaría movilidad.
4. **Integración** : Para que el sistema se pueda usar, deberá poder integrarse con facilidad a los juegos que pudieran ser compatibles.
5. **Rapidez** : La frecuencia de repetición de disparo tiene que ser considerablemente alta si queremos estar a la par de un arma automática real.

Los requisitos son bastante difíciles de cumplir, dado que para generar un retroceso con una fuerza remotamente parecida a la de un arma real se necesita mucha energía.

Por otra parte, habría que convencer a los desarrolladores de juegos de que integrasen algún tipo de [SDK](https://es.wikipedia.org/wiki/Kit_de_desarrollo_de_software) por medio del cual el juego comunicaría a nuestro dispositivo cada vez que se efectúa un disparo, para que el sistema actúe en consecuencia.

## Alternativas

Conociendo las restricciones, me tengo que decidir por alguna de las alternativas posibles, que según veo son dos:

#### Gas

Uno de los resultados que encontré durante la búsqueda es el uso de gas comprimido, utilizado ampliamente en réplicas de armas de **Airsoft** y marcadoras de **Paintball**. Esto me abrió un mundo nuevo y me arrastró a una nueva afición (porque por lo visto no tengo suficientes 😒) de la que hablaré un poco más en mi próximo post.

Para cumplir con los requisitos antes mencionados, lo ideal sería usar cápsulas de CO2 de 12 gramos:

![](/images/co2.png)

Son baratas y fáciles de conseguir, pero tienen como desventaja que pueden almacenar muy poco gas. En una pistola de Airsoft se puede disparar unas 30 veces (con suerte) por cada uno de los cartuchos. Estar quitándonos las gafas y cambiando de cartuchos cada 30 tiros no ayudará mucho a la inmersión. Especialmente con armas automáticas.

Se podría considerar también usar una botella más grande, como las utilizadas en las marcadoras de Paintball, pero eso trae consigo muchas complicaciones (como la rellenas??) y así y todo la cantidad de disparos antes de que se acabe el gas es bastante limitada.

#### Electroimanes

Esta alternativa tiene mucha mejor pinta, empezando por que no es necesario el uso de ningún consumible (como el CO2).

Volviendo atrás hasta mi infancia (no tan lejana), recuerdo haber pasado mucho tiempo jugando en máquinas arcade de videojuegos. Algunas de ellas tenían armas y tenían retroceso.

![](/images/arcade-gun.png)

Buscando un poco me encontré con que ese efecto se lograba usando un tipo especial de electroimanes llamados _solenoides_:

![](/images/solenoide.jpg)

Un solenoide es simplemente un electroimán con un eje metálico y un muelle. Al hacer pasar corriente por él, el eje se contrae comprimiendo el muelle. Al dejar de pasar corriente, el electroimán pierde su energía y el muelle se encarga de extender el eje nuevamente. Se suelen usar como actuador lineal para abrir y cerrar válvulas.

La ventaja de usar un solenoide es que pesa muy poco, es muy fácil de controlar y los movimientos de contracción y extensión son muy rápidos, lo que nos permite simular armas automáticas.  
La desventaja es que no tienen mucha fuerza, a menos que se use uno con un voltaje bastante elevado, lo cual nos limita a la hora de hacer un sistema inalámbrico basado en baterías.

## Prototipo

Con todo esto en mente, compré un solenoide de 24 volts para hacer algunas pruebas. Según las especificaciones, es capaz de mover 2 Kg. No me lo creo, pero bueno...

Para controlar los movimientos y la repetición del solenoide, utilicé un **Arduino Nano**. Dado que la corriente que necesita el electroimán para funcionar está cerca de los 2 amperes (si, muchísimo) y el Arduino no es capaz de manejar esas capacidades, usé un relay de 5v para controlar el paso de corriente.  
Para variar fácilmente la frecuencia de repetición de disparo usé un **potenciómetro** y como gatillo un simple botón. Lo más parecido a una pistola que tenía era una sierra para metal, asi que usé eso como cuerpo de la pistola :)

![](/images/gun.jpg)
_Sí, es una sierra._

He agregado algunas arandelas a la punta del solenoide para que tenga más masa y el efecto del retroceso sea más notable.  
Para que el golpe sea todavía más importante, he hecho caso omiso a la limitación de 24 volts del solenoide y lo estoy probando con 36 volts. La diferencia es bastante grande, y dado que el electroimán no está accionado de forma continua, no llega a calentarse.

{% include embed/youtube.html id='XsdjxFZunkI' %}

Esta es sólo una primera aproximación. No es bonita, pero funciona y sí que da una sensación de retroceso que, aunque no es ni de cerca el de un arma real, es bastante fuerte y puede lograr el objetivo que busco.

El código es extremadamente simple:

```c++
const int buttonPin = 2; // the number of the pushbutton pin
const int relayPin = 4; // the number of the solenoid pin
const int ledPin = 13; // the number of the LED pin

int buttonState = 0;
int shotTime = 50;
int repeatTime = 400;
int sensorValue = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(relayPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  // read the state of the pushbutton:
  buttonState = digitalRead(buttonPin);
  // read the state of the potentiometer:
  sensorValue = analogRead(A0);

  repeatTime = sensorValue;

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
    shoot();
  } else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }
}

void shoot(){
  digitalWrite(relayPin, HIGH);
  delay(shotTime);
  digitalWrite(relayPin, LOW);
  delay(repeatTime);
}
```

Lo único que hace es que al presionar el botón, acciona el solenoide por un tiempo muy breve y luego lo libera. Luego hay una espera entre disparo y disparo que depende de la posición del potenciómetro y el ciclo se repite.

## Conclusión

Dada la dificultad de las restricciones he dejado el proyecto de lado. No es la primera ni será la última vez que empiezo uno de estos mini-proyectos que finalmente nunca termino.

En el camino aprendí mucho y descubrí una nueva afición (el Airsoft), pero viendo las cantidades de electricidad necesarias para hacerlo funcionar queda prácticamente descartada la posibilidad de usar baterías (aunque con varias LiPo en serie tal vez se podría hacer algo), pero principalmente la mayor dificultad es la de sincronizar el retroceso con el momento en que se el arma se dispara dentro del juego. Para ello necesitamos integración por parte de los desarrolladores, y no creo que sea algo tan fácil de conseguir.

Probablemente en algún momento haga algún prototipo de juego usando **Unity** en el que se pueda disparar y se sincronice con mi sierra-pistola. De momento, es un proyecto en stand by.
