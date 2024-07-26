<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Mensaje;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller{


    public function consultaMisChats($id){

        return Chat::consulta($id);   

        
    }
    
    public function verificacionChat(Request $request){
        
        $usuario1 = $request->solicitante;
        $producto = $request->producto;
        $productoID = Producto::findorFail($request->producto);
        $usuario2 = $productoID->UsuarioID;

        $reglas = [
            'solicitante' => 'required|exist:usuarios, ID',
            'producto'    => 'required|exist:productos, ID'
        ];

        /*$validator = Validator::make($request->all(), $reglas);
        if($validator->fails()){
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }*/


        $chat = Chat::where(function ($query) use ($usuario1, $usuario2, $producto) {
            $query->where('usuario1_id', $usuario1)
                  ->where('usuario2_id', $usuario2)
                  ->where('ProductoID', $producto);
        })->orWhere(function ($query) use ($usuario1, $usuario2, $producto) {
            $query->where('usuario1_id', $usuario2)
                  ->where('usuario2_id', $usuario1)
                  ->where('ProductoID', $producto);
        })->with('producto:ID,Titulo,Imagenes')->first();
        
        if (!$chat) {
            $chat = Chat::create([
                'usuario1_id' => $usuario1,
                'usuario2_id' => $usuario2,
                'ProductoID' => $producto,
            ]);
            $chat->load('producto:ID,Titulo,Imagenes');
        }

        return response()->json($chat, 200);
    }
}
