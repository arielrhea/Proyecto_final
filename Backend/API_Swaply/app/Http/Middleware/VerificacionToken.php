<?php

namespace App\Http\Middleware;

use App\Models\Usuario;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerificacionToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
                $token = $request->header()['token'][0] ?? null;

                if(!$token) return response()->json(['No autorizado aaaa'], 401);
        
                if(!Usuario::where('Token', $token)->first()){
                    return response()->json(['No autorizado bbbb'], 401);
                }
        
                return $next($request);
    }
}
