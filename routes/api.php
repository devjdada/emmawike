<?php

use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\AgencyController;
use App\Http\Controllers\Api\AgentController;
use App\Http\Controllers\Api\TenantController;
use App\Http\Controllers\Api\OwnerController;
use App\Http\Controllers\Api\ComplaintController;
use App\Http\Controllers\Api\CompensationEvaluationController;
use App\Http\Controllers\Api\RentAgreementController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('properties', PropertyController::class);
Route::apiResource('blogs', BlogController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('projects', ProjectController::class);
Route::apiResource('agencies', AgencyController::class);
Route::apiResource('agents', AgentController::class);
Route::apiResource('tenants', TenantController::class);
Route::apiResource('owners', OwnerController::class);
Route::apiResource('complaints', ComplaintController::class);
Route::apiResource('compensation-evaluations', CompensationEvaluationController::class);
Route::apiResource('rent-agreements', RentAgreementController::class);
Route::apiResource('users', UserController::class);
