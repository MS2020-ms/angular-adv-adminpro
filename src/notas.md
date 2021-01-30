#### Arrnacar proyecto
- >ng serve -o 
#### Inicio
- Terminal:
- >ng help (comandos de angular cli)
- >ng new adminpro --skip-git (routing No, CSS Yes)
- >ng cd adminpro
- >ng serve -o (modo desarrollo para ver cambios en tiempo real)(-o abre en navegador)
- Navegador: http://localhost:4200/
# componentes autenticacion
- >ng g c auth/login --skipTests -is
- >ng g c auth/register --skipTests -is
# componentes paginas
- >ng g c pages/error404 --skipTests -is
- >ng g c pages/dashboard --skipTests -is
- >ng g c pages/progress --skipTests -is
- >ng g c pages/grafica1 --skipTests -is 
- >ng g c pages/pages --flat --skipTests -is ( SOLO se muestra cuando este autenticado)
# componentes reutilizables en mi aplicacion (en pages) = elemntos de uso comun
- >ng g c shared/breadcrumbs --skipTests -is
- >ng g c shared/sidebar --skipTests -is
- >ng g c shared/header --skipTests -is
# esquema
- Copiar en carpeta assets como recurso estatico -> css, images, js, plugings del archivo '03-original'
- Usar como template base 'pages-blank.html' del archivo '03-original/main'

- Terminal: 
- >ng serve -o
- Si da ERROR consola = Refused to apply style from '<URL>' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
  Chrome Consola Settings [x]Selected context only
  Solo trabajo con mi contexto y no con las librerias con las que estoy trabajando

# archivo routing
- >ng g m appRouting --flat (m -> modulo)

### Git y Github
# repositorio local
- >git init 
- >git add .
- >git commit -m "diseno de app"
- >git checkout -- . (recupera todo desde el ultimo commit)
# repositorio Githu
- nuevo repositorio. Desde …or push an existing repository from the command line:
- >git remote add origin https://github.com/MS2020-ms/angular-adv-adminpro.git
- >git branch -M main
- >git push -u origin main
# Crear release (lanzamiento) de produccion en Github
- >git tag -a v1.0.0 -m "Diseno listo"
- >git tag
- >git push --tags
- Editar tag en Github en un release de produccion

### Compartimentacion de Modulos = ENCAPSULAR nuestro CODIGO
- >ng g m pages/pages --flat
- >ng g m shared/shared --flat
- >ng g m auth/auth --flat

### Separar Rutas Hijas por Modulo en su propio routing.module.ts
- crear archivo pages/pages.routing.ts con rutas hijas e importar en app-routing.module.ts
- crear archivo auth/auth.routing.ts con rutas abiertas e importar en app-routing.module.ts

### Editar rutas con path especifico
- ruta dashboard/progress y ruta dashboard/grafica1 -> pages.routing.ts y app-routing.module.ts

### Subir cambios a Github
- >git add . (local)
- >git commit -m "Router - Seccion 4" (local)
- >git push (subir Github)
- >git remote -v (ruta a mi repo en github)
# tag
- >git tag (ver listado de tags anteriores)
- >git tag -a v1.5.0 -m "Rutas listo"
- >git push --tags (subir Github)
- >git remote -v (url del repositorio)
- Editar tag en Github en un release de produccion

### Back-Up desde Github
- 1.bajarme desde Github Releases (latest): -> Source code (zip)
    sin carpeta node_modules (>npm install)  
    sin carpeta git
- 2.clonar proyecto de Github:
    Github Code/https (copiar)
    Terminal >git clone 'pegar url'
    sin carpeta node_modules (>npm install)  
    con carpeta git
    >git log (ver todos los commit)

### Centralizar Componentes compartidos en otros componentes
- Crear carpeta components y modulo
- >ng g m components/components --flat
- Crear componente (vinculado al modulo anterior y NO al app.module.ts)
- >ng g c components/incrementador --skipTests -is
- Exportar en components.module para utilizarlo en otros componentes -> progress

### @Input pages/progress (padre) -> components/incrementador (hijo)
### @Output components/incrementador (hijo) -> pages/progress (padre)  

### Cambio propiedad forma condicional ngClass (incrementador)

### Graficas en Angular
- https://valor-software.com/ng2-charts/#/GeneralInfo
- Terminal
  >npm install --save ng2-charts
  >npm install --save chart.js
- importar ChartsModule en components.module (donde esta doughnut.component) -> SOLO donde lo voy a utilizar si es en toda la aplicacion, entonces en app.module
- Componente doughnut

### Nuevo componente reutilizable:  grafica-doughnut
- >ng g c components/doughnut --skipTests -is
- Exportar en components.module para utilizarlo en otros componentes -> grafica1 

### Nuevo componente Ajustes de usuario : account settings
- >ng g c pages/accountSettings --skipTests -is
- cambiar css principal de forma dinamica

### Cambiar clase CSS sin usar ngClass (colocar check en caja seleccionada) : account settings

### Service para : account settings (con LocalStorage)
- >ng g s services/settings --skipTests
- Inyecto mi servicio en constructor -> pages.component.ts
- Inyecto mi servicio en constructor -> account-settings.component.ts
- Trabajo mis funciones desde mi servicio
### Service para : sidebar
- >ng g s services/sidebar --skipTests
- Inyecto mi servicio en constructor -> sidebar.component.ts
- *ngFor -> sidebar.html 
- *ngFor of item.submenu -> sidebar.html 

### RouterLink - ir a una ruta : sidebar
- Ir a sidebar.component.htm y header.component.htm
- Importar el router en shared.module.ts
- Ir a login.html y login.ts
- Importar el RouterModule y FormsModule en auth.module.ts

### Obsevables y Promesas
- nuevo componente 
  >ng g c pages/promesas --skipTests -is
- Anado nuevo link en sidebar (ir sidebar.service)
- https://reqres.in/

### rxjs
- nuevo componente 
  >ng g c pages/rxjs --skipTests -is
- Anado nuevo link en sidebar (ir sidebar.service)

### crear Observable manualmente - componente rxjs.ts
### metodo retry()
### operador map() xa trasformar la salida de un observable 
### operador filter() xa trasformar la salida de un observable 
### llamar al unsubscribe()
### bradcrums usando observables
- enviar nombre de la ruta con propiedad 'data' en pages.routing.ts
- shared/breadcrumbs recupero la data con un observable y coloco en html nombre de la ruta

### BACKEND ###

### Crear Modelo de Usuario
- crear nueva carpeta models
- crear archivo models/usuario.model.ts

### Formulario de registro -Reactive forms
- ir auth/login/login.html
- ir auth/register/register.html
- ir auth/auth.module.ts -> importar ReactiveFormsModule
- ir register.ts y definir formulario
- ir register.html
# Validaciones de formularios
- ir register.ts
- ir register.html -> textos de aviso
# Validacion de password y repetir password
- ir register.ts -> metodo contrasenasNoValidas()
- ir register.html -> textos de aviso

### Grabar usuario en BD
- crear servicio
  >ng g s services/usuario --skipTests
- importar en auth.module.ts -> HttpClientModule
- inyecto en constructor de register.ts -> private usuarioServive: UsuarioService
  y realizar el posteo
- creo nueva carpeta interfaces y nuevo archivo register-form.interface.ts
- insertar en enviroments/enviroments.ts -> base_url: 'http://localhost:3000/api'
- insertar en enviroments/enviroments.prod.ts -> base_url: 'http://localhost:3000/api'
- creo metodo crearUsuario en usuario.service.ts

### SweetAlert2
- https://sweetalert2.github.io/
- >npm install sweetalert2
- en register.ts -> import Swal from 'sweetalert2'
- si da error -> import * as Swal from 'sweetalert';
- ejemplos de sweetalert en https://sweetalert2.github.io/ - examples

### Login de usuario - normal
- ir login.html
- ir login.ts
- ir usuario.service.ts -> metodo login -> defino ruta
- creo nuevo archivo interfaces/login-form.interface.ts
# funcion Remember Me
- al seleccionar en checkbox el Remember Me, guardo el email en el LS. Para poderlo leer y reestablecer el el campo
- ir login.ts

### Guardar informacion en el LocalStorage
- Al hacer login, recibo token, que quiero guardar en LS
- ir usuarios.service.ts 
  import {tap} from 'rxjs/operators'

### Login de usuario - Google Sign-In
- Obtener el token de una autenticacion Google Sign-In
- Ir a https://developers.google.com/identity/sign-in/web/sign-in -> Customize the Sign-In Button
- en index.html -> 
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
<script src="https://apis.google.com/js/platform.js"></script>
 YOUR_CLIENT_ID ver notas.md del BACKEND or https://developers.google.com/identity/sign-in/web/sign-in -> Go to the Credentials page.
- en login.html pegar boton de google Sign-In <div id="my-signin2"></div>
- en login.ts pegar metodos -> onSuccess() y onFailure() y renderButton() y declare const gapi: any;
- en login.ts -> ngOnInit(): void {this.renderButton();}
- ir a https://developers.google.com/identity/sign-in/web/sign-in -> Go to the Credentials page.
  Credenciales -> ID de clientes OAuth 2.0 / Angular-adv Google-Sign-In
  + Agregar URI -> http://localhost:4200 y GUARDAR
- ir a https://developers.google.com/identity/sign-in/web/sign-in -> Authenticate with a Backend Server
  en login.ts onSuccess -> var id_token = googleUser.getAuthResponse().id_token;

# usar el token de Google para autenticarse
- en login.ts elimino onSuccess() y onFailure() [solo si trabajo con VanillaJS sin Class]
- Ir a https://developers.google.com/identity/sign-in/web/sign-in -> Customize the Sign-In Button -> copio var startApp = function() {...
- en login.ts -> pego
- YOUR_CLIENT_ID ver notas.md del BACKEND or https://developers.google.com/identity/sign-in/web/sign-in -> Go to the Credentials page.

- ir usuario.service.ts -> metodo loginGoogle -> defino ruta

### Proteger rutas - GUARD , solo cuando estoy autenticado puedo entrar a pagina dashboard
- >ng g guard guards/auth --skipTests -> (*) canActivate
- ir auth.guard.ts
- ir pages/pages.routing.ts
- ir usuarios.service.ts
- ir login.ts

### Log-Out
- ir usuarios.service.ts
- ir shared/headers.ts
- ir shared/headers.html