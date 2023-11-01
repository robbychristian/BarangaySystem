<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\BlotterReport;
use App\Models\User;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function getAllResidents()
    {
        return User::where('user_role')->get();
    }

    public function getAllBlotterReports()
    {
        return BlotterReport::with('reportingPerson')->with('suspectData')->with('victimData')->with('incidentNarrative')->get();
    }
}
