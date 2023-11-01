<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlotterReportVictimData extends Model
{
    use HasFactory;

    protected $fillable = [
        'blotter_id',
        'name',
        'relation_to_suspect',
        'age',
        'gender',
        'occupation',
        'address',
        'email',
        'phone_number',
    ];
}
