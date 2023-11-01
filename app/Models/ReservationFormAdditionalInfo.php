<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationFormAdditionalInfo extends Model
{
    use HasFactory;
    protected $fillable = [
        'reservation_id',
        'reservation_date_time',
        'purpose',
    ];
}
