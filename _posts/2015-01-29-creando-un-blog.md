---
author: matto
title: Creando un blog
date: 2015-01-29T01:56:00+01:00
image: 
  path: /images/code.png
categories:
tags:
- servidores
---

Una vez tomada la decisión de crear este blog, tuve que elegir una plataforma para hacerlo.

## Alternativas

A lo largo de todo internet hay muchas opciones, pero yo quería algo simple que cumpla con las siguientes condiciones:

- Minimalista: No quiero sobrecarga de diseño.
- Fácil de mantener: Quiero concentrarme en escribir, y no en configurar ni arreglar.
- Orientado al blogging: No me interesan los [CMS](http://es.wikipedia.org/wiki/Sistema_de_gestión_de_contenidos)s para este proyecto.
- Dominio propio: Tenía reservado [_matto.io_](https://matto.io) y quería utilizar ese, en vez de tener un subdominio con el nombre de alguna empresa.
- Servidor propio: Que me permita acceso [SSH](http://es.wikipedia.org/wiki/Secure_Shell) para modificar y configurar todo a mi gusto.
- Basado en [JavaScript](http://es.wikipedia.org/wiki/JavaScript): No era determinante, pero sí que prefiero utilizar un servidor [Node.js](http://nodejs.org/) por su rapidez y simplicidad.
- [Open Source](http://es.wikipedia.org/wiki/Código_abierto): El hecho de ser de código abierto me permite hacer modificaciones y ver cómo funciona por dentro.

En el camino, me topé con varias opciones interesantes como [SVBTLE](https://svbtle.com/) o [Silvrback](https://www.silvrback.com/), pero ambas son de pago y de código cerrado.  
[Wordpress](https://wordpress.com) quedó rápidamente descartado porque incumple la mayoría de mis condiciones. Si bien ha mejorado mucho en los últimos años, se ha inclinado a ser más un CMS que una plataforma de blogging como era en sus principios.

## Ghost

Finalmente me decidí por [Ghost](https://ghost.io/). Tiene un diseño simple, es fácil de configurar, es de código abierto, los posts se escriben utilizando [_markdown_](http://daringfireball.net/projects/markdown/syntax) y corre sobre Node.js. Impecable.

Ghost nació de un proyecto de [Kickstarter](https://www.kickstarter.com/projects/johnonolan/ghost-just-a-blogging-platform) que recaudó mas de lo esperado y ahora es una pequeña empresa.  
Ellos te permiten hostear tu blog en sus servidores por un precio mensual accesible, o te dan la posibilidad de [descargartelo](https://github.com/tryghost/Ghost) e instalarlo en tu propio servidor.

## Instalación

Para alojarlo, sabiendo que un hosting web no me sirve &nbsp;dado que normalmente no dan acceso SSH, y si lo dan, no te permiten ejecutar procesos persistentes, llegué a la conclusión de que necesitaría un [VPS](http://www.arsys.info/servidores-virtuales-vps/que-es-un-servidor-privado-virtual-vps/), el cual me serviría además para otros proyectos.

Luego de investigar bastante, me decanté por [Vultr](https://www.vultr.com/pricing/) por su bajo precio y buenas reviews de sus usuarios. Por el momento todo funciona muy bien y estoy sorprendido por la velocidad de los servidores.

Una vez dentro del servidor y después de una [sencilla instalación](http://www.howtoinstallghost.com/how-to-install-ghost-on-ubuntu-server-12-04/) de Ghost, ya tenía el blog arriba.

Lo siguiente sería asociar mi VPS a mi nombre de dominio, porque no creo que mucha gente pueda acordarse de que para entrar al blog tiene que ir a [http://108.61.171.51:2368/](http://108.61.171.51:2368/).  
Para ello tuve que instalar [NGINX](http://nginx.com/) para crear los dominios virtuales y [redireccionarlos al puerto 80](http://www.allaboutghost.com/how-to-proxy-port-80-to-2368-for-ghost-with-nginx/), que es el puerto de acceso [HTTP](http://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol) por defecto, e [instalar y configurar](http://www.servermom.org/how-to-install-and-setup-bind9-on-ubuntu-server/136/) [BIND9](https://wiki.debian.org/Bind9) para que mi servidor pueda comunicarse con el servidor [DNS](http://es.wikipedia.org/wiki/Domain_Name_System) de [Gandi](https://www.gandi.net/), la entidad donde registré mi dominio.

Además, tuve que editar el [archivo de zonas](http://en.wikipedia.org/wiki/Zone_file) de Gandi para que cuando alguien escriba "[http://matto.io](http://matto.io)" o "[http://www.matto.io](http://www.matto.io)" pueda acceder a mi blog.

¡Et voilá!

Si te parece un proceso complicado, es porque lo es. Podría ahorrarme todo esto directamente contratando un hosting de [ghost.io](http://ghost.io), pero no aprendería nada en el camino.

## Mejoras

Para agregar algunas mejoras al blog hice algunas modificaciones:

- [Google Analitics](http://www.google.com/analytics/) para [registrar las visitas](http://ghostforbeginners.com/how-to-add-google-analytics-to-ghost/) del blog.
- [Prism.js](http://prismjs.com/) para [mejorar el resaltado](http://www.incrediblemolk.com/add-code-highlighting-to-your-ghost-blog/) del código fuente embebido en los posts.
- [Disqus](https://disqus.com/) para [agregar comentarios](https://help.disqus.com/customer/portal/articles/1454924-ghost-installation-instructions) a cada post.
- [Una modificación que hice](https://ghost.org/forum/using-ghost/1167-link-targets/7/) para que los links de los posts se abran en un _[target="\_blank"](http://www.w3schools.com/tags/att_a_target.asp)_.
- Agregué algunos iconos en formato [SVG](http://www.w3schools.com/svg/") con enlaces a mis cuentas de [Linkedin](https://www.linkedin.com/in/mattogodoy), [Github](https://github.com/mattogodoy), [Twitter](https://twitter.com/mattogodoy), [RSS](http://matto.io/rss/) y [Gmail](mailto:matto@matto.io) en la portada.

## Conclusión

De momento estoy contento con los resultados. El blog funciona muy rápido gracias al servidor y a que se basa en Node.js. Además, el diseño es simple y funcional como yo quería.

Las funcionalidades que tiene son suficientes, y ya me puedo dedicar a escribir sobre mis proyectos.

Seguramente seguiré haciendo modificaciones y mejoras, pero no creo que sean muy significativas.

Fue duro, pero quedó...

¡Hasta la próxima!

![](/images/bye.gif)
