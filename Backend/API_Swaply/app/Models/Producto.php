<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model{
    use HasFactory;

    protected $table = 'productos';

    protected $primaryKey = "ID";

    public function usuario() {
        return $this->belongsTo(Usuario::class, 'UsuarioID', 'ID');
    }

    public static function consulta($id) {
       if($id){
         return Producto::where('ID', $id)->with('usuario:ID,NombreUsuario,Ciudad,FotoPerfil')->get();
       }
       return Producto::all();
    }
}
