<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthSessionController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('correoelectronico', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }
}