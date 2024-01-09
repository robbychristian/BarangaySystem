<?php

namespace App\Http\Controllers\features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuditTrailController extends Controller
{
    public function index()
    {
        return view('features.AuditTrail.AuditTrail');
    }
}
