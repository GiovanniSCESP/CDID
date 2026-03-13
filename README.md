# CDID

Extensión para navegador que ayuda a revisar actividades tipo tarea en CAMPUS Medusa y marca visualmente las que ya están entregadas.

Sitio objetivo:
https://www3.gobiernodecanarias.org/medusa/eforma/campus/

## Qué hace

- Guarda en almacenamiento local el estado de entrega de cada tarea visitada.
- Detecta si una tarea aparece como entregada en la vista de actividad.
- Resalta tareas entregadas en páginas de curso y en el calendario.
- Añade un botón para revisar actividades de un curso y refrescar el estado visual.

## Cómo funciona

La extensión inyecta scripts de contenido en estas rutas de CAMPUS Medusa:

- mod/assign/view.php
- course/view.php
- course/section.php
- calendar/view.php

Cuando abres una tarea, se guarda su id y si está entregada o no. Luego, en curso/calendario, se leen esos datos para pintar las tarjetas y actividades ya completadas.

## Instalación (modo desarrollador)

1. Descarga o clona este repositorio.
2. Abre tu navegador Chromium (Chrome, Edge, Brave).
3. Entra en la página de extensiones:
	- Chrome: chrome://extensions
	- Edge: edge://extensions
4. Activa Modo de desarrollador.
5. Pulsa Cargar descomprimida.
6. Selecciona la carpeta CDID-Modificado.

## Uso

1. Inicia sesión en CAMPUS Medusa.
2. Entra a un curso y abre tareas (modtype_assign) para que la extensión detecte su estado.
3. Vuelve al curso o al calendario para ver los elementos entregados resaltados.
4. Opcional: usa el botón Revisar Actividades en la columna izquierda del curso para automatizar una revisión rápida.

## Permisos

El manifiesto solicita:

- scripting
- storage
- tabs
- activeTab
- host_permissions sobre https://www3.gobiernodecanarias.org/medusa/eforma/campus/*

Se usan para inyectar scripts, guardar estados y abrir/cerrar pestañas durante la revisión automática.

## Estructura del proyecto

- manifest.json: configuración de la extensión (Manifest V3).
- src/js/cdid_assignment.js: lectura de estado de entrega en cada tarea.
- src/js/cdid_course.js: resaltado en curso y botón de revisión de actividades.
- src/js/cdid_calendar.js: resaltado de eventos en calendario.
- icon.png: icono de la extensión.

## Limitaciones conocidas

- La revisión automática usa apertura de pestañas; si el navegador bloquea pop-ups, puede no completar todas las verificaciones.
- El estado depende de haber visitado previamente cada tarea para registrar su id.
- Cambios de HTML en CAMPUS Medusa pueden requerir ajustes en los selectores.

## Desarrollo

Para probar cambios:

1. Edita los archivos en src/js.
2. Vuelve a cargar la extensión desde la página de extensiones.
3. Recarga la página del curso/calendario en CAMPUS Medusa.

## Versión

Versión actual en manifest.json: 1.0
