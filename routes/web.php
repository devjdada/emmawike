<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\CompensationEvaluationController;
use App\Http\Controllers\RentAgreementController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('properties', PropertyController::class);
    Route::put('properties/{property}/status', [PropertyController::class, 'updateStatus'])->name('properties.updateStatus');
    Route::post('properties/{property}/media', [PropertyController::class, 'addMedia'])->name('properties.addMedia');

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');

    Route::get('agencies', [AgencyController::class, 'index'])->name('agencies.index');
    Route::get('agencies/create', [AgencyController::class, 'create'])->name('agencies.create');
    Route::get('agencies/{agency}/edit', [AgencyController::class, 'edit'])->name('agencies.edit');

    Route::get('blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::get('blogs/create', function () {
        return Inertia::render('Blogs/CreatePage'); // Point to the new full page component
    })->name('blogs.create');
    Route::get('blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');

    Route::get('services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('services/create', [ServiceController::class, 'create'])->name('services.create');
    Route::get('services/{service}/edit', [ServiceController::class, 'edit'])->name('services.edit');

    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::get('projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::post('projects', [ProjectController::class, 'store'])->name('projects.store')->middleware('can:is_admin');

    Route::get('tenants', [TenantController::class, 'index'])->name('tenants.index');
    Route::get('tenants/create', [TenantController::class, 'create'])->name('tenants.create');
    Route::get('tenants/{tenant}/edit', [TenantController::class, 'edit'])->name('tenants.edit');

    Route::get('owners', [OwnerController::class, 'index'])->name('owners.index');
    Route::get('owners/create', [OwnerController::class, 'create'])->name('owners.create');
    Route::get('owners/{owner}/edit', [OwnerController::class, 'edit'])->name('owners.edit');

    Route::resource('compensation-evaluations', CompensationEvaluationController::class);

    Route::get('rent-agreements', [RentAgreementController::class, 'index'])->name('rent-agreements.index');
    Route::get('rent-agreements/create', [RentAgreementController::class, 'create'])->name('rent-agreements.create');
    Route::get('rent-agreements/{rent_agreement}/edit', [RentAgreementController::class, 'edit'])->name('rent-agreements.edit');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';