<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'payment_price',
        'is_paid',
        'payment_image',
    ];

    public function ownedBy()
    {
        return $this->belongsTo(DocumentSubmission::class, 'document_id', 'id');
    }
}
