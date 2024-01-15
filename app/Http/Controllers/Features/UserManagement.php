<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserManagement extends Controller
{
    public function index()
    {
        return view('features.UserManagement.UserManagement');
    }

    public function addUser()
    {
        return view('features.UserManagement.AddUser');
    }

    public function editProfile()
    {
        return view('auth.editProfile');
    }
}
