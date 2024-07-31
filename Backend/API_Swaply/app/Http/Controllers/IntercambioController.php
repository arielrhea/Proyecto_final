<?php

namespace App\Http\Controllers;

use App\Models\Intercambio;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IntercambioController extends Controller{
    
    public function realizarIntercambio(Request $request) {

        $reglas = [
            'usuario1' => 'required|exists:usuarios,id',
            'usuario2' => 'required|exists:usuarios,id',
            'producto' => 'required|exists:productos,id'
        ];
        
        $mensajes = [
            'usuario1.required' => 'El ID del primer usuario es obligatorio',
            'usuario1.exists' => 'El primer usuario no existe',
            'usuario2.required' => 'El ID del segundo usuario es obligatorio',
            'usuario2.exists' => 'El segundo usuario no existe',
            'producto.required' => 'El ID del producto es obligatorio',
            'producto.exists' => 'El producto no existe'
        ];
        
        $validator = Validator::make($request->all(), $reglas, $mensajes);
        
        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $producto = Producto::find($request->producto);
        $datos['producto'] = $request->producto;

        if($producto->UsuarioID == $request->usuario1) {
            $datos['donante'] = $request->usuario1;
            $datos['receptor'] = $request->usuario2;
        } else if($producto->UsuarioID == $request->usuario2) {
            $datos['donante'] = $request->usuario2;
            $datos['receptor'] = $request->usuario1;
        } else {
            return response()->json(['El producto no pertenece a ningún usuario'], 400);
        }

        $intercambio = Intercambio::crearIntercambio($datos);

        return response()->json($intercambio, 200);
    }
}
