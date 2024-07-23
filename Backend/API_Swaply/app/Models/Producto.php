<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model{
    use HasFactory;

    protected $table = 'productos';

    protected $primaryKey = "ID";

    public $timestamps = false;

    protected $fillable = [
        'UsuarioID',
        'CategoriaID',
        'Titulo',
        'EstadoProducto',
        'Descripcion',
        'Imagenes'
    ];

    protected $casts = [
      'Imagenes' => 'array', 
    ];

    public function usuario() {
        return $this->belongsTo(Usuario::class, 'UsuarioID', 'ID');
    }

    public function categoria() {
        return $this->belongsTo(Categoria::class, 'CategoriaID', 'ID');
    }

    public static function consulta($id, $categoria, $ubicacion, $estado, $busqueda, $recientes) {
      $consulta = Producto::query();

       if($id){
         return $consulta->where('ID', $id)->with('usuario:ID,NombreUsuario,Ciudad,FotoPerfil')->with('categoria:ID,Nombre')->get();
       }
      
      $consulta->when($categoria, function($q, $categoria){
        return $q->where('CategoriaID', $categoria);
      });

      $consulta->when($ubicacion, function ($q, $ubicacion) {
        return $q->whereHas('usuario', function ($q) use ($ubicacion) {
            $q->where('Ciudad', 'like', "%$ubicacion%");
        });
      });

      $consulta->when($estado, function($q, $estado){
        return $q->where('EstadoProducto', 'like', "%$estado%");
      });

      $consulta->when($busqueda, function($q, $busqueda){
        return $q->where('Titulo', 'like', "%$busqueda%");
      });

      if ($recientes){
        $consulta->orderBy('FechaPublicacion' , 'desc');
      }

      return $consulta->select('ID','Titulo','EstadoProducto', 'Imagenes','ProductoReservado')->get();
    }

    public static function alta($datos, $imagenes) {
        return Producto::create([
          'UsuarioID' => $datos->usuario,
          'CategoriaID' => $datos->categoria,
          'Titulo' => $datos->titulo,
          'EstadoProducto' => $datos->estado,
          'Descripcion' => $datos->descripcion,
          'Imagenes' => json_encode($imagenes)
        ]);
    }
}
