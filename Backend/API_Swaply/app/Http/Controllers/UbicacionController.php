<?php

namespace App\Http\Controllers;

use App\Models\Ubicacion;
use Illuminate\Http\Request;

class UbicacionController extends Controller
{
    public function consultaUbicaciones() {
        return Ubicacion::consulta();
    }
}
