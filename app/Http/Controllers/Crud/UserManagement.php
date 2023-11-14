<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserManagement extends Controller
{

    public function mobileLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'device_name' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response(['error' => "Credentials does not exist!"]);
        } else {
            return response(['user' => $user, 'token' => $user->createToken($request->device_name)->plainTextToken]);
        }
    }

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
