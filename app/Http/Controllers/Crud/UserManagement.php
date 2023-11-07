<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserManagement extends Controller
{
    public function getAllUsers()
    {
        return User::all();
    }
}
