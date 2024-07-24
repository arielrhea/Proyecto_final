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
            'ubicacion' => 'required|numeric',
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
            'ubicacion.numeric' => 'La ubicacion es de caracter numerico',
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

    public function modificacionUsuario($id, Request $request) {
        $usuario = Usuario::find($id);
        $imagen = $request->file('img');

        $reglas = [
            'username' => 'max:15',
            'ubicacion' => 'numeric',
            'img' => 'image',
        ];

        $mensajes = [
            'username.max' => 'El nombre de usuario no puede exceder los 15 caracteres',
            'ubicacion.numeric' => 'El formato de ubicacion debe ser numerico',
            'img.image' => 'El formato del archivo debe ser imagen' 
        ];

        $validator = Validator::make($request->all(), $reglas, $mensajes);
        if($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        if($imagen){
            $nombreImagen = $imagen->getClientOriginalName();

            if ($usuario->FotoPerfil != $nombreImagen) {
                Storage::disk('local')->delete('usuarios/' . $usuario->FotoPerfil);
            }
    
            Storage::putFileAs('/usuarios', $imagen, $nombreImagen);
            $usuario->FotoPerfil = $nombreImagen;
        }

        if($request->username) {
            $usuario->NombreUsuario = $request->username;
        }
        if($request->ubicacion) {
            $usuario->UbicacionID = $request->ubicacion;
        }
        if($request->password) {
            $usuario->Password = bcrypt($request->password);
        }

        $usuario->save();

        return response()->json($usuario, 200);

    }
 
     public function bajaUsuario($id) {

        $usuario = Usuario::find($id);

        if($usuario) {
            $usuario->delete();
            return response()->json(['Usuario eliminado'], 200);
        }

        return response()->json(['Usuario no encontrado'], 400);

    }
    }