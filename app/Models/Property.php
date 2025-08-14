<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'id',
        'owner_id',
        'title',
        'description',
        'type',
        'price',
        'currency',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'country',
        'zip_code',
        'latitude',
        'longitude',
        'bedrooms',
        'bathrooms',
        'area_sq_ft',
        'status',
        'is_featured',
        'views',
    ];

    public function media()
    {
        return $this->hasMany(PropertyMedia::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }

    public function complaints()
    {
        return $this->hasMany(Complaint::class);
    }
}
