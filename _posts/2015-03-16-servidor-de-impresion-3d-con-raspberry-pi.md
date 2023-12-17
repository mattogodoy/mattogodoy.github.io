---
author: matto
title: Servidor de impresión 3D con Raspberry Pi
date: 2015-03-16T18:54:00+01:00
image: 
  path: /images/octo-raspi.jpg
categories:
tags:
- impresora-3d
- raspberry-pi
- servidores
---

Ya hemos hablado en [posts anteriores](http://matto.io/descarga-automagica-de-series-con-raspberry-pi/) sobre los diversos usos que podemos dar a la todopoderosa [Raspberry Pi](http://www.raspberrypi.org/).

Hoy veremos cómo transformarla en un servidor de impresión 3D gracias al excelente proyecto creado por una chica alemana llamada [Gina Häußge](https://twitter.com/foosel).

# Octoprint

El proyecto en cuestión se llama [Octoprint](http://octoprint.org/), y es un servidor programado en [Python](https://www.python.org/) con una interfaz web que nos permite controlar nuestra [impresora 3D](http://matto.io/armando-una-impresora-3d-parte-1/) a través de una red privada o, por qué no, desde [Internet](http://media.giphy.com/media/iYDlg0CljYqTm/giphy.gif).

![](/images/octoprint.png)

Esto nos da la libertad de no tener que dejar un ordenador conectado a la impresora. Podemos comenzar una impresión desde la oficina, o ver como avanza el proceso desde nuestro smartphone en tiempo real desde cualquier parte del mundo.

Otra ventaja interesante es que Octoprint tiene soporte para conectar una cámara web con la cual podremos hacer un [time-lapse](http://es.wikipedia.org/wiki/Time-lapse) o transmitir un video en [tiempo real](http://en.wikipedia.org/wiki/Streaming_media) mostrando el proceso de impresión.

# Raspberry Pi

La Raspberry es perfecta para hacer este tipo de proyectos debido a su pequeño tamaño y bajo consumo eléctrico en contraste con su más que aceptable potencia.

Una buena noticia es que gracias a un proyecto Open Source llamado [OctoPi](https://github.com/guysoft/OctoPi), tenemos disponible una [distro](http://es.wikipedia.org/wiki/Distribución_Linux) de Linux específica para Raspberry que viene con todo lo necesario ya pre-instalado y pre-configurado. Esto nos simplifica mucho las cosas para los pasos que siguen.

# Configuración

Para empezar, lo que debemos hacer es ir al repositorio de Github de OctoPi y descargar la última versión estable de la imagen de disco:

> [https://github.com/guysoft/OctoPi](https://github.com/guysoft/OctoPi)

Una vez descargado el archivo, lo instalamos en una tarjeta SD que irá en la Raspberry.

Una gran ventaja es que podemos tener varias tarjetas SD con distintos proyectos, y simplemente ir cambiándolas para que la Raspberry cumpla una función completamente distinta.

El proceso de instalación de la imagen en la SD dependerá del sistema operativo que estes utilizando.  
En el sitio web de Raspberry tienen tutoriales que explican cómo hacerlo para los más habituales:

- [Mac OS](http://www.raspberrypi.org/documentation/installation/installing-images/mac.md)
- [Linux](http://www.raspberrypi.org/documentation/installation/installing-images/linux.md)
- [Windows](http://www.raspberrypi.org/documentation/installation/installing-images/windows.md)

Una vez instalado OctoPi en la SD, debemos conectar todos los periféricos necesarios a la Raspberry usando el hub USB alimentado, tal como vimos en el post «[Descarga automágica de series con Raspberry Pi](http://matto.io/descarga-automagica-de-series-con-raspberry-pi/)». En mi caso conecté el adaptador WiFi para la conexión a Internet, una webcam para ver el proceso de impresión y obviamente la propia impresora 3D. También un teclado, un mouse y un monitor para la configuración. Estos tres últimos podemos quitarlos una vez tengamos todo funcionando.

Instalamos la tarjeta SD en la Raspberry y la encendemos. Durante el primer arranque, se nos abrirá una pantalla en la que debemos configurar un par de cosas:

![](/images/raspi-config.png)

Lo primero es hacer una expansión del sistema de archivos. Esto permite que podamos hacer uso de toda lac apacidad disponible dentro de la tarjeta SD. Para ello, marcamos «Expand Filesystem» y le damos _Enter_.

También es importante cambiar los datos de usuario y contraseña del sistema operativo. Los que trae por defecto son:

> Usuario: pi

> Contraseña: raspberry

El problema es que nunca debemos dejar contraseñas por defecto, y mucho menos en dispositivos que van a estar conectados a Internet. A menos que no nos moleste que algún desconocido controle nuestra impresora a distancia...

Cambiamos la contraseña seleccionando «Change User Password». Nos la pedirá 2 veces y quedará establecida.

Finalmente reiniciamos la Raspberry seleccionando «\< Finish \>» y esperamos a que bootee nuevamente. Cuando lo haga, entrará en el escritorio de Linux, donde ya podremos usar el mouse.

El último paso es conectar la Raspberry a Internet. Si la conectamos usando un cable de red, ya debería estar funcionando. Si, como es mi caso, vas a usar WiFi, hay que seguir una serie de pasos simples:

1. Doble click en el icono del escritorio que dice «WiFi Config»
2. Click en el botón «Scan»
3. Cuando aparezca tu red en la lista, doble click en el nombre de la red.
4. En la ventana que se abre, escribimos la contraseña de la red en el campo «PSK»
5. Click en el botón «Add»

Esto debería mantener la Raspberry conectada a la red local y a Internet.

Ya podemos desconectar el monitor, el teclado y el mouse. Ya no los necesitaremos.

# Acceso

Teniendo todo configurado, ya podemos acceder a la Raspberry desde cualquier dispositivo conectado a la red.

Otra de las ventajas de OctoPi es que nos crea un dominio del tipo «[.local](http://www.howtogeek.com/167190/how-and-why-to-assign-the-.local-domain-to-your-raspberry-pi/)», con lo cual podemos acceder a OctoPrint fácilmente escribiendo en el navegador:

> [http://octopi.local](http://octopi.local)

Para el caso en que hayamos conectado una webcam, podemos ver el streaming en vivo desde:

> [http://octopi.local/webcam/?action=stream](http://octopi.local/webcam/?action=stream)

La primera vez que accedamos a la pantalla principal de OctoPrint, nos pedirá que creemos un usario y una contraseña. Es importante destacar que este usuario no guarda ninguna relación con el que establecimos durante la configuración de la Raspberry. En este caso es un usuario que servirá únicamente para conectarnos a OctoPrint:

![](/images/user.png)

Una vez ingresados los datos, le damos al botón «Keep Access Control Enabled». También nos da la opción de acceder sin pedir autenticación, pero no lo recomiendo.

# Usando OctoPrint

Una vez dentro de OctoPrint, lo primero que debemos hacer es conectar con la impresora. Para ello, seleccionamos los datos correctos en la sección «Connection» del menú de la izquierda y le damos a «Connect».

![](/images/octo.png)

Si todo sale bien, el estado cambiará a «Operational», y ya estamos listos para interactuar con la impresora.

## Archivos

Para imprimir un archivo GCODE basta con darle al botón «Upload» en el menú de la izquierda y seleccionarlo en el navegador de archivos.

Una alternativa es arrastrar el archivo y soltarlo en la pantalla de OctoPrint.

## Temperaturas

En esa misma pantalla, en la pestaña «Temperature», podemos ver y asignar los valores de temperatura de la cama caliente y el hot-end, que se mostrarán en un gráfico en función del tiempo.

Esto normalmente es bastante útil para llevar un control sobre las temperaturas en tiempo real, y ver si los valores son los correctos.

## Control

En la pestaña «Control» tenemos algunos controles básicos sobre los ejes y los motores de la impresora, así como de sus ventiladores:

![](/images/control.jpg)

Si tenemos una webcam conectada, aquí es donde la veremos.

## Visor de GCODE

En la pestaña «GCode Viewer» veremos la pieza que estamos imprimiendo:

![](/images/gcodeviewer.png)

Aquí vemos también el avance de la impresión, lo que nos permite ver en tiempo real por qué parte del proceso vamos.

## Terminal

En la pestaña «Terminal» tenemos, como su nombre lo indica, una terminal para interactuar con la impresora a un nivel más bajo, permitiéndonos enviar comandos específicos directamente:

![](/images/serial.png)

También tiene la ventaja de que nos muestra el [log](http://en.wikipedia.org/wiki/Server_log) que devuelve la impresora en cada momento.

## Timelapse

Finalmente, en la pestaña «Timelapse» tenemos la opción de generar un video basado en fotos tomadas cada cierto tiempo, mostrando la evolución de la pieza impresa:

![](/images/timelapse.png)

Siendo el resultado algo como esto:

{% include embed/youtube.html id='jWqcX-dUo1o' %}

# Conclusión

Una vez más queda demostrado que los usos para la Raspberry son incontables, y que la comunidad Open Source tiene proyectos excelentes para compartir.

Mi experiencia con OctoPrint fue más que positiva. En un momento dado tuve algunos problemas de desconexión a mitad de la impresión, por lo que escribí a la creadora del proyecto y se tomó el tiempo de responderme e intentar ayudarme. Valoro mucho ese tipo de cosas que lamentablemente son cada vez menos comunes.

Actualmente mi Raspberry está cumpliedo otras funciones, pero no descarto volver a usarla para esto. Este es otro de los casos donde creo que merece la pena comprar una Raspberry y dedicarla únicamente a esta tarea.

Estoy pensando en un proyecto en el que pueda conectar un [relay](http://es.wikipedia.org/wiki/Relé) a una de las entradas GPIO de la misma Raspberry, que me permita encender y apagar la impresora remotamente. De esta manera puedo dejarla imprimiendo mientras estoy en mi trabajo y no hace falta que quede encendida hasta que vuelva a casa a apagarla. Si lo hago, claramente haré un post al respecto.

¡Hasta la próxima!
