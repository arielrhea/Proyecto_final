<?php



use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthSessionController;
use App\Http\Middleware\VerificacionToken;
use Illuminate\Support\Facades\Route;


//RUTAS DE USUARIO
Route::post('/login', [AuthSessionController::class, 'login']);
Route::post('/logout', [AuthSessionController::class, 'logout']);//->middleware(VerificacionToken::class);
Route::post('/registro', [UsuarioController::class, 'registroUsuario']);
Route::get('/usuario/{id}', [UsuarioController::class, 'consultaUsuario']);
Route::put('/usuario/{id}', [UsuarioController::class, 'modificacionUsuario']);//->middleware(VerificacionToken::class);

//RUTAS DE PRODUCTOS
Route::get('/inicio', [ProductoController::class, 'index']);
Route::get('/productos', [ProductoController::class, 'consultaProductos']);
Route::post('/producto', [ProductoController::class, 'altaProducto']);//->middleware(VerificacionToken::class);
Route::get('/producto/{id}', [ProductoController::class, 'consultaProductos']);
Route::put('/producto/{id}', [ProductoController::class, 'modificacionProducto']);//->middleware(VerificacionToken::class);
Route::delete('/producto/{id}', [ProductoController::class, 'bajaProducto']);//->middleware(VerificacionToken::class);

//RUTAS DE CATEGORIAS
Route::get('/categorias', [CategoriaController::class, 'consultaCategorias']);

