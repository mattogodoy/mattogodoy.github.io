---
author: matto
title: Descarga automágica de series con Raspberry Pi
date: 2015-03-09T18:20:00+01:00
image: 
  path: /images/raspberry.jpg
categories:
tags:
- raspberry-pi
- servidores
---

Desde hace un tiempo tengo una [Raspberry Pi](http://www.raspberrypi.org/) versión 1, modelo B.

Para quienes no la conozcan, la Raspberry Pi es básicamente un ordenador con Linux, un procesador ARM de 700 MHz, con 512 MB de memoria RAM, un slot para tarjetas SD, un puerto Ethernet, una salida de audio, un puerto HDMI y uno RCA para la salida de video, y dos puertos USB. Dispone de un co-procesador para la reproducción de video que nos permite ver archivos a 1080p. Además, tiene 26 pines [GPIO](http://es.wikipedia.org/wiki/GPIO) para hacer nuestros propios experimentos con electrónica.

Increíblemente, todo esto entra en una placa del tamaño de una caja de fósforos.

![](/images/raspi.jpg)

Todas estas especificaciones han sido mejoradas por los sucesivos modelos que han ido saliendo con el tiempo.

# Motivación

Son muchas las series de televisión que sigo, y para estar al día, el tiempo que hay que invertir en descargarlas no es poco. Buscar subtítulos y llevar la cuenta de lo que he visto y lo que no. Además, una vez descargados los capítulos, los paso a un disco externo para luego conectarlo a la TV y recién poder verlos.

No me gusta ver series on-line porque se pierde mucha calidad, y aunque existan maravillas como [Popcorn Time](https://popcorntime.io/) para solucionarlo, prefiero verlas en una pantalla grande y con sonido decente.

Dicho esto, pensé en dar una utilidad real a mi Raspberry transformándola en un servidor de descarga de torrents automatizado que haga el proceso completo para tener disponible en mi TV los capítulos nuevos el mismo día en que salen, con subtítulos incluídos.

Si, suena pretencioso, pero como todo, se puede hacer. Además no hay nada mejor que automatizar procesos repetitivos :D

# Idea

Para que el invento sea funcional, tiene que cumplir con las siguientes condiciones:

- Funcionar con WiFi como conexión a Internet.
- Usar un disco rígido externo como almacenamiento.
- Detectar cuando salen nuevos capítulos de las series que sigo.
- Obtener el [Magnet Link](http://lifehacker.com/5875899/what-are-magnet-links-and-how-do-i-use-them-to-download-torrents) para cada uno de los capítulos que quiero descargar.
- Funcionar como cliente de torrents para descargar automáticamente los torrents obtenidos.
- Descargar subtítulos para los capítulos obtenidos.
- Hacer disponibles los capítulos en una red [DLNA](http://es.wikipedia.org/wiki/Digital_Living_Network_Alliance) para poder verlos con un Smart TV a través de WiFi.

# Configuración

Vamos a ir solucionando cada uno de los requerimientos en orden. Algunos son mas simples que otros, pero no hay gran complicación en dejar todo funcionando.

La manera más simple de hacer la configuración es conectado un monitor o TV a alguna de las salidas de video de la Raspberry, pero también puede hacerse íntegramente por [SSH](http://es.wikipedia.org/wiki/Secure_Shell).

## Alimentación de periféricos

Teniendo en cuenta que [no deberíamos exigir más de 100 mA](http://raspberrypi.stackexchange.com/questions/340/how-much-power-can-be-provided-through-usb) a los puertos USB de la Raspberry para no arriesgarnos a quemarlos, y sabiendo que debemos conectar un adaptador WiFi y un disco rígido externo (ambos grandes consumidores de corriente), la solución radica en utilizar un [hub USB](http://es.wikipedia.org/wiki/Hub_USB) alimentado. A diferencia de un hub normal, estos traen un transformador que va a una toma de corriente. No solo nos da más de dos puertos USB, sino que también nos da energía de sobra para todo lo que conectemos.

![](/images/hub.jpg)

En mi caso, uso el de la foto: un [Sitecom CN-51](https://www.sitecom.com/en/usb-hub-7-port/cn-051/p/7), pero cualquiera servirá.

## WiFi como conexión a Internet

Sí, el Raspberry Pi tiene una conexión Ethernet, lo que simplificaría mucho las cosas, pero mi idea es mantener todo el cablerío del «media server» lejos del router que está a plena vista.

Para empezar, el Raspberry no trae WiFi incorporado, y además no todos los adaptadores USB son compatibles (aunque sí la gran mayoría). Luego de buscar en una [lista de dispositivos compatibles](http://elinux.org/RPi_USB_Wi-Fi_Adapters#Working_USB_Wi-Fi_Adapters), terminé comprando un TP-Link TL-WN823N.

![](/images/TL-WN823N.jpg)

La configuración es relativamente sencilla, y puede hacerse directamente accediendo al Raspberry por SSH.

Para conectar la Raspberry a una red con seguridad WPA2-PSK, los pasos a seguir son los siguientes:

### 1. Adaptador

Para asegurarnos de que todo va a funcionar correctamente, primero debemos asegurarnos de que nuestro sistema está actualizado:

```bash
sudo apt-get update
sudo apt-get upgrade
```

Hecho esto, apagamos la Raspberry:

```bash
sudo shutdown -h now
```

Instalamos el módulo USB y encendemos nuevamente la Raspberry.

### 2. Interfaces

Debemos agregar la interfaz correspondiente al adaptador. Para eso editamos el archivo correspondiente:

```bash
sudo nano /etc/network/interfaces
```

Para el caso en que tu Raspberry obtenga su dirección IP utilizando DHCP, reemplazamos el contenido por el siguiente:

```
auto lo
    
iface lo inet loopback
iface eth0 inet dhcp
    
allow-hotplug wlan0
auto wlan0
iface wlan0 inet dhcp
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
```

Si por el contrario, tu Raspberry tiene una dirección IP fija, debes usar esta configuración:

```bash
auto lo
    
iface lo inet loopback
iface eth0 inet dhcp
    
allow-hotplug wlan0
iface wlan0 inet manual
address 192.168.1.100
netmask 255.255.255.0
gateway 192.168.1.1
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
```

**NOTA:** Esto sobreescribirá la configuración de las interfaces de red.

### 3. Configurar la seguridad

El siguiente paso es especificar la red a la que queremos conectarnos, y la contraseña de la misma editando el archivo **wpa\_supplicant** :

```bash
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Dentro del mismo, reemplazamos el contenido por el siguiente:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
        ssid="MiRed"
        psk="MiContraseña"
        proto=RSN
        key_mgmt=WPA-PSK
        pairwise=CCMP
        auth_alg=OPEN
}
```

### 4. Reinicio

Para asegurarnos de que la nueva configuración hará efecto, reiniciamos:

```bash
sudo shutdown -r now
```

Durante el proceso de reinicio, desconectamos el cable de red de la Raspberry (si es que estábamos conectados a ella por SSH) y esperamos a que bootee.

Si todo salió bien, ya podríamos conectarnos a nuestra Raspberry nuevamente, pero esta vez por WiFi. Podemos comprobarlo haciendo ping a su IP:

```bash
ping 192.168.1.100
```

Vamos al siguiente requerimiento...

## Disco externo

Para lograr que nuestra Raspberry sea capaz de leer y escribir archivos en el disco externo, primero debemos montarlo.

Lo conectamos al hub USB y en la terminal ejecutamos:

```bash
sudo fdisk –l
```

Esto nos mostrará un listado de los discos conectados. Entre ellos debemos identificar nuestro disco externo. Normalmente será **/dev/sda1**.

Una vez identificado, lo montamos:
```bash
sudo mount /dev/sda1 /mnt
```

Dado que lo más probable sea que nuestro disco esté formateado en NTFS, asignaremos los permisos correspondientes para poder acceder:

```bash
sudo chmod 775 /mnt
```

Comprobamos que todo está en orden:

```bash
cd /mnt
ls -lah
```

Si vemos un listado de los archivos contenidos en nuestro disco, significa que funcionó correctamente.

El siguiente paso será hacer que este proceso sea automático cada vez que reiniciemos la Raspberry. Para ello editamos el archivo **fstab** :

```bash
sudo nano /etc/fstab
```

y al final del archivo, agregamos esta línea:

```bash
/dev/sda1 /mnt /ntfs defaults 0 0
```

De esta manera nos aseguramos de que siempre tendremos acceso al disco externo luego de reiniciar.

## Detectar nuevos capítulos

Para que nuestro sistema pueda descargar los nuevos capítulos, debemos estar al tanto de cuando están disponibles.

Para ello, nos creamos una cuenta en [ShowRSS](http://showrss.info/), una web que nos permite especificar las series que nos interesan y la calidad de los videos a bajar. Lo único que hace es generar un [feed RSS](http://es.wikipedia.org/wiki/RSS) con los magnet links de cada capítulo a medida en que van saliendo. El resultado es una URL que necesitaremos más adelante. Por ejemplo, la mía es esta:

> [http://showrss.info/user/138760.rss](http://showrss.info/user/138760.rss)

Siendo **138760** mi user ID en ShowRSS.

## Obtener Magnet Links

Para obtener los magnet links de cada capítulo listado en nuestra RSS usaremos [Flexget](http://flexget.com/), que se encargará de pasar el link a nuestro cliente de torrents y nos da también la posibilidad de ordenar las descargas en carpetas y enviar un email al finalizar.

La instalación en linux se hace por medio de [PIP](https://pypi.python.org/pypi/pip) (el repositorio de paquetes de [Python](https://www.python.org/)), y para hacerlo debes seguir estos pasos:

```bash
sudo apt-get install python-pip
sudo pip install flexget
sudo mkdir /home/pi/.flexget
sudo chown -R pi /home/pi/.flexget
sudo chgrp -R pi /home/pi/.flexget
```

Con esto hemos instalado Flexget y creado el directorio donde almacenaremos su configuración. Para crear el archivo de configuración ejecutamos:

```bash
nano /home/pi/.flexget/config.yml
```

Y dentro del archivo pegamos la siguiente configuración:

```yaml
templates:
    global:
    email:
        from: tucorreoqueenvia@gmail.com
        to: tucorreoquerecibe@gmail.com
        smtp_host: smtp.gmail.com
        smtp_port: 587
        smtp_username: tucorreoqueenvia@gmail.com
        smtp_password: tupasword
        smtp_tls: yes
        template: accepted  
tasks:
    rss:
    priority: 1
    rss: http://showrss.info/user/138760.rss
    all_series: yes
    transmission:
        host: localhost
        port: 9091
        username: 'tuusuario'
        password: 'tupassword'
        ratio: -1
        main_file_only: yes
        path: /mnt/Descargas/Flexget
        addpaused: no
        skip_files:
        - '*.nfo'
        - '*.sfv'
        - '*[sS]ample*'
        - '*.txt'
    subtitles:
    priority: 4
    disable: builtins
    find:
        path:
        - /mnt/Descargas/Flexget
        regexp: '.*\.(mp4|mkv|avi)$'
        recursive: yes
    accept_all: yes    
    regexp:  
        reject:
        - '.*[sS]ample.*'
    periscope:
        languages:
        - es
        overwrite: yes
    sort:
    priority: 5
    disable: builtins
    find:
        path: /mnt/Descargas/Flexget
        mask: '*.srt'
        recursive: yes
    accept_all: yes
    seen: local
    thetvdb_lookup: yes
    all_series:
        parse_only: yes
    move:
        to: /mnt/Series/{{ tvdb_series_name }}/
        filename: '{{ tvdb_series_name }} - {{ series_id }} - {{ tvdb_ep_name}}{{ location | pathext }}'
        clean_source: 100
        along:
        - mkv
        - mp4
        - avi
    clean:
    priority: 3
    clean_transmission:
        host: localhost
        port: 9091
        username: 'tuusuario'
        password: 'tupassword'
        finished_for: 1 hours
```

Aquí podemos ver que se especifican varias cosas:

1. Los datos de nuestro email para el caso en que qusiéramos recibir un correo cada vez que tengamos un nuevo capítulo descargado en nuestro disco externo, listo para ser visto.
2. La URL de ShowRSS de la que se obtendrán los torrents y se descargarán todos los capítulos que aparezcan.
3. Usuario y contraseña de Transmission (veremos esto en un momento).
4. La ubicación de las descargas.
5. El lenguaje y ubicación que se dará a los subtítulos encontrados para cada capítulo, que será junto al archivo de video.
6. El orden que debe seguir la estructura de directorios donde almacenaremos los capítulos descargados. En este caso, quedan almacenados en « _Disco/Series/NombreDeLaSerie/NombreDeLaSerie - S01E01 - NombreDelCapitulo.avi_ »
7. Eliminar los torrents de Transmission una vez finalizadas las descargas.

De esta forma, hasta que un capítulo no tenga subtítulos no será movido a la carpeta de la serie y seguirá intentando cada hora encontrar un subtítulo para ella.

Todos estos parámetros pueden ser cambiados, y los correspondientes a nombres de usuarios, contraseñas y URL **deben** ser reemplazados por los tuyos.

Flexget tiene muchos parámetros útiles para configurar. Se pueden ver en profundidad en su [wiki](http://flexget.com/wiki).

## Cliente de torrents

Para la descarga de los torrents usaremos [Transmission](http://www.transmissionbt.com/). Es uno de los clientes más famosos y tiene una [versión específica para Ubuntu](https://launchpad.net/ubuntu/+source/transmission/2.82-0ubuntu1) por medio de la línea de comandos.

Además nos da la ventaja de crear un servidor web al que podemos acceder desde un navegador y agregar nuevos torrents a la descarga.

Para instalarlo hacemos lo siguiente:

```bash
sudo pip install transmissionrpc
sudo service transmission-daemon stop
```

Ahora configuramos Transmission:

```bash
sudo nano /etc/transmission-daemon/settings.json
```

Y dentro cambiamos algunos parámetros:

```json
"download-dir": "/mnt/Descargas",
"incomplete-dir": "/mnt/DescargasIncompletas",
"incomplete-dir-enabled": true
"rpc-username": "miusuario",
"rpc-password": "mipassword",
"rpc-whitelist-enabled": false,
"umask": 0,
```

> Es importante que los valores de usuario y contraseña coincidan con los configurados anteriormente en Flexget.

Hecho esto, iniciamos nuevamente el servicio de Transmission:

```bash
sudo /etc/init.d/transmission-daemon start
```

Ya podremos acceder desde cualquier navegador al cliente web con esta dirección:

> http://[ip-de-tu-raspberry]:9091

Deberías ver la interfaz web de transmission.

## Descarga de subtítulos

En la configuración que hicimos para Flexget, uno de los parámetros especifica la búsqueda y descarga de subtítulos, pero para que eso funcione, primero debemos instalar [Periscope](https://code.google.com/p/periscope/), un módulo programado en python que busca subtítulos en base a los nombres de los archivos de video descargados.

Busca en varias fuentes y normalmente hace un buen trabajo encontrando los subtítulos correctos.

Para instalarlo, ejecutamos:

```bash
sudo pip install periscope
mkdir /home/pi/.config
```

_El último comando es por un bug de Periscope, que si no tiene la carpeta .config falla._

## Automatización

Ya tenemos «casi» todo configurado. Lo que debemos hacer ahora es probar si todo funciona correctamente:

```bash
flexget execute
```

Esto debería consultar nuestro feed de ShowRSS, descargar los torrents de cada capítulo disponible, agregarlos a Transmission y comenzar la descarga dentro del disco externo. Una vez finalizada la descarga, eliminar los torrents de Transmission, buscar los subtítulos para todos los capítulos y moverlos junto a los archivos de video. Finalmente, debe ordenar todos los archivos en directorios separados por nombre de serie y renombrarlos especificando temporada y número de capítulo. MAGIA.

Si todo va bien y los resultados son lo que esperábamos, debemos automatizar este sistema para que compruebe automáticamente y con cierta frecuencia la aparición de nuevos capítulos en ShowRSS, repitiendo el ciclo de descarga con cada uno. El encargado de hacerlo será un [cron](http://es.wikipedia.org/wiki/Cron_(Unix)) (tarea programada de unix). Abrimos el editor crontab:

```bash
crontab -e
```

Esto nos abrirá básicamente un editor [VIM](http://www.vim.org/), por lo que los [comandos](http://vim.rtorr.com/) son algo particulares. Agregaremos una línea al final (aunque lo más probable es que el archivo esté vacío). Para insertar texto, presionamos la tecla «i» y pegamos lo siguiente:

```
@hourly /usr/local/bin/flexget execute --cron
```

Hecho esto, guardamos el archivo con la siguiente secuencia de comandos: «ESC», «:x» y «ENTER».

Esto hace que se ejecute Flexget cada una hora. Si no encuentra nuevos capítulos, no hace nada. Si hay nuevos capítulos en nuestro feed, comienza el ciclo de descarga.

## Configuración del servidor DLNA

Para facilitar aun más las cosas, pondremos nuestros capítulos a disposición de cualquier dispositivo que se encuentre conectado a la red. En mi caso es mi smart TV, pero podrías usar tu Play Station, tu iPad o tu smartphone para ver los capítulos directamente.

Como de costumbre, nos vamos a decantar por el software libre y usaremos [MiniDLNA](https://wiki.archlinux.org/index.php/ReadyMedia) para cumplir nuestro cometido.

Comenzamos por instalarlo en nuestra Raspberry:

```bash
sudo apt-get install minidlna
```

Una vez instalado, vamos a configurarlo:

```bash
sudo nano /etc/minidlna.conf
```

Dentro, buscamos la variable **media\_dir** que indica el directorio a indexar y escribimos la ruta a nuestro disco:

Si quisiéramos indexar más de un directorio, se puede agregar varias líneas de **media\_dir** indicando distintas rutas.

Ahora vamos a configurar el nombre de nuestro servidor. Dentro del archivo buscamos:

```
#friendly_name=My DLNA Server
```

Como verás, está comentado. Lo que debemos hacer es eliminar el **#** del principio, y cambiar el nombre por el que más nos guste:

```
friendly_name=Raspi DLNA
```

Además, queremos asegurarnos de que el servidor indexe automáticamente los archivos nuevos que se vayan descargando. Habilitamos esta opción aplicando en la configuración:

```
inotify=yes
```

Guardamos el archivo. Lo que debemos hacer ahora es iniciar miniDLNA cada vez que se reinicie la Raspberry. Para ello ejecutamos:

```bash
sudo update-rc.d minidlna defaults
```

Y finalmente reiniciamos el servicio:

```bash
sudo service minidlna start
```

De ahora en adelante todos nuestros dispositivos verán la red con nombre «Raspi DLNA».

# Conclusiones

Me encanta la Raspberry y la gran cantidad de cosas que se puede hacer con ella. Más adelante postearé sobre otros proyectos que he desarrollado usándola.

La posibilidad de tener los nuevos capítulos de las series que me gustan en mi TV sin ningún tipo de esfuerzo es muy cómodo. Si bien el sistema no es perfecto y algunas veces puede darnos algún problemilla de configuración, es bastante robusto y funciona muy bien la mayoría de las veces.

Actualmente estoy usando mi Raspberry para otras cosas, por lo que he vuelto al pasado y descargo las series y subtítulos a mano, pero no descarto la posibilidad de comprar una Raspberry extra y dedicarla únicamente a esta tarea. Después de todo sólo cuesta 35€.
