<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationFormPersonalInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'name',
        'birth_date',
        'age',
        'gender',
        'civil_status',
        'address',
        'email',
        'phone_number',
    ];
}
