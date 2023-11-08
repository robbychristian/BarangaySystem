<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserManagement extends Controller
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function addUser(Request $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => $request->user_role,
        ]);
    }

    public function promoteUser(Request $request)
    {
        // return $request;
        User::where('id', $request->id)
            ->update([
                'user_role' => (int)$request->user_role - 1
            ]);
    }

    public function demoteUser(Request $request)
    {
        User::where('id', $request->id)
            ->update([
                'user_role' => (int)$request->user_role + 1
            ]);
    }
}
