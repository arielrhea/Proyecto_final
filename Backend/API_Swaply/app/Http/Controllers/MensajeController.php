<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller{

    public function consultaMensajes($id){
        return Mensaje::consulta($id);
    }

    public function enviarMensaje(Request $request, $id) {
        $datos['chat'] = $id;
        $datos['usuario'] = $request->usuario;
        $datos['contenido'] = $request->contenido;

        //validaciones

        $mensaje = Mensaje::crearMensaje($datos);

        event(new MessageSent($mensaje));

        return response()->json($mensaje, 201);
    }
}
