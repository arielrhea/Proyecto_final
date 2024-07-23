<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller{

    public function consultaUsuario($id) {
        $usuario = Usuario::consulta($id);

        if (!$usuario) {
            return response()->json(['Usuario no encontrado'], 404);
        }
        return response()->json($usuario, 200);
    }

    public function registroUsuario(Request $request) {
        $datos = $request->all();
        $imagen = $request->file('img');

        $reglas = [
            'email' => ['required', 'email',Rule::unique('usuarios', 'correoelectronico')],
            'username' => 'required|max:15',
            'ubicacion' => 'required',
            'password' => 'required',
            'img' => 'image'
        ];
        
        $mensajes = [
            'email.required' => 'Email es obligatorio',
            'email.unique' => 'Este correo ya esta siendo utilizado',
            'email.email' => 'Formato incorrecto de email',
            'username.required' => 'Nombre de usuario es obligatorio',
            'username.required' => 'El nombre de usuario no puede exceder los 15 caracteres',
            'ubicacion.required' => 'Ubicacion es obligatoria',
            'password.required' => 'Contraseña es obligatoria',
            'img.image' => 'El archivo debe ser de tipo imagen'
        ];

        $validator = Validator::make($datos, $reglas, $mensajes);
        if($validator->fails()){
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        if ($imagen) {
            $nombreImagen = $imagen->getClientOriginalName();
            Storage::putFileAs('/usuarios', $imagen, $nombreImagen);
            $datos['img'] = $nombreImagen;
        }

        $usuario = Usuario::alta($datos);

        return response()->json($usuario, 201);
    }
}