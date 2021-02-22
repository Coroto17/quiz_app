# PASOS A SEGUIR.

## BACKEND.

Una vez ya con todo el boilerplate list0:

1. Comenzamos una app llamada *users* para ir trabajando la auth de los usuarios allí. `python manage.py startapp users`.
2. Agregamos nuestra app a `settings.base.py`.
3. Vamos a los models.py y agreamos un `AbstractUser`.

Vamos a crear a los usuarios pensando en que vamos a tener profesores y alumnos.

Una vez creados los modelos User y Student, debemos decirle a Django cuáles modelos de usuarios queremos usar por defecto. Esto lo logramos con la variable `AUTH_USER_MODEL = "users.User"`

Aprovechamos que estamos en el archivo `settings` y activamos la opción para que los emails sean únicos `ACCOUNT_UNIQUE_EMAIL = True`

Con esta info, haremos nuestra primera migración y migraremos.

4. Vamos a proceder a crear un superusuario, pero debemos hacerlo desde el shell de django porque le pusimos campos extra a `AbstractUser`. Para crearlo ejecutamos `python manage.spy shell` y lo hacemos con código, de la siguiente manera:
```
user = User.objects.create_user(
username = "ecc2",
password = "una password que no sea común",
is_student = False,
is_teacher = True,
is_superuser = True,
is_staff = True
)
```
`CORS_ORIGINAL_WHITELIST`: recordar agregar a `http://localhost:8000` en este setting para poder hacer peticiones al backend.

5. Una vez con nuestro usuario ya creado, desde el frontend no podemos hacer login (error 400) porque no hemos configurado la parte de rest-auth para que funcione con nuestro esquema de usuarios.

Nos vamos a ir a la documentación de dj-rest-auth para ver como podemos configurar serializers personalizados para cada endpoint. [url](https://dj-rest-auth.readthedocs.io/en/latest/configuration.html).

Queremos configurar el serializer de los detalles de usuario para decirle a rest-auth qué modelo de usuario estamos usando y su serializer.
```
REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'path.to.custom.LoginSerializer',
    
}
```
También es super importante especificar el `REST_AUTH_REGISTRATION_SERIALIZER` para poder registrar usuarios, ya que debemos decir si es estudiante o profesor. Seguun la documentación, debe tenr un método `save()` que retorne una instancia del modelo.
```
REST_AUTH_REGISTER_SERIALIZERS: {
    'REGISTER_SERIALIZER': 'path.to.custom.RegistrationSerializer'
}
```
Una vez configuradas estas opciones en `settings.base`, nos vamos a dedicar a escribir los serializers.

6. Consejo para los serializers: ir a la documentación y leer; googlear cómo lo han hecho otros. Ver el demo project de dj-rest-auth. Creamos serializer de user y de register user en el archivo `users.serializers`

En este paso arreglamos en frontend para que envíe todos los campos requeridos para el registro, y para guardar en el cliente al usuario y si es teacher o student, junto con su token.

Durante este paso seguimos teniendo error 500, así que necesitamos escribir y modificar el método `save()` del `CustomRegisterSerializer`. Importamos a `get_adapter()` desde el serializer de registro de `dj-rest-auth` y modificamos el método `save()` para incluir los campos personalizados que tenemos.

Nos logeamos en el admin site para verificar que los campos esten llenos de manera correcta (Hay que registrar la app en admin site).

7. Ahora vamos a cambiar la manera de ver a los Users en el admin site. Vamos a personalizar desde el archivo `admin.py`.

En el `admin.py` lo que hicimos fue cambiar la manera de ver, crear y editar usuarios en el admin site.

8. Ahora vamos a crear una nueva vista en el backend para las tareas (assignments) que fueron calificadas. Para ello vamos a modificar el archivo `views.py` dentro de la app `users`. Vamos a crear viewsets para no escribir tanto código.

Una vez creado el viewset en `views.py` vamos a irnos a `urls.py` a crear la ruta.

Una vez creada la ruta allí, vamos al `urls.py` del proyecto y agregamos la ruta que va a preceder a la que acabamos de agregar.

9. Una vez confirmado que lo anterior funciona, vamos a crear una manera de acceder a los datos desde el frontend.

Aquí nos dimos cuenta de que al hacer login, debemos configurar en el backend qué datos y cómo los vamos a recibir (no solo el token sino los atributos del usuario que hizo login).

Creamos un custom token serializer, lo agregamos a `settings.py` en el el dict `REST_AUTH_SERIALIZERS`, de la siguiente manera:
```
REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "users.serializers.UserSerializer",
    "TOKEN_SERIALIZER": "users.serializers.TokenSerializer"
}
```
Dentro del `TokenSerializer` colocamos qué campos vamos a enviar al frontend, a parte del token mismo.

Una vez configurado el backend, lo que hacemos es configurar el Layout para que nos muestre una ruta `/profiles/:id` en donde el `id` será el del usuario.

## CREAR ASSIGNMENTS.

Ahora vamos a ampliar nuestra api para crear asignaciones.

1. Nos vamos al shell y creamos una nueva app llamada api:
```
python manage.py startapp api
```
Ahora vamos a configurarla.

2. Nos vamos al `models.py` de nuestra nueva app para crear los modelos con los que vamos a estar trabajando.

Una vez creados nuestros modelos (Assignment, Question, GradedAssignment, Choice), vamos a `settings.py` y agregamos nuestra nueva app, y procedemos a crear las migraciones desde el shell `makemigrations`, `migrate`.

3. Dentro de nuestra app api, vamos a crear 2 folders, una para manejar las urls de los viewsets de GradedAssignment y otra para crear las urls relacionadas con el viewset Assignment.

Dentro de cada carpeta va a ir en un principio, un archivo `urls.py`. Luego vamos a seguir el flujo normal de django:

* Creamos los viewsets dentro de `api.views`.
* Creamos el serializer en un módulo `api.serializers`
* Vamos al `admin.py` dentro de `api` a registrar los modelos que creamos.

4. Vamos a probar creando desde el website `admin`, un nuevo Assignment.

Recordar que debemos setear `urls` para que nos aparezca la info requerida.

5. Una vez probado, vamos ahora a crear el frontend para ver los assignments.

Nuestro nuevo componente se llamará `AssignmentList`. En este punto, nos vamos a la doc de Antd a buscar un componente List.

Una vez puesta la lista desde antd, colocamos ese componente en la ruta `"/"`.

Ahora, ya que podemos ver nuestro componente allí con la dummy data, vamos a utilizar react redux para que maneje la lista de assignments.

el flujo es el siguiente:

* Vamos a `actions` a crear un nuevo archivo que se llamará `assignments`. Éste tendrá código similar a las actions de auth, así que copiamos el código para trabajar en él.
* Luego vamos a crear un nuevo reducer para manejar `assignments`.
* Luego vamos al `index.js` a agregar nuestro nuevo reducer.
* Ahora vamos al componente `AssignmentList` y lo conectamos al store.

Como extra vamos a añadir un Skeleton desde antd para mostrar algo cuando está cargando la data.

6. Continuando con el frontend, ahora debemos decirle a nuestro componente que cuando tengamos el token se traiga la data del servidor.

Una vez creada esta lógica, vamos a crear un `AssignmentDetail` para ver el detalle de cada assignment.

7. Vamos a crear otro componente `AssignmentDetail` para ver el detalle de cada assignment.

* Lo primero es agregar la ruta al `routes.js`.
* Vamos a crear una `Card` para mostrar el detalle del assignment. Nos vamos a traer el componente desde antd.
* Dentro de este componente, vamos a crear la lógica para mostrar solo una pregunta a la vez, con sus botones Prev y Next. Para ello vamos a estar trabajando con redux.

8. Vamos a crear actions para trabajar con los assignment details. Vamos a agregar el código a `assignments.js` en nuestras actions.

Tambien vamos a agregar al reducer todas las acciones anteriores, así como a las actionTypes. Todo dentro de nuestra action `assignments`

9. Luego de esto, nos vamos al componente que muestra el Detail y vamos a conectarlo al store.

Una vez conectado al store, vamos a cambiar `settings.py` en el backend para que muestre el assignment solo si está autenticado el usuario.
```
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ],
}
```
Cambiamos `AllowAny` por `IsAuthenticated`.

10. Ahora vamos a crear la vista para ir pasando las preguntas de los assignments con un componente de antd llamado `Steps`.

Para esta vista, crearemos un nuevo container llamado `Questions.js`.

Vamos a llevar `Questions` a `AssignmentDetail`, y vamos a colocarle como props las questions de `currentAssignment`.

En este punto tenemos a `AssignmentDetail` renderizando `Quesitons`.

11. Vamos a ir al backend a acomodar algunas cosas. Primero vamos a personalizar el AssignmentSerializer para que nos traiga las questions (similar a como personalizamos UserSerializer).

No se mostró como se crean las questions y las choices así que toca adivinar aquí.

12. Vamos a ir al backend nuevamente a configurar que se vean los textos de todas las cosas que hasta ahora están mostrando integers (el teacher, las choices, etc).

Para ello vamos a crear un serializer llamado `StringSerializer`, que nos convierte todo a su string repr.

13. Crearemos un nuevo componente llamado `Choices`. Éste será un `Radio` de antd. Éste componente lo vamos a colocar dentro de AssignmentDetail para que nos muestre las choices de la pregunta actual.

El procedimiento para crear las preguntas en el backend es el siguiente:

* Creamos las choices.
* Creamos una Question.
* A ésta le asignamos las choices que queremos mostrar, y seleccionamos la respuesta.
* Le ponemos por último el order, y le asignamos la question a un assignment.

14. Ahora vamos a pasarle las options en el frontend al componente respectivo `Choices`.

Por alguna razón se movió el valor de `Choices` a su componente padre `AssignmentDetail` junto con el método `onChange`. La razón es que, al ser el parent de las choices, podemos preservar el estado a través de las diferentes preguntas que vamos respondiendo.

la question.id de cada choice, será el q.order de la question.