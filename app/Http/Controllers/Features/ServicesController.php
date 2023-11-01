<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index()
    {
        return view('features.Services.Services');
    }
    public function documentSubmission()
    {
        return view('features.Services.DocumentSubmission');
    }
    public function blotterReport()
    {
        return view('features.Services.BlotterReport');
    }
    public function reservation()
    {
        return view("features.Services.Reservation");
    }
}
