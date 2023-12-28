---
author: matto
title: Certificados SSL gratis con Let's Encrypt
date: 2015-12-04T19:20:00+01:00
image: 
  path: /images/lebg.jpg
categories:
tags:
- servidores
---

Como puedes ver, [matto.io](https://matto.io) ya dispone de una conexión segura gracias a los certificados digitales de la gente de [Let's Encrypt](https://letsencrypt.org/), quienes han abierto una beta pública ayer, y ya están entregándolos a quien los quiera.

![](/images/cert.png)

Para mi sorpresa, el proceso es muy simple y rápido. En unos 10 o 15 minutos puedes tener todo configurado y funcionando.

## Configuración en un servidor Nginx

El servidor HTTP de [matto.io](https://matto.io) es un Nginx. Este proceso variará dependiendo de cuál utilices, pero si usas Apache, aparentemente el proceso es todavía más simple.

Puedes ver [aquí](https://letsencrypt.readthedocs.org/en/latest/using.html) una guía de usuario que explica los pasos para la instalación bajo cada uno de los servidores más importantes. Aquí veremos únicamente Nginx.

### Instalación

El primer paso es acceder vía SSH a nuestro servidor.

Una vez allí, clonamos el repositorio del auto-instalador de **Let's Encrypt** en la ubicación que más nos guste (es indistinto):

```bash
git clone https://github.com/letsencrypt/letsencrypt
```

Detenemos el servicio de Nginx. De lo contrario el instalador nos dará un error:

```bash
service nginx stop
```

Accedemos al nuevo directorio y ejecutamos el auto-instalador pasando algunos parámetros importantes:

```bash
cd letsencrypt
./letsencrypt-auto --agree-dev-preview --server https://acme-v01.api.letsencrypt.org/directory auth
```

En este momento, se abrirá una pantalla azul que nos pedirá nuestra dirección de correo electrónico a modo de contacto. La ingresamos, y le damos a «OK»

En el siguiente paso, nos pedirá los dominios para los cuales queremos generar el certificado separados por espacios y/o comas. En mi caso, lo que hice fue generar el certificado para «matto.io» y «www.matto.io», dado que cuentan como dos dominios diferentes.

![](/images/setup.png)

Le damos a «OK» y luego de unos momentos tendremos nuestros certificados generados.

### Configuración

El siguiente paso es configurar Nginx especificando que queremos utilizar SSL y la ubicación de los certificados.

Para mi caso en concreto, tuve que editar el archivo « **/etc/nginx/conf.d/matto.conf** ». Esto puede variar dependiendo de cómo tengas configurado tu servidor.

Dentro de dicho archivo, busco la sección donde está configurado mi servidor y cambio el puerto de escucha de « **80** » a « **443 ssl** ».

Además, agrego la ubicación de los certificados. De esta manera Nginx sabrá donde buscarlos.

```
server {
    listen 443 ssl;
    server_name matto.io;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/matto.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/matto.io/privkey.pem;

    ...
}
```

Una vez finalizada la edición del archivo de configuración del servidor, volvemos a iniciar el servicio de Nginx:

```bash
service nginx start
```

Listo! Accede a tu web y debería estar funcionando de manera segura.

Fácil, ¿no?
