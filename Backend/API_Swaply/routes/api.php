<?php



use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthSessionController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\IntercambioController;
use App\Http\Controllers\MensajeController;
use App\Http\Controllers\UbicacionController;
use App\Http\Middleware\VerificacionToken;
use App\Models\Favorito;
use App\Models\Mensaje;
use Illuminate\Support\Facades\Route;


//RUTAS DE USUARIO
Route::post('/login', [AuthSessionController::class, 'login']);
Route::post('/logout', [AuthSessionController::class, 'logout'])->middleware(VerificacionToken::class);
Route::post('/registro', [UsuarioController::class, 'registroUsuario']);
Route::get('/perfil/{id}', [UsuarioController::class, 'consultaUsuarioProductos']);
Route::get('/usuario/{id}', [UsuarioController::class, 'consultaUsuario']);
Route::put('/usuario/{id}', [UsuarioController::class, 'modificacionUsuario'])->middleware(VerificacionToken::class);
Route::delete('/usuario/{id}', [UsuarioController::class, 'bajaUsuario'])->middleware(VerificacionToken::class);

//RUTAS DE PRODUCTOS
Route::get('/inicio', [ProductoController::class, 'index']);
Route::get('/productos', [ProductoController::class, 'consultaProductos']);
Route::post('/producto', [ProductoController::class, 'altaProducto'])->middleware(VerificacionToken::class);
Route::get('/producto/{id}', [ProductoController::class, 'consultaProductos']);
Route::put('/producto/{id}', [ProductoController::class, 'modificacionProducto'])->middleware(VerificacionToken::class);
Route::delete('/producto/{id}', [ProductoController::class, 'bajaProducto'])->middleware(VerificacionToken::class);

//RUTAS DE CATEGORIAS
Route::get('/categorias', [CategoriaController::class, 'consultaCategorias']);

//RUTAS DE UBICACIONES
Route::get('/ubicaciones', [UbicacionController::class, 'consultaUbicaciones']);

//RUTAS DE MENSAJES
Route::get('/mis-chats/{id}', [ChatController::class,'consultaMisChats']);
Route::post('/chats', [ChatController::class, 'verificacionChat']);
Route::post('/chats/{id}/mensajes', [MensajeController::class, 'enviarMensaje']);
Route::get('/chats/{id}/mensajes', [MensajeController::class, 'consultaMensajes']);

//RUTAS DE INTERCAMBIO
Route::post('/intercambios', [IntercambioController::class, 'realizarIntercambio']);

//RUTAS DE FAVORITOS
Route::get('usuario/{id}/favoritos', [FavoritoController::class, 'consultarFavoritos']);
Route::post('usuario/{id}/favoritos', [FavoritoController::class, 'agregarFavoritos']);
Route::delete('usuario/{id}/favoritos/{idproducto}', [FavoritoController::class, 'eliminarFavoritos']);