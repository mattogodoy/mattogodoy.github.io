---
author: matto
title: Mi primer videojuego
date: 2016-09-02T19:22:00+01:00
image: 
  path: /images/jetfight-banner.jpg
categories:
tags:
- programacion
- video-juegos
---

Estoy convencido de que todo desarrollador de software en algún punto ha querido hacer su propio juego. El problema es que por cuestiones de tiempo, y de tener que enfrentarse a un mundo completamente desconocido estas ideas terminan en la nada.

Siendo yo uno del montón, desde hace un tiempo tenía curiosidad por el mundo de los videojuegos y su desarrollo. Resulta que es muy divertido hacerlos, y el progreso durante el desarrollo es claramente visible.

El hecho de que hay que aprender un montón de cosas nuevas espanta a muchos, pero es ciertamente lo que me atrajo a mi. Entre ellas puedo destacar aprender sobre motores de físicas (para aplicar gravedad, fuerzas, colisiones, fricción, torque, etc.), gráficos (sprites, ratios, compresión), animación, sonido, lenguajes de programación que no hemos usado antes (en mi caso C#, que me sorprendió gratamente) y un montón de cosas más que seguramente se me escapan, pero en su conjunto hacen que crear un juego sea un proceso de constante aprendizaje. Justo lo que me gusta.

Actualmente (y desde hace ya varios años) soy desarrollador front-end de aplicaciones web. Tengo el problema de que me aburro muy rápido de las cosas, y mi actual trabajo no es una excepción. Esto fue lo que me motivó a aprender a hacer juegos en mi tiempo libre.

# Comienzos

Hace ya algunos meses, junto a [Alberto Fernandez](https://twitter.com/AlbertoFdzM) decidimos crear un pequeño estudio independiente de desarrollo de videojuegos. Así nació [ZombieUnicorn](http://zombieunicorn.studio/)

![](/images/logo.png)
_Logo de ZombieUnicorn_

Nuestro primer (y actualmente único) proyecto se llama **The Seeker** , y es un shooter de zombies en 2D y con estilo [PixelArt](https://es.wikipedia.org/wiki/Pixel_art).

{% include embed/youtube.html id='cMOva2ZDnGo?feature=oembed' %}
_Gameplay de The Seeker_

Este proyecto está parado de momento por cuestiones de tiempo, pero ya está encaminado y planeamos continuarlo en cuanto sea posible.

# JetFight

Dado que el proyecto que tenemos en ZombieUnicorn está en pausa, decidí aprovechar algo de tiempo libre y crear un nuevo juego por mi cuenta. De esa manera aprendería muchas cosas que luego podría aportar al estudio.

### Definición

Definir de antemano cual será la finalidad del juego y su mecánica es sumamente importante. Uno de los motivos por los que el proyecto de _The Seeker_ está detenido es que nos lanzamos a hacer cosas sin tener muy claro como sería la historia ni la forma de jugar.

Es por eso que decidí hacer algo muy simple. Es muy fácil dejarse llevar y querer hacer un juego complicado, con muchas opciones, armas, items, enemigos, y un largo etc. El problema es que eso es muy poco realista, sobre todo para el primer juego que haces. Lo que termina pasando es que abandonas el desarrollo. Empiezas muchos juegos y no terminas ninguno.

Yo quería hacer un juego que pudiera empezar y terminar.

La idea detrás de **JetFight** era hacer un juego de peleas para dos jugadores. Los personajes serían pequeños y podrían usar jetpacks para volar por todo el nivel. Simple, pero potencialmente divertido.

### Motor

Cuando decidí a que quería hacer juegos, estuve investigando bastante sobre los motores que hay disponibles. Son muchos, y para muchísimas plataformas. También depende del lenguaje en el que quieras programar. Los hay desde _JavaScritpt_ hasta _C_ puro y duro, pasando por _Lua_ que es un lenguaje bastante común para el desarrollo de juegos.

Después de mucho leer me decidí por [Unity 3D](https://unity3d.com), porque te permite crear un juego y publicarlo para todas las plataformas más utilizadas (Mac, Windows, Linux, Android, iOS, PlayStation, XBox y muchas más). Eso facilita muchísimo las cosas. Además, hay dos puntos muy importantes en los que Unity ha mejorado recientemente: El primero es que han agregado herramientas para juegos en **2D**. Y la segunda es que ahora es gratis! Antes había que pagar una licencia (muy cara por cierto) para poder publicar los juegos hechos con ese motor. Desde hace poco, podrás publicar los juegos pero con algunas condiciones. Al iniciar el juego se verá una pantalla que dice "_Made with Unity_", y si ganas mas de U$D 100.000 en ventas del juego, tendrás que comprar la licencia. Ojalá tuviera que comprarla ;)

![](/images/unity.png)

Lo único que me tiraba para atrás era el lenguaje de programación que usa Unity: **C#**  
Debo decir que estaba equivocado y no eran más que prejuicios. C# me ha demostrado ser un lenguaje sólido y fácil de escribir. No me costó absolutamente nada aprenderlo y empezar a escribir código rápidamente (y no es que yo sea el más listo del barrio).

### Gráficos

Algo que he descubierto es que, por obvio que suene, los juegos entran por lo ojos. A lo que me refiero es que por más divertido que sea el juego, si los gráficos no son buenos o llamativos, no gusta a los jugadores. Es un hecho.

Para este juego en particular, lo que hice fue comprar una plantilla de gráficos (llamada _spritesheet_ en el mundo de los videojuegos) que contiene todos los dibujos (llamados _sprites_) necesarios para los jugadores y los ítems, incluyendo los que componen el escenario.

![](/images/spritesheet.jpg)
_Parte del spritesheet usado para JetFight_

Otros de los gráficos, como por ejemplo la sierra circular, los tuve que crear yo por mi cuenta.

### Mecánica de juego

Mi idea desde el principio era hacer que el juego sea rápido y que se sienta como tal. Para ello tuve que modificar algunos parámetros del motor de físicas y aumentar la gravedad, dado que usando valores reales de gravedad (-9.8 m/s2) el juego daba la sensación de movimento "lunar".

Por otra parte, yo quería que los jugadores interactúen entre sí y con los elementos del nivel a nivel de físicas y fuerzas. Esto es determinante, porque en la mayoría de juegos de este tipo, los movimientos de los objetos se logran modificando la velocidad de los mismos directamente. Algo así:

```c#
rigidbody.velocity = new vector2(targetVelocity.x, rigidbody.velocity.y);
```

Eso aceleraría un cuerpo de 0 a la velocidad deseada de forma instantánea, dando una sensación muy "Mario Bros" al juego. La gran desventaja es que esto rompe todas las físicas. Por ejemplo, si el jugador salta y choca contra una pared mientras mantiene la tecla de movimiento lateral presionada, lo que el motor de físicas intenta hacer es asignar la velocidad indicada de todas formas, haciendo que el personaje se quede "pegado" a la pared y no caiga hasta que el jugador suelte la tecla.

Ese es sólo uno de los muchísimos problemas que trae asignar la velocidad de un cuerpo "a pelo". Yo decidí que en ningún momento modificaría velocidades, sino que añadiría fuerzas y le dejaría ese trabajo al motor de físicas. Algo así:

```c#
rigidbody.AddForce(new Vector2(5, 5));
```

El resultado es una sensación mucho más realista al jugar, sobre todo cuando el personaje interactúa con elementos como cajas, o en especial, con otro personaje que tiene sus propias fuerzas.

Esto atrae otro tipo de problemas, pero creo que vale la pena solucionarlos. En general, durante el desarrollo de un juego surgen innumerables problemas. Muchos de ellos muy tontos, pero que puede costar mucho solucionarlos haciéndote perder una tarde entera tratando de resolverlo, y que finalmente se logra con sólo una línea de código.

### Niveles

JetFight tiene por ahora sólo un nivel. En él hay varias amenazas para los jugadores y está pensado para representar un buen campo de batalla para las peleas entre los 2 personajes.

![](/images/map.jpg)
_Boceto de idea inicial del nivel_

Hice el diseño del nivel con una herramienta gratuita llamada [Tiled](http://www.mapeditor.org/), que facilita muchísimo las cosas. Unity está en el proceso de agregar este tipo de herramientas a su interfaz, pero todavía está en desarrollo.

![](/images/tiled.png)
_Diseño del nivel en Tiled_

Una vez terminado el diseño del nivel, se exporta a Unity usando otra gran herramienta gratuita llamada [Tiled2Unity](http://www.seanba.com/tiled2unity).

![](/images/tiled2.png)
_Exportando el nivel a Unity_

En este proceso además se crean Colliders sobre los tiles en los que así lo especifiquemos, facilitando mucho el desarrollo del lado de Unity y permitiendo que el personaje se pueda posar sobre las plataformas y colisionar contra las paredes.

### Desafíos

Además de los ya mencionados (físicas, lenguaje, etc) me encontré con algún que otro desafío en el camino. Que recuerde los más importantes fueron:

**Cambiar el color del personaje**

Para diferenciar a Jugar 1 del Jugador 2, los personajes tendrían que ser de distinto color. Esto suena obvio a primera vista, pero desde un punto de vista técnico es más complicado de lo que parece.  
Como ya he mencionado, los gráficos de personaje que tengo son sprites (imágenes) que ya existen, y los colores que tiene son los que hay.

Para hacer un jugador de otro color, pero con exactamente las mismas características que el Jugador 1 pensé en un par de alternativas. Una de ellas era crear un nuevo spritesheet cambiando todos los colores del pelo y la ropa, y crear un nuevo jugador en base a ese spritesheet. Esto implicaba mucho trabajo de modificación de imágenes, y además una vez creado el nuevo spritesheet debería crear un nuevo jugador en base a él, volviendo a generar cada una de las animaciones (que van vinculadas al viejo spritesheet) entre otros problemas. Y no quiero ni pensar en si más adelante se me ocurre meter más jugadores usando esta técnica.

Investigando un poco más, me crucé con lo que en el mundo de Unity se llaman "[Shaders](https://docs.unity3d.com/Manual/ShadersOverview.html)". Son scripts &nbsp;que contienen operaciones matemáticas y algoritmos para calcular el color de cada uno de los píxeles renderizados, basándose en la iluminación que reciben y el material que tengan aplicado. Un poco técnico, pero ésa es la explicación oficial.  
En pagano, lo que significa es que cuando aplicamos un shader a un sprite, éste modifica la forma en que se verá. Esto brinda infinitas posibilidades, pero yo sólo necesitaba dar con una solución. Mi idea era simple: reemplazar un color por otro.

Buscando un poco me encontré con una web donde explican cómo hacerlo: [http://gamedevelopment.tutsplus.com/tutorials/how-to-use-a-shader-to-dynamically-swap-a-sprites-colors--cms-25129](http://gamedevelopment.tutsplus.com/tutorials/how-to-use-a-shader-to-dynamically-swap-a-sprites-colors--cms-25129)

Básicamente lo que hace es, basándose en la paleta de colores RGB de un sprite, busca cualquier color que tenga el número especificado de Rojo (entre 0 y 256) y lo reemplaza por el color especificado. En mi caso es algo así:

```c#
using UnityEngine;
using System.Collections.Generic;

// These are the red values (RGB) of particular sprite part
public enum SwapIndex{
    Eyes = 70,
    Shirt1 = 97,
    Shirt2 = 67,
    Shirt3 = 168,
    Hair1 = 71,
    Hair2 = 127,
    Hair3 = 181
}

public class ColorSwap : MonoBehaviour{
    public bool changeOriginalColor = false;
    public Color eyes;
    public Color hair1;
    public Color hair2;
    public Color hair3;
    public Color shirt1;
    public Color shirt2;
    public Color shirt3;

    private Texture2D mColorSwapTex;
    private Color[] mSpriteColors;
    private SpriteRenderer mSpriteRenderer;

    void Awake(){
        if(changeOriginalColor){
            mSpriteRenderer = GetComponent<SpriteRenderer>();
            InitColorSwapTex();
            Swap();
        }
    }

    void Swap(){
        SwapColor(SwapIndex.Eyes, eyes);
        SwapColor(SwapIndex.Hair1, hair1);
        SwapColor(SwapIndex.Hair2, hair2);
        SwapColor(SwapIndex.Hair3, hair3);
        SwapColor(SwapIndex.Shirt1, shirt1);
        SwapColor(SwapIndex.Shirt2, shirt2);
        SwapColor(SwapIndex.Shirt3, shirt3);
        mColorSwapTex.Apply();
    }

    public void InitColorSwapTex(){
        Texture2D colorSwapTex = new Texture2D(256, 1, TextureFormat.RGBA32, false, false);
        colorSwapTex.filterMode = FilterMode.Point;

        for (int i = 0; i < colorSwapTex.width; ++i)
            colorSwapTex.SetPixel(i, 0, new Color(0.0f, 0.0f, 0.0f, 0.0f));

        colorSwapTex.Apply();

        mSpriteRenderer.material.SetTexture("_SwapTex", colorSwapTex);

        mSpriteColors = new Color[colorSwapTex.width];
        mColorSwapTex = colorSwapTex;
    }

    public void SwapColor(SwapIndex index, Color color){
        mSpriteColors[(int)index] = color;
        mColorSwapTex.SetPixel((int)index, 0, color);
    }

    public void ClearAllSpritesColors(){
        for (int i = 0; i < mColorSwapTex.width; ++i){
            mColorSwapTex.SetPixel(i, 0, new Color(0.0f, 0.0f, 0.0f, 0.0f));
            mSpriteColors[i] = new Color(0.0f, 0.0f, 0.0f, 0.0f);
        }
        mColorSwapTex.Apply();
    }
}
```

Simplemente declaro el componente R de cada uno de los colores que quiero reemplazar (pelo, ojos, ropa, etc.) y lo cambio por otro color predefinido.

El resultado es el siguiente:

![](/images/jetfight.png)

El jugador es básicamente el mismo y no he tenido que duplicar código ni imágenes. Simplemente aplicar el shader y definir los colores en las propiedades del jugador:

![](/images/colors.png)

Et voilá!

**Controles**

Este tipo de juegos es siempre más divertido usando joysticks. El problema es que Unity tiene una manera un poco críptica de administrarlos, pero investigando un poco logré hacerlos funcionar. De hecho, todos los controles pueden ser modificados desde la pestaña _Input_ en la pantalla de configuración que se lanza al inicio del juego:

![](/images/jetfight2.png)
### Resultado

El resultado final es un juego bastante entretenido y con todas las funcionalidades que, aunque básicas, funcionan relativamente bien para se la primera versión.

{% include embed/youtube.html id='v6GJNbuP7Iw' %}

![](/images/jetfight3.png)

![](/images/jetfight4.jpg)

![](/images/jetfight5.jpg)

![](/images/jetfight6.jpg)
### Publicación y distribución

Hay varias plataformas para la distribución de juegos independientes, siendo [Steam](http://store.steampowered.com/) por mucho la mas importante. La desventaja que tiene es que como desarrollador te obligan a pasar por un proceso de registro en el cual es obligatorio hacer un pago inicial de U$D 100 y ademas tener a tu nombre una empresa con la cual facturar la venta de cada una de las copias de tu juego. No sólo eso, si no que deberás pagar al estado los impuestos correspondientes por cada venta, más los gastos fijos que suponen tener una empresa, más la comisión que te cobra Steam, que al momento de escribir este artículo es de un nada despreciable 15% del valor de cada venta. Finalmente, PayPal se queda con U$D0.30 + 2.9% del valor de cada venta.  
No hace falta ser un astrofísico de la NASA para darse cuenta de que a menos que te dediques a ello y tengas un estudio serio, no conviene publicar tu juego en su plataforma bajo ningún concepto.  
Pero no termina ahí... Para que tu juego sea publicado, tiene que pasar por un proceso de aprobación de los usuarios llamado [GreenLight](https://steamcommunity.com/greenlight/), que por medio de votaciones deciden si tu juego es apto o no...  
Hay [muchos artículos](https://hipertextual.com/2015/08/steam-greenlight) que hablan de este doloroso proceso y de cómo afrontarlo.

Es por ello que existen alternativas, como el EXCELENTE [itch.io](https://itch.io/), una plataforma con las mismas prestaciones de Steam (aunque lamentablemente no tan popular y por tanto con un alcance menor), pero que tiene grandes ventajas para desarrolladores independientes o estudios con menos recursos. En itch.io el proceso de registro es muchísimo más fácil y se completa en cuestión de minutos. No hace falta aprobación de nadie y simplemente vinculas una cuenta de PayPal a la que irá el dinero de las compras que hagan de tu juego. Además tiene una opción muy interesante (que es la que he adoptado yo) en la que te permite "pagar lo que quieras" por el juego (incluido nada). Es decir, que el juego puede ser bajado de forma completamente gratuita, o pagas el precio que creas justo por él.

![](/images/Itch-io_logo.png)

Otra gran ventaja de itch.io es que como desarrollador te permite decidir qué porcentaje de ventas irá para ellos. Este porcentaje puede incluso ser 0%, pero considero que siempre está bien dejar algo para que esta gente que nos da tan buenas herramientas y nos facilita la vida pueda vivir de algo.

Dispone también de un simple, pero útil tablero en el que te muestra datos analíticos sobre las visitas de la página de tu juego, cantidad de descargas y cantidad de ventas realizadas.

![](/images/analytics.png)
_Tablero de analíticas de itch.io_

### Sonidos

Considero que una parte importante de los juegos son los sonidos que se utilizan.

Inicialmente pensé en usar sonidos de 8 bits que recuerden a juegos antiguos. Para generarlos usé una herramienta online llamada [Chiptone](http://sfbgames.com/chiptone/):

![](/images/chiptone.png)

Pero luego de hacer unas pruebas me pareció que estos sonidos no transmitían lo que yo estaba buscando para este juego en particular.

Finalmente lo que hice fue buscar sonidos en [freesound.org](http://www.freesound.org/), que tienen la gran ventaja de ser gratuitos y libres de derechos, lo cual te da total libertad para usarlos en cualquier proyecto.

Hice modificaciones sobre algunos sonidos usando [Audacity](http://www.audacityteam.org/) para hacer que sean más cortos, largos, que hagan fade-out o loop dependiendo del caso.

![](/images/audacity.png)
_Edición de sonidos en Audacity_

De esta forma logré que el audio del juego esté un poco más a tono con el tema del mismo.

### Descarga

Después de tanto texto, finalmente te dejo el link para que te descargues el juego.

<iframe frameborder="0" src="https://itch.io/embed/81486?linkback=true" width="552" height="167"></iframe>

También dejo el link a la página del juego en la que se explican los controles y algún que otro detalle:  
[https://mattogodoy.itch.io/jetfight](https://mattogodoy.itch.io/jetfight)

### ¿Qué sigue?

Siempre hay cosas para añadir o mejorar en un juego. Es un proceso que podría transformarse en infinito y soy consciente de ello.

Mi próximo objetivo es agregar funcionalidad de red para permitir que los 2 jugadores puedan jugar desde diferentes ordenadores. Es una mejora sumamente compleja de implementar porque a pesar de que Unity trae herramientas para hacerlo, implica la creación de nuevos menús y montones de cosas mas, pero creo que merece la pena.

Una ventaja implícita es que hacerlo traería lugar a la posibilidad de hacer que en un futuro no muy lejano el juego funcione en teléfonos móviles y tablets dado que ya no será necesario que los dos jugadores controlen a sus personajes desde el mismo dispositivo.

¿Quién sabe?

¯\\\_(ツ)\_/¯

Me gustaría que me dejes tu opinión y cualquier sugerencia en los comentarios. Mi valoración del juego no es objetiva porque lo he desarrollado yo. Es como si a una madre le preguntas si le parece que su hijo es feo. Por eso necesito la tuya :)

¡A jugar!
