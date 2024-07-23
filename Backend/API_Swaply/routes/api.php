<?php



use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthSessionController;
use Illuminate\Support\Facades\Route;


//RUTAS DE USUARIO
Route::post('/login', [AuthSessionController::class, 'login']);
Route::post('/logout', [AuthSessionController::class, 'logout']);
Route::post('/registro', [UsuarioController::class, 'registro']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'consultaUsuario']);

//RUTAS DE PRODUCTOS
Route::get('/inicio', [ProductoController::class, 'index']);
Route::get('/productos', [ProductoController::class, 'consultaProductos']);
Route::post('/producto', [ProductoController::class, 'altaProducto']);
Route::get('/producto/{id}', [ProductoController::class, 'consultaProductos']);
Route::put('/producto/{id}', [ProductoController::class, 'modificacionProducto']);
Route::delete('/producto/{id}', [ProductoController::class, 'bajaProducto']);

//RUTAS DE CATEGORIAS
Route::get('/categorias', [CategoriaController::class, 'consultaCategorias']);

