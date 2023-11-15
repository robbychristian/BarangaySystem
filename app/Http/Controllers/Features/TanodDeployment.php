<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TanodDeployment extends Controller
{
    public function index()
    {
        return view('features.TanodDeployment.TanodDeployment');
    }
}
