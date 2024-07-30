<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    public function consultaMensajes($id)
    {
        return Mensaje::consulta($id);
    }

    public function enviarMensaje(Request $request, $id) 
    {
        $datos['chat'] = $id;
        $datos['usuario'] = $request->usuario;
        $datos['contenido'] = $request->contenido;

        // Validaciones

        $mensaje = Mensaje::crearMensaje($datos);

        // Emite el evento
        event(new MessageSent($mensaje));

        // Verifica si el mensaje y el evento están funcionando
        

        return response()->json($mensaje, 201);
    }
}
