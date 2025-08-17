<?php

namespace App\Policies;

use App\Models\CompensationEvaluation;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;

class CompensationEvaluationPolicy
{

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin' || $user->role === 'staff';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CompensationEvaluation $compensationEvaluation): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        return $user->id === $compensationEvaluation->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'admin' || $user->role === 'staff';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CompensationEvaluation $compensationEvaluation): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        return $user->id === $compensationEvaluation->user_id && $compensationEvaluation->status === 'draft';
    }

    /**
     * Determine whether the user can publish the model.
     */
    public function publish(User $user): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CompensationEvaluation $compensationEvaluation): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        return $user->id === $compensationEvaluation->user_id && $compensationEvaluation->status === 'draft';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CompensationEvaluation $compensationEvaluation): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CompensationEvaluation $compensationEvaluation): bool
    {
        return $user->role === 'admin';
    }
}
