# 👋 Bienvenido a Data Warehouse Project 🌟

> Programa Intensivo

> Desarrollo Web Full Stack

> Proyecto 4: Creación de una herramienta para la administración de contactos para una compañía de Marketing.

## ¿Qué es?

Es un proyecto que integra una aplicación backend y frontend en javascript y nodejs para una compañía de marketing, nuestra compañía se llama U.S.S. Corporation. El sistema permite las operaciones propias del CRUD (Create, Read, Update, Delete) implementadas sobre una base de datos. Este sistema permite entre otras: operaciones relacionadas con usuarios como creación de un perfil, actualización de información y otras. Otorga además de las anteriores a quien cuente con el perfil de administrador la posibilidad de editar la información de los usuarios, compañías, clientes y regiones y la vista única de la base de datos de usuarios.

### Configuración de la base de datos:

- Conexión a base de datos relacional con el motor mysql a través de manejador de base de datos DBeaver
  > Nota: Puedes elegir la herramienta de administración de bases de datos de tu preferencia e inicializar el servidor.
  > Ten en cuenta lo siguiente:
- Server Host: localhost
- Database: DataWarehouse
- Username: Acamica
- Password: Acamica123
- Dialect: mysql
- Port: 3307

> Si deseas dentro de la carpeta data_warehouse_be encontraras un archivo llamado fillDatabase.js en el cual encontraras la base de datos.

## Iniciando el proyecto:

Una vez hayas realizado lo pertinente para crear y configurar la base de datos, deberas dirigirte al editor de código de tú preferencia y realizar los siguientes pasos:

### Configuración del Servidor:

- Puerto: 4000
- Descripción: Requieres hacer uso de la librería express para realizar la configuración del servidor.
  > npm install express.

### Instalación de Dependencias:

Utiliza npm install para realizar las instalación de las dependencias que se encuentran en el archivo package.json respetando de ser posible las dependencias de desarrollo.

##### Dependencias de Desarrollo (devDependencies):

- nodemon
- sequelize-cli
- prettier

##### Dependencias (dependencies):

- bcrypt
- dotenv
- jsonwebtoken
- body-parse
- express-json-validator-middleware
- cors
- helmet
- mysql2
- sequelize
- sweetalert

### Inicialización:

npm run devStart

### Configuración y parametrización de la base de datos:

Dado que este proyecto cuenta con la dependencia dotenv; en el archivo ".env" podrás encontrar los parámetros necesarios para la configuración del proyecto.

## LICENCIA

> Copyright © 2021 Paola Andrea Cadena Joya
>
> Este proyecto tiene la siguiente licencia: [MIT]
