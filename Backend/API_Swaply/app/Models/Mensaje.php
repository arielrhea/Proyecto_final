<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    use HasFactory;

    protected $fillable = [
        'ChatID',
        'UsuarioID',
        'Contenido'
    ];

    public $timestamps = false;

    public static function consulta($id) {
        return Mensaje::where('ChatID', $id)->get();
    }

    public function chat(){
        return $this->belongsTo(Chat::class, 'ChatID', 'ID');
    }

    public function usuario(){
        return $this->belongsTo(Usuario::class, 'UsuarioID', 'ID');
    }

    public static function crearMensaje($datos) {
        $mensaje = Mensaje::create([
            'ChatID' => $datos['chat'],
            'UsuarioID' => $datos['usuario'],
            'Contenido' => $datos['contenido'],
        ]);
        
        $chat = Chat::where('ID', $datos['chat'])->first();
        $chat->UltimoMensaje = now();
        $chat->save();

        return $mensaje;
    }
}
