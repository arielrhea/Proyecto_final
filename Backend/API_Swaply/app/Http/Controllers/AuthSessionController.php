<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        
        $validator = Validator::make($credenciales, $reglas);

        if($validator->fails()){
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $usuario = Usuario::where('correoelectronico', $credenciales['email'])->first();
 
        if (!$usuario) return response()->json(['Usuario no autorizado'], 401);
 
        if (!password_verify($credenciales['password'], $usuario->password)) {
            return response()->json(['Password no autorizada'], 401);
        }
       
        $usuario->token = bin2hex(random_bytes(32));
        $usuario->save();

        return response()->json([
            'token' => $usuario->token
        ], 200);
        
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }
}