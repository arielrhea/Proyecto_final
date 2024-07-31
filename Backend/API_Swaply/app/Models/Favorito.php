<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    use HasFactory;

    protected $primaryKey = 'ID';

    protected $fillable = [
        'ProductoID',
        'UsuarioID'
    ];

    public $timestamps = false;

    public function producto() {
        return $this->belongsTo(Producto::class, 'ProductoID', 'ID');
    }

    public static function consulta($id){
        return Favorito::where('UsuarioID', $id)->with('producto:ID,Titulo,Imagenes')->get();
    }

    public static function crearFavoritos($datos, $id) {
        Favorito::create([
            'ProductoID' => $datos->producto,
            'UsuarioID' => $id
        ]);
    }
}
