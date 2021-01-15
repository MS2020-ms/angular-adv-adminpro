#### Inicio
- Terminal:
- >ng help (comandos de angular cli)
- >ng new adminpro --skip-git (routing No, CSS Yes)
- >ng cd adminpro
- >ng serve -o (modo desarrollo para ver cambios en tiempo real)(-o abre en navegador)
- Navegador: http://localhost:4200/
# autenticacion
- >ng g c auth/login --skipTests -is
- >ng g c auth/register --skipTests -is
# paginas
- >ng g c pages/error404 --skipTests -is
- >ng g c pages/dashboard --skipTests -is
- >ng g c pages/progress --skipTests -is
- >ng g c pages/grafica1 --skipTests -is 
- >ng g c pages/pages --flat --skipTests -is ( SOLO se muestra cuando este autenticado)
# componentes reutilizables en aplicacion (en pages) = elemntos de uso comun
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