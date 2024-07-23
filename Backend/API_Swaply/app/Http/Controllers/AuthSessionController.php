<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthSessionController extends Controller
{
    public function login(Request $request){

        $datos = $request->header();
        $credenciales['email'] = $datos['email'][0] ?? null;
        $credenciales['password'] = $datos['password'][0] ?? null;

        $reglas = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        $mensajes = [
            'email.required' => 'Email es obligatorio',
            'email.email' => 'Formato incorrecto del email',
            'password' => 'Contraseña es obligatoria',
        ];
        
        $validator = Validator::make($credenciales, $reglas, $mensajes);

        if($validator->fails()){
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $usuario = Usuario::where('correoelectronico', $credenciales['email'])->first();

        $password = crypt($credenciales['password'],$usuario->Password);

        if ($password == $usuario->Password) {
            $token = $usuario->generarToken();
            return response()->json(['Token' => $token], 200);
        }

        return response()->json(['No Autorizado'], 401);
    }

    public function logout(Request $request){
       $token = $request->header()['token'][0] ?? null;

       if(!$token) return response()->json(['Token no recibido o nulo'], 401);

       $usuario = Usuario::where('Token', $token)->first();

       if(!$usuario) return response()->json(['Token no pertenece a ningun usuario'], 401);

       $usuario->revocarToken();

       return response()->json([], 200);
    }
}