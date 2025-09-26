<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagedProperty extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'owner_id',
        'tenant_id',
        'rent_agreement_id',
        'start_date',
        'end_date',
        'rent_due_date',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function rentAgreement()
    {
        return $this->belongsTo(RentAgreement::class);
    }
}