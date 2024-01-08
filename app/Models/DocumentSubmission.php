<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;
use OwenIt\Auditing\Auditable as AuditableTrait;
class DocumentSubmission extends Model implements Auditable
{
    use AuditableTrait;
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

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
