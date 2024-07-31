<?php

namespace App\Http\Controllers;

use App\Models\Favorito;
use Illuminate\Http\Request;

class FavoritoController extends Controller{
    
    public function consultarFavoritos($id) {

        $usuario = Favorito::consulta($id);

        return response()->json($usuario, 200);
    }

    public function agregarFavoritos(Request $request, $id){

        Favorito::crearFavoritos($request->producto, $id);

    }

    public function eliminarFavoritos($id, $idproducto) {

        $favorito = Favorito::where('UsuarioID', $id)->where('ProductoID', $idproducto)->first();

        if($favorito){
            $favorito->delete();
            return response()->json(['Favorito eliminado correctamente'], 200);
        }

        return response()->json(['Usuario o producto no existen'], 400);
    }
}
