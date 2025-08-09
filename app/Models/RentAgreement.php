<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RentAgreement extends Model
{
    use SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'tenant_id',
        'property_id',
        'start_date',
        'end_date',
        'monthly_rent',
        'deposit',
        'agreement_pdf_url',
        'status',
        'is_renewed',
    ];

    public function tenant()
    {
        return $this->belongsTo(User::class, 'tenant_id');
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
