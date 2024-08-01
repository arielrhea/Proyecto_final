<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $primaryKey = 'ID';

    protected $fillable = ['usuario1_id', 'usuario2_id', 'ProductoID'];

    public $timestamps = false;

    public function usuario1()
    {
        return $this->belongsTo(Usuario::class, 'Usuario1_ID', 'ID');
    }

    public function usuario2()
    {
        return $this->belongsTo(Usuario::class, 'Usuario2_ID', 'ID');
    }

    public function producto(){
        return $this->belongsTo(Producto::class, 'ProductoID', 'ID');
    }

    public function mensaje(){
        return $this->hasMany(Mensaje::class, 'ChatID', 'ID');
    }

    public static function consulta($id) {
        return Chat::with(['producto:ID,Titulo,Imagenes','usuario1:ID,NombreUsuario,FotoPerfil', 'usuario2:ID,NombreUsuario,FotoPerfil', 'mensaje' => function ($query) {
            $query->orderBy('Fecha', 'desc')->limit(1);
        }])
        ->where(function ($query) use ($id) {
            $query->where('Usuario1_ID', $id)
                  ->orWhere('Usuario2_ID', $id);
        })->orderBy('Fecha', 'desc')->get();
    }
}
