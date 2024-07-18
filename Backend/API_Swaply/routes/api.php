<?php



use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\AuthSessionController;
use Illuminate\Support\Facades\Route;


//RUTAS DE USUARIO
Route::post('/login', [AuthSessionController::class, 'login']);
Route::post('/logout', [AuthSessionController::class, 'logout']);
Route::post('/registro', [UsuarioController::class, 'store']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);

//RUTAS DE PRODUCTOS
Route::get('/inicio', [ProductoController::class, 'index']);
Route::get('/productos', [ProductoController::class, 'consulta']);
Route::post('/producto', [ProductoController::class, 'alta']);
Route::get('/producto/{id}', [ProductoController::class, 'consulta']);
Route::put('/producto/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

//RUTAS DE CATEGORIAS
Route::get('/categorias', [CategoriaController::class, 'index']);

