<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    public $keyType = 'string';

    protected $fillable = [
        'posted_by_staff_id',
        'title',
        'description',
        'type',
        'status',
        'start_date',
        'end_date',
        'budget',
        'location',
        'is_featured',
        'progress',
        'date_added',
        'team_size',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) Str::uuid();
        });
    }

    public function postedByStaff()
    {
        return $this->belongsTo(User::class, 'posted_by_staff_id');
    }
}
