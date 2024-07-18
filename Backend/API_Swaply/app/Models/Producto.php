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
         $producto = Producto::where('ID', $id)->get();
         foreach($producto as $p){
            $p->usuario;
         }
         return $producto;
       }
       return Producto::all();
    }
}
