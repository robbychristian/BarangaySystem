<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
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

    public function getUserOnLogin(Request $request)
    {
        // $user = User::where('id', $request->user_id)->first();
        // $user_profile = UserProfile::where("user_id", $request->user_id)->first();
        // return response(["user" => $user, "user_profile" => $user_profile]);
        $user = UserProfile::where('user_id', $request->user_id)->with('ownedBy')->first();
        return $user;
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

    public function verifyUser(Request $request)
    {
        User::where('id', $request->id)
            ->update([
                'is_verified' => true
            ]);
    }

    public function changePassword(Request $request)
    {
        $newPassword = $request->newPassword;

        if (Hash::check($request->currentPassword, Auth::user()->password)) {
            User::where('id', $request->user_id)
                ->update([
                    'password' => Hash::make($newPassword)
                ]);
            return 'true';
        } else {
            return 'false';
        }
    }

    public function editProfile(Request $request)
    {
        UserProfile::where('user_id', $request->user_id)
            ->update([
                'gender' => $request->gender,
                'birthday' => $request->birthday,
                'age' => $request->age,
                'civil_status' => $request->civilStatus,
                'phone_number' => $request->phoneNumber,
                'address' => $request->address
            ]);
        return 'true';
    }
}
