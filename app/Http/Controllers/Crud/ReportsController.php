<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Models\BlotterReport;
use App\Models\Payments;
use App\Models\User;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function getAllResidents()
    {
        return User::where('user_role')->get();
    }

    public function getAllBlotterReports(Request $request)
    {
        if ($request->exists("user_id")) {
            return BlotterReport::where('user_id')->with('reportingPerson')->with('suspectData')->with('victimData')->with('incidentNarrative')->get();
        } else {
            return BlotterReport::with('reportingPerson')->with('suspectData')->with('victimData')->with('incidentNarrative')->get();
        }
    }

    public function getAllPaidTransactions(Request $request)
    {
        if ($request->exists('user_id')) {
            return Payments::with(['ownedBy.user' => function ($query) use ($request) {
                $query->where('id', $request->user_id);
            }])->where('is_paid', 1)->get();
        } else {
            return Payments::with(['ownedBy.user' => function ($query) {
                $query->get();
            }])->where('is_paid', 1)->get();
        }
    }
}
