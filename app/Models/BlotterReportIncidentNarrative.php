<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlotterReportIncidentNarrative extends Model
{
    use HasFactory;

    protected $fillable = [
        'blotter_id',
        'place_of_incident',
        'date_time_incident',
        'narrative',
    ];
}
