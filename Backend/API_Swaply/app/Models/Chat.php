<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

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

    public static function consulta($id) {
        return Chat::where('usuario1_id', $id)
                     ->orWhere('usuario2_id', $id)
                     //->with(['usuario1:ID,NombreUsuario', 'usuario2:ID,NombreUsuario'])
                     ->get();
    }
}
