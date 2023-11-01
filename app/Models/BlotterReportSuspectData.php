<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlotterReportSuspectData extends Model
{
    use HasFactory;

    protected $fillable = [
        'blotter_id',
        'name',
        'relation_to_victim',
        'age',
        'gender',
        'occupation',
        'address',
    ];
}
