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
- >git tag
- >git tag -a v1.5.0 -m "Rutas listo"
- >git push --tags (subir Github)
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

### Nuevo componente reutilizable grafica-doughnut
- ng g c components/doughnut --skipTests -is
- Exportar en components.module para utilizarlo en otros componentes -> grafica1 