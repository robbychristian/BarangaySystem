<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function index()
    {
        return view('features.Reports.Reports');
    }

    public function barangayReports()
    {
        return view('features.Reports.BarangayReports');
    }

    public function residentRecords()
    {
        return view('features.Reports.ResidentRecords');
    }

    public function incidentReports()
    {
        return view('features.Reports.IncidentReports');
    }
}
