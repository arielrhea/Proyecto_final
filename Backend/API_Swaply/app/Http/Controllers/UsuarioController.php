<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function consultaUsuario($id){
        $usuario = Usuario::consulta($id);

        if (!$usuario) {
            return response()->json(['Usuario no encontrado'], 404);
        }
        return response()->json($usuario, 200);
    }
}