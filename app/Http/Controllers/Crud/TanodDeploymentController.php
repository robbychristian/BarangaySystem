<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\TanodDeployment;
use App\Models\User;
use Illuminate\Http\Request;

class TanodDeploymentController extends Controller
{
    public function getAllStaff()
    {
        return User::where('user_role', 3)->get();
    }

    public function getAllTanodDeployments()
    {
        return TanodDeployment::with('tanod1')->with('tanod2')->get();
    }

    public function tanodDeployment(Request $request)
    {
        return TanodDeployment::create([
            'tanod1_id' => $request->tanod1_id,
            'tanod2_id' => $request->tanod2_id,
            'date_time_deployment' => $request->date_time_deployment,
            'description' => $request->description,
            'coordinates_lat' => $request->coordinates_lat,
            'coordinates_lng' => $request->coordinates_lng,
        ]);
    }
}
