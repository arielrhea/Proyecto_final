<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function consultaProductos(Request $request, $id = null){ 

        $categoria = $request->categoria ?? null;
        $ubicacion = $request->ubicacion ?? null;
        $estado    = $request->estado ?? null;
        $busqueda  = $request->busqueda ?? null;
        $recientes = $request->recientes ?? false;
 
        return Producto::consulta($id, $categoria, $ubicacion, $estado, $busqueda, $recientes);
    }

    public function altaProducto(Request $request){

        $reglasValidacion = [
            'categoria'     => 'required|numeric',
            'titulo'        => 'required|max:100',
            'estado'        => 'required',
            'descripcion'   => 'required|max:500'
        ];

        $mensajes = [
            'categoria.required'    => 'Categoria es obligatoria',
            'categoria.numeric'     => 'Categoria debe ser numerico',
            'titulo.required'       => 'Titulo es obligatorio',
            'titulo.max'            => 'Titulo no puede exceder los 100 caracteres',
            'estado.required'       => 'Estado es obligatorio',
            'descripcion.required'  => 'Descripcion es obligatoria',
            'descripcion.max'       => 'Descripcion no puede exceder los 500 caracteres'
        ];

        $validator = Validator::make($request->all(), $reglasValidacion, $mensajes);
        if($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $imagenes = [];
        if($request->hasfile('imagenes')) {
            foreach($request->file('imagenes') as $imagen) {
                $nombreImagen = time().'-'.$imagen->getClientOriginalName();
                $imagen->move(public_path('assets/img'), $nombreImagen); // Guarda la imagen en el servidor
                $imagenes[] = $nombreImagen;
            }
        }

        $producto = Producto::alta($request, $imagenes);

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
