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

    public static function crearMensaje($datos) {
        return Mensaje::create([
            'ChatID' => $datos['chat'],
            'UsuarioID' => $datos['usuario'],
            'Contenido' => $datos['contenido'],
        ]);
    }
}
