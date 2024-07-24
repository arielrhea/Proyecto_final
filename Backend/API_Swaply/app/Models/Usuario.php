<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Usuario extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'ID';

    public $timestamps = false;

    protected $fillable = ['correoelectronico','NombreUsuario', 'UbicacionID', 'Password', 'Token', 'FotoPerfil'];

    protected $hidden = ['Password', 'Token'];

    public function ubicacion(){
        return $this->belongsTo(Ubicacion::class, 'UbicacionID', 'ID');
    }

    public static function consulta($id) {
        return Usuario::where('ID', $id)->with('ubicacion:ID,Nombre')->get();
    }

    public static function alta($datos) {
        return Usuario::create([
            'correoelectronico' => $datos['email'],
            'NombreUsuario' => $datos['username'],
            'UbicacionID' => $datos['ubicacion'],
            'Password' => bcrypt($datos['password']),
            'FotoPerfil' => $datos['img']
        ]);
    }

    public function generarToken() {
        $this->Token = bin2hex(random_bytes(32));
        $this->save();

        return $this->Token;
    }

    public function revocarToken() {
        $this->Token = null;
        $this->save();
    }
}
