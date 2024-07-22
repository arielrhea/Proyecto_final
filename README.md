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
    	                        - consulta de producto (retorna Array de objeto [{}])
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
		

