# Proyecto de Neoris

## Descripción del Proyecto

En este repositorio se encuentra el código de nuestro proyecto de Neoris, el cual está estructurado en varias ramas principales para la colaboración y desarrollo de diferentes características por parte de nuestro equipo.

## Estructura del Repositorio

A continuación, se presenta un diagrama que muestra la estructura de las ramas principales del repositorio:

          +---> Kike (Dashboard, Cursos, Admin, FAQ )
         |
          +---> Hector (Creacion de mi cuenta , Login )
         |
          +---> Diego (creacion de Api Rest con su conexion a la base de datos)
         |
# Cómo Contribuir al Proyecto de Neoris

Este documento guía paso a paso el proceso para contribuir al proyecto. Asegúrate de seguir estos pasos para mantener una gestión eficiente del código y colaborar de manera efectiva.

## Configuración Inicial

Antes de poder contribuir al proyecto, necesitas configurar tu entorno de desarrollo.

### 1. Clonar el Repositorio
## Para obtener una copia del repositorio y trabajar localmente en tu computadora, ejecuta el siguiente comando en tu terminal:


git clone https://github.com/NeorisProject/Neoris.git
cd Neoris

### 2. Crear una Nueva Rama
## Es importante que cada nueva característica o corrección se realice en una rama separada basada en main. Asegúrate de estar en la rama main y actualizado:

git checkout main
git pull

## Crea y cambia a tu nueva rama (reemplaza nombre-rama con un nombre descriptivo para tu rama):
git checkout -b nombre-rama

### 3. Agregar Cambios
##Para agregar todos los archivos modificados al staging area:

git add .

### 4. Hacer un Commit
## git commit -m "Descripción breve de los cambios"

### 5. Push a GitHub
## Envía tus cambios a GitHub:

git push origin nombre-rama

### 5. Sincronizar con Main
## Antes de realizar el merge de tu rama con main, es importante actualizar tu rama local con cualquier cambio que otros hayan realizado en main:

git checkout main
git pull
git checkout nombre-rama
git merge main


## Si hay conflictos, resuélvelos. Después de resolver los conflictos, realiza un commit de los cambios:
git add .
git commit -m "Resolve conflicts"

### 6. Crear un Pull Request
En GitHub, ve a la página del repositorio y selecciona tu rama. Haz clic en 'New pull request'. Asegúrate de que la rama base sea main y compara con tu rama. 
Llena la información necesaria sobre tu pull request y envíalo para revisión

### 7. Merge a Main
Una vez que tu pull request haya sido revisado y aprobado, puedes hacer merge a la rama main. 
Esto usualmente se hace en la interfaz de GitHub, pero también puedes hacerlo localmente y luego push:

git checkout main
git merge nombre-rama
git push origin main
