<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Usuario extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'ID';

    public $timestamps = false;

    protected $fillable = ['name', 'email', 'password', 'token'];

    protected $hidden = ['password', 'token'];

    public function generarToken()
    {
        $this->token = bin2hex(random_bytes(32));
        $this->save();

        return $this->token;
    }

    public function revocarToken()
    {
        $this->token = null;
        $this->save();
    }
}
