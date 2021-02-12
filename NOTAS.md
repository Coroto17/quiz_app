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
user = User()
user.username = "ecc2"
user.password = "una password que no sea común"
user.is_student = False
user.is_teacher = True
user.is_superuser = True
user.is_staff = True
user.save()
```
`CORS_ORIGINAL_WHITELIST`: recordar agregar a `http://localhost:8000` en este setting para poder hacer peticiones al backend.

5. Una vez con nuestro usuario ya creado, desde el frontend no podemos hacer login (error 400) porque no hemoc configurado la parte de rest-auth para que funcione con nuestro esquema de usuarios.

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

7. Ahora vamos a probar login.