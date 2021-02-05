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

### Centralizar y recuperar la informacion del usuario logado
- ir usuarios.service.ts en metodo validar token

### Mostar imagen y nombre del perfil de usuario en header y sidebar
- ir usuario.model.ts
- ir shared/header.html
- ir shared/header.ts

### Optimizaciones del Email largos (igual para el nombre)
- si el email es muy largo descuadra el montaje:
- ir header.html -> pipe de 0 a 20 caracteres -> {{usuario.email | slice:0:20}}
- colocar ... tras los emails largos cortados
- anadir -> {{(usuario.email.length > 20) ? '...' : ''}}

### Crear pagina del perfil del usuario
- puedo cambiar mi nombre usuario, email y foto
- creo nuevo componente
  >ng g c pages/perfil --skipTests -is
- mostrar el componente cuando hago click en sidebar/My Profile
- en pages.routing.ts creo nueva ruta
- en sidebar.html -> navegacion con routerLink
- en header.html -> navegacion con routerLink
- ir perfil.html
# Actualizar el perfil del usuario
- importar ReactiveFormsModule en pages.module.ts
- ir perfil.ts
- ir perfil.html
- ir usuario.service.ts -> actualizarPerfil() y defino ruta del BACKEND
# Servicio de carga de imagenes xa usuarios, hospitales y medicos
- crear servicio 
  >ng g s services/fileUpload --skipTests
- ir pages/perfil.ts -> inyecto servicio e implemento metodo cambiarImagen()
- ir pages/perfil.html
# Mostrar vista previa de la imagen
- ir usuario.model.ts 
- ir perfil.html y perfil.ts
# Mensajes al usuario
- ir perfil.ts
# Bloquear cambiar email si logado como usuario de Google
- ir pages/perfil.html
- ir BACKEND controllers/usuarios.js

###### OBJETIVOS: 
# primero crear un Mantenimiento de usuarios completo
# segundo crear un componente re-utilizable que nos permita subir fácilmente imágenes de Hospitales, Usuarios y Médicos.

### MANTENIMIENTO
- ir sidebar.service.ts y crear otra lista de mantenimiento
- ir sidebar.html y establecer icono dinamico <i></i>
# Crear componente usuarios
- crear nueva carpeta pages/mantenimientos
- nuevo componente 
  >ng g c pages/mantenimientos/usuarios --skipTests -is
- creo nueva ruta en pages.routing.ts
- creo card xa en usuarios.html (desde original|table-basic|bordered Table)
- creo mi plantilla.txt para proximos mantenemientos
# Cargar y Mostrar usuarios de forma paginada
- ir usuarios.service.ts crear metodo cargarUsuarios()
- ir usuarios.ts y hago peticion dentro de ngOnInit()
- ir usuarios.html
# Paginar los usuarios prev< >next
- ir usuarios.service.ts
- ir usuarios.ts -> cambiarPagina()
- ir usuarios.html -> asignar a los botones y mostar botones condicionados si es usuario google o normal
# Busqueda de usuarios
- creo nuevo servicio >ng g s services/busquedas --skipTests
- ir usuarios.ts
- ir usuarios.html campo de texto input type:text
# Borrar usuario
- ir usuarios.service.ts -> eliminarUsuario() ruta
- ir usuarios.ts -> eliminarUsuario()
- ir usuarios.html 
### No borrarse a uno mismo
- SweetAlert en usuario.ts
# Actualizar el rol del usuario
- ir usuarios.html 
- ir usuarios.ts -> cambiarRole()
- ir usuarios.service.ts -> guardarUsuario() ruta
# Modal (como bootstrap) para la carga de imagenes (editar imagen en mantenimiento usuarios - tabla)
- crear nuevo componente components/modalImagen
  >ng g c components/modalImagen --skipTests -is
- exportar ModalImagenComponent en components.module.ts
- coloco <app-modal-imagen> en pages.components.html (siempre utilizable en pages)
- ir modal-imagen.html pego plantilla desde original/main/ui-modals
  definir class="fondo-modal-imagen" y "ocultar" en styles.css
- ir modal-imagen.ts para definir cerrarModal()

- Crear nuevo SERVICIO para manejar el modal, lo voy reutilizar en mantenimiento usuarios-hospitales-medicos
 >ng g s services/modalImagen --skipTests
- ir modal-imagen.service
- ir modal-imagen.ts y html

- Cuando click en imagen de tabla en mantenimiento/usuarios quiero abrir el modal:
- ir pages/mantenimientos/usuarios 
  -> usuarios.ts xa inyectar servicio
  -> usuarios.html (click) en imagen xa abrir modal y editarla

# Cargar imagen desde el Modal:
- ir modal-imagen.ts y html
- ir modal-imagen.service.ts -> abrirModal()
- ir usuarios.ts -> abrirModal()

# Actualizar imagen de usuario desde Modal:
- copiar subirImagen() desde perfil.component.ts y pegar en modal-imagen.ts
- creo un Observable en modal-imagen.service -> public nuevaImagen
  y uso en modal.imagen.ts en subirImagen()
- ir usuarios.ts implemento ngOnInit()  

### Mantenimiento de Hospitales y Medicos
- nuevo componente 
  >ng g c pages/mantenimientos/hospitales --skipTests -is
  >ng g c pages/mantenimientos/medicos --skipTests -is
- defino routerLink en sidebar.html
- defino ruta en pages.routing.ts
- pego contenido de plantilla.txt en hospitales.html

- crear nuevo models/hospital.model.ts
- creo nuevo servicio:
  >ng g s services/hospital --skipTests
- ir hospitales.ts llamo a this.hospitalService.cargarHospitales() en ngOnInit()

# Mostar Hospitales en html
- ir hospitales.ts
- ir hospitales.html

### Pipes para mostrar imagenes
# Pipe: xa transformar de forma 'visual' la informacion recibida, no modifica el objeto en si.
- en el usuario.models tengo un metodo get que construye la img
  en mi model de hospital no tengo este metodo -> Opcion 2
- crear nuevo Pipe
- >ng g pipe pipes/imagen --skipTests
- crear nuevo Modulo dentro de carpeta pipes para el manejo de todos los pipes
- >ng g m pipes/pipes --flat
- borro la importacion del app.modules y pego ImagenPipe en pipes.module.ts
- importar PipesModule en pages.module.ts
- ir hospitales.html donde tengo la img y lo paso por mi pipe personalizado
- copio de usuarios.model el get imagenUrl y lo pego en imagen.pipe.ts

### CRUD de Hospitales
- ir hospital.service.ts e implemento metodos crearHospital(), actualizarHospital() y borrarHospital()
- ir hospitales.html creo boton de crear hospital
  en boton de acciones implemento metodo guardarCambios() y eliminarHospital()
- en hospitales.ts creo metodo guardarCambios() y eliminarHospital()
# creacion de Hospitales
- ir https://sweetalert2.github.io/#input-types ->Input Types / url (copio)
- ir hospitales.ts creo metodo abrirSweetAlert() y pego
- ir hospitales.html e implemento metodo (click)="abrirSweetAlert() en crear un hospital
# Actualizar imagen de hospital desde Modal:
- ir usuarios.html copio (click)="abrirModal(usuario)"
- ir hospitales.html en img pegar (click)="abrirModal(hospital)"
- ir hospitales.ts y definir metodo
- ir usuarios.ts copiar abrirModal(usuario: Usuario)
- ir hospitales.ts y pego, primero inyecto servicio modalImagenService
  me subscribo al Observable nuevaImagen del modal-imagen.service refresca la vista actual mostarndo la imagen actualizada
# Busqueda de Hospitales
- ir hospitales.html en caja de texto #txtTermino y metodo (keyup)="buscar(txtTermino.value)"
- desde usuarios.ts copio buscar() y pego en hospitales.ts
- ir busquedas.service.ts implemento buscar() xa hospitales

### CRUD de Medicos
- crear nuevo models/medico.model.ts
- creo nuevo servicio:
  >ng g s services/medico --skipTests
- creo ruta en sidebar.service.ts
  creo ruta en pages.routing.ts
- creo nuevo componente para editar cada medico
  >ng g c pages/mantenimientos/medicos/medico --flat -is
- copiar plantilla.txt en medicos.html
# Servicios de Medicos
- recibir todos los medicos
  medicos.ts -> inyeccion en servicio y creo metodo cargarMedicos()
- ir medico.service.ts creo metodo cargarMedicos(), crearMedicos(), actualizarMedicos(), borrarMedicos() -> copiar de hospitales.service
- ir medicos.ts def cargarMedicos()
- ir medicos.html 
# Buscar Medicos mediante campo de texto
- medicos.html 
  -> boton editar (pencil) que me dirija a medico xa poder editarlo
  -> busqueda de medico en campo de texto e implemento metodo buscar()
- medicos.ts defino metodo buscar()
- medicos.html creo boton que me lleve a nueva pantalla de creación de nuevo medico mediante routerLink
# Borrar medicos
- medicos.html asigno icono de borrar (click)="borrarMedico()"
- medicos.ts implemento el metodo anteriro
# Crear nuevo medico o Actualizar
- Estructura HTML -> medico.html
- ir medico.ts
  creo formulario y asigno en html los valores
# Mostrar imagen e info del hospital
- ir medico.ts creo propiedad hospitalSeleccionado y en ngOnInit creo un observable sobre el select, almaceno en mi propiedad el elemento seleccionado en selesct
- ir medico.html
# Crear medico en BBDD
- ir medico.service.ts -> crearMedico(medico: { nombre: string, hospital: string }) {
- ir medico.ts -> guardarMedico
# Cargar un medico seleccionado
- Primero creo ruta en Backend getMedicoById
- ir medico.service -> creo la instruccion getMedicoById
- ir medico.ts llamo en el ngOnInit al getMedicoById
# Actualizar un medico
- ir medico.ts -> guardarMedico() 
# Cargar imagen del hospital - Bugfix
- ir medico.ts ->  .pipe(delay(100))

### Busqueda global en toda la app
- pagina ppal. -> lupa
- ir shared/header.html
- ir shared.module -> importar FormsModule
- ir shared/header.ts -> implemento buscar()
# crear nuevo componente
- encargado de recibir el texto por url (ruta) y realizar la busqueda
  >ng g c pages/busqueda --skipTests -is
- definir ruta en pages.routing.ts
- ir busqueda.ts
- ir header.ts mando el texto del campo busqueda al url
- ir busqueda.html
# mostar la informacion de la busqueda
- implementar busquedas.service la ruta localhost:3000/api/todo/:termino -> busquedaGlobal()
- ir busqueda.ts -> creo arrays y busquedaGlobal()
- ir busqueda.html 

### Dependiendo ROLE reegresar el menu de Mantenimiento -> desde BACKEND
    Y solo si es ADMIN pueda ver mantenimiento de usuarios
- Primero ir Backend
- ir usuarios.service -> guardo el menu en LS -> guardarEnLocalStorage()
- ir sidebar.service -> cargarMenu()
- ir pages.ts en ngOnInit cargar this.sidebarService.cargarMenu();

### ADMIN GUARD
- crear un Guard
  >ng g guard guards/admin --skipTests
  (x) CanActivate
- ir usuario.service -> defino un getter get role()
- ir admin.guard 
- ir pages.routing -> implemento el Guard -> AdminGuard en la ruta /usuarios

### Validar el ADMIN_ROLE en BACKEND