<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intercambio extends Model
{
    use HasFactory;

    protected $primaryKey = 'ID';

    protected $fillable = [
        'DonanteID',
        'ProductoID',
        'ReceptorID'
    ];

    public $timestamps = false;

    public static function crearIntercambio($datos) {
        $intercambio = Intercambio::create([
            'DonanteID' => $datos['donante'],
            'ProductoID' => $datos['producto'],
            'ReceptorID' => $datos['receptor']
        ]);

        Usuario::where('ID', $datos['donante'])->increment('Regalos');
        Usuario::where('ID', $datos['receptor'])->increment('Recibidos');
        Producto::where('ID', $datos['producto'])->update(['ProductoReservado' => 'Entregado']);

        return $intercambio;
    }
}
