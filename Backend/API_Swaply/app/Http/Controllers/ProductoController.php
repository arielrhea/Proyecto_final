<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class ProductoController extends Controller
{
    public function index()
    {
        return Producto::all();
    }

    public function store(Request $request)
    {
        $producto = new Producto();
        $producto->UsuarioID = $request->UsuarioID;
        $producto->CategoriaID = $request->CategoriaID;
        $producto->Titulo = $request->Titulo;
        $producto->EstadoProducto = $request->EstadoProducto;
        $producto->Descripcion = $request->Descripcion;
        $producto->Imagenes = json_encode($request->Imagenes);
        $producto->ProductoReservado = $request->ProductoReservado;
        $producto->save();
        return response()->json($producto, 201);
    }

    public function show($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
        return response()->json($producto, 200);
    }

    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
        $producto->update($request->all());
        return response()->json($producto, 200);
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
        $producto->delete();
        return response()->json(['message' => 'Producto eliminado'], 200);
    }
}
