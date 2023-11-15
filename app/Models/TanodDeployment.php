<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TanodDeployment extends Model
{
    use HasFactory;

    protected $fillable = [
        'tanod1_id',
        'tanod2_id',
        'date_time_deployment',
        'description',
        'coordinates_lat',
        'coordinates_lng',
    ];
}
