<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function store(Request $request)
    {
        $usuario = new Usuario();
        $usuario->correoelectronico = $request->correoelectronico;
        $usuario->NombreUsuario = $request->NombreUsuario;
        $usuario->Ciudad = $request->Ciudad;
        $usuario->Creditos = $request->Creditos;
        $usuario->Password = Hash::make($request->password);
        $usuario->save();
        return response()->json($usuario, 201);
    }

    public function show($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($usuario, 200);
    }
}