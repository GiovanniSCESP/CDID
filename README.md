# CDID (Firefox)

Extension para Firefox que revisa actividades tipo tarea en CAMPUS Medusa y marca visualmente las que ya estan entregadas.

Sitio objetivo:
https://www3.gobiernodecanarias.org/medusa/eforma/campus/

## Que hace

- Guarda en almacenamiento local el estado de entrega de cada tarea visitada.
- Detecta si una tarea aparece como entregada en la vista de actividad.
- Resalta tareas entregadas en paginas de curso y en el calendario.
- Anade un boton para revisar actividades de un curso y refrescar el estado visual.

## Como funciona

La extension inyecta scripts de contenido en estas rutas de CAMPUS Medusa:

- mod/assign/view.php
- course/view.php
- course/section.php
- calendar/view.php

Cuando abres una tarea, se guarda su id y si esta entregada o no. Luego, en curso/calendario, se leen esos datos para pintar las tarjetas y actividades ya completadas.

## Instalacion en Firefox (modo desarrollador)

1. Descarga o clona este repositorio.
2. Abre Firefox y entra en `about:debugging#/runtime/this-firefox`.
3. Pulsa `Cargar complemento temporal...`.
4. Selecciona el archivo `manifest.json` dentro de la carpeta `CDID-Firefox`.
5. Verifica que aparezca el complemento `CDID` en la lista.

Nota: al reiniciar Firefox, los complementos temporales se eliminan y debes cargarlos de nuevo.

## Uso

1. Inicia sesion en CAMPUS Medusa.
2. Entra a un curso y abre tareas (`modtype_assign`) para que la extension detecte su estado.
3. Vuelve al curso o al calendario para ver los elementos entregados resaltados.
4. Opcional: usa el boton `Revisar Actividades` en la columna izquierda del curso para automatizar una revision rapida.

## Permisos

El manifiesto solicita:

- `scripting`
- `storage`
- `tabs`
- `activeTab`
- `host_permissions` sobre `https://www3.gobiernodecanarias.org/medusa/eforma/campus/*`

Se usan para inyectar scripts, guardar estados y abrir/cerrar pestanas durante la revision automatica.

## Estructura del proyecto

- `manifest.json`: configuracion de la extension (Manifest V3 para Firefox).
- `src/js/cdid_assignment.js`: lectura de estado de entrega en cada tarea.
- `src/js/cdid_course.js`: resaltado en curso y boton de revision de actividades.
- `src/js/cdid_calendar.js`: resaltado de eventos en calendario.
- `icon.png`: icono de la extension.

## Limitaciones conocidas

- La revision automatica puede verse afectada si Firefox bloquea aperturas de pestanas o ventanas.
- El estado depende de haber visitado previamente cada tarea para registrar su id.
- Cambios de HTML en CAMPUS Medusa pueden requerir ajustes en los selectores.

## Desarrollo rapido

1. Edita los archivos en `src/js`.
2. En `about:debugging`, pulsa `Recargar` sobre el complemento temporal.
3. Recarga la pagina del curso/calendario en CAMPUS Medusa.

## Version

Version actual en `manifest.json`: 1.0
