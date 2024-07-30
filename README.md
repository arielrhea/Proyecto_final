Principales características //

- Regístrese
- inicie sesión 
- Perfil de usuario
- Sistema de búsqueda
- filtros
- Comunicación dentro del sitio
- Formulario para publicar un anuncio 
- Página de producto/servicio 
- Listado de productos/servicios 


Funciones adicionales

- Notificaciones
- Favoritos
- Mapa, geolocalización
- Calificaciones y reseñas
- Centro de ayuda/FAQ

Rutas API
	
   PRODUCTOS:
	- (GET)  api/productos?busqueda=&&categoria=&&ubicacion=&&estado=&&recientes=(true) | (esto es para la consulta de todos los productos)
	- (GET)  api/producto/id  | (consulta de un solo producto)
 	- (POST) api/producto | (alta de producto)
  	
   CATEGORIAS:
   	- (GET) api/categorias | (consulta de categorias)

.-Base de Datos


Usuarios: 
	- ID
	- correoelectronico
	- Nombre de Usuario
	- Ciudad
	- Creditos
	- Password
	- Foto de perfil
	- Token (inicio de sesion)
	

Productos: 
	- ID 
	- ID (Usuario)
	- ID (Categoria)
	- Fecha de publicacion
	- Titulo
	- Estado del producto
	- Descripcion
	- Imagenes (formato json)
	- Producto reservado (boolean)
	

Categoria: 
	- ID
	- Nombre

Favoritos:
	- ID
	- ID (Producto)
	- ID (Usuario)



.-Frontend

	Componentes:
		- Inicio
		- Formulario de registro
		- Formulario de inicio de sesion
		- Formulario de nuevo producto
		- Detalle de producto
		- Consulta de productos
		- Card de producto
		- Perfil de otros usuarios: 
			- informacion del usuario
			- Productos del usuario
		- Perfil de usuario:
			- Informacion de usuario:
				- Informacion de cuenta
			- Productos del usuario
			- navbar de usuario
			- Buzon //
			- Favoritos //
		- Header (con barra de busqueda)
		- Footer:
			- Quienes somos
			- Centro de ayuda/FAQ
			- Como funciona
		- Busqueda (resultado de la busqueda y/o filtro por categorias)
		- Navbar de filtro de busqueda por categorias (Aparece si no se ha hecho una busqueda aun)
		- Navbar de categorias (solo un Navbar aparece a la vez)
		- Pantalla de carga
		- Mensaje de errores

.-Backend

	- Controladores:
		- Usuariocontroller
				- consulta de perfil
				- registro de usuario
				- modificar perfil //
		- Productocontroller:
				- consulta de productos (con y sin filtros) (retorna Array de objetos [{}]) (nombres de los filtros: categoria,estado,busqueda,ubicacion)
    	                        - consulta de producto (retorna Array de objeto [{}]) en caso de no existir retorna []
				- alta de producto
				- modificar producto
				- baja de producto
		- Categoriacontroller: 
				- consulta de categorias
		- AuthenticacionSessionController:
				- login 
				- logout 
	- Modelos:
		- ModeloUsuario:
			- consulta de perfil
			- registro de usuario
			- modificar perfil //
		- ModeloProducto:
			- consulta de productos (con y sin filtros)
			- alta de producto
			- modificar producto
			- baja de producto
		- ModeloCategoria:
			- consulta de categorias
	- API:
		- rutas:
			- login (post)
			- logout (post)
			- Inicio (get)
			- Formulario de registro (post)
			- Formulario de nuevo producto (post)
			- Detalle de producto (get)
			- Consulta de productos (get)
			- Baja de producto (delete)
			- modificacion de producto (put)
			- Perfil de otros usuarios: misma ruta* (get)
				- informacion del usuario
				- Productos del usuario
			- Perfil de usuario: misma ruta* (get)
				- Informacion de usuario:
					- Informacion de cuenta 
				- Productos del usuario
				- navbar de usuario
				- Buzon // 
				- Favoritos //
			- Busqueda (resultado de la busqueda y/o filtro por categorias) (get)
			- Navbar de filtro de busqueda por categorias (Aparece si no se ha hecho una busqueda aun)(get) 
			- Navbar de categorias (solo un Navbar aparece a la vez)
			- Mensaje de errores (get)
		

Pendientes:

- ancho rueda de configuracion 
- navegacion agregados recientemente
- post de regalar producto 
- conponente header producto, 



BROADCAST_CONNECTION=pusher
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=1842236
PUSHER_APP_KEY=204a26467256ad8cdeed
PUSHER_APP_SECRET=a4727bd2cc88f9920dd3
PUSHER_APP_CLUSTER=eu

