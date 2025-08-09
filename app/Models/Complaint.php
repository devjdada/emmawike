<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Complaint extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'tenant_id',
        'property_id',
        'subject',
        'description',
        'status',
        'priority',
        'submitted_at',
        'resolved_at',
        'staff_notes',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
