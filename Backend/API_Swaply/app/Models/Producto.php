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

    public static function consulta($id, $categoria, $ubicacion, $estado, $busqueda) {
      $consulta = Producto::query();

       if($id){
         return $consulta->where('ID', $id)->with('usuario:ID,NombreUsuario,Ciudad,FotoPerfil')->get();
       }
      
      $consulta->when($categoria, function($q, $categoria){
        return $q->where('CategoriaID', $categoria);
      });

      $consulta->when($estado, function($q, $estado){
        return $q->where('EstadoProducto', 'like', "%$estado%");
      });

      $consulta->when($busqueda, function($q, $busqueda){
        return $q->where('Titulo', 'like', "%$busqueda%");
      });

      return $consulta->get();
    }
}
