<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationFormRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'request_type',
        'request_item',
    ];
}
