<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
            'imagenes'      => 'required|array|max:6',
            'descripcion'   => 'required|max:500'
        ];

        $mensajes = [
            'categoria.required'    => 'Categoria es obligatoria',
            'categoria.numeric'     => 'Categoria debe ser numerico',
            'titulo.required'       => 'Titulo es obligatorio',
            'titulo.max'            => 'Titulo no puede exceder los 100 caracteres',
            'estado.required'       => 'Estado es obligatorio',
            'imagenes.required'     => 'Imagen es obligatoria',
            'imagenes.max'          => 'El maximo son 6 imagenes',
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
                $imagen->move(public_path('assets/img/productos'), $nombreImagen);
                $imagenes[] = $nombreImagen;
            }
        }

        $producto = Producto::alta($request, $imagenes);

        return response()->json($producto, 201);
    }

    public function modificacionProducto(Request $request, $id){

        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['Producto no encontrado'], 404);
        }

        $reglas = [
            'categoria' => 'required|numeric',
            'titulo'      => 'required',
            'descripcion' => 'required|max:500',
            'estado' => 'required',
            'imagenes' => 'array|max:6'
        ];

        $mensajes = [
            'categoria.required' => 'La categoria es obligatoria',
            'categoria.numeric'  => 'La categoria debe ser numerica',
            'titulo.required'    => 'El titulo es obligatorio',
            'descripcion.required' => 'La descripcion es obligatoria',
            'descripcion.max'      => 'La descripcion no puede exceder los 500 caracteres',
            'estado.required'      => 'El estado del producto es obligatorio',
            'imagenes.max'         => 'Maximo es posible 6 imagenes'
        ];

        $validator = Validator::make($request->all(), $reglas, $mensajes);

        $producto->update($request->all());
        
        return response()->json($producto, 200);
    }

    public function bajaProducto($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['Producto no encontrado'], 404);
        }

        $imagenes = json_decode($producto->Imagenes, true);

        if (is_array($imagenes)) {
            foreach ($imagenes as $imagen) {
                Storage::disk('local')->delete('productos/' . $imagen);
            }
        }

        $producto->delete();

        return response()->json(['Producto eliminado'], 200);
    }
}
