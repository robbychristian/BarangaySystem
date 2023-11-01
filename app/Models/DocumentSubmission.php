<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentSubmission extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id'
    ];

    public function personalInfo()
    {
        return $this->hasOne(DocumentSubmissionPersonalInfo::class, 'document_id', 'id');
    }

    public function additionalInfo()
    {
        return $this->hasOne(DocumentSubmissionAdditionalInfo::class, 'document_id', 'id');
    }

    public function paymentInfo()
    {
        return $this->hasOne(Payments::class, 'document_id', 'id');
    }
}
