<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\PropertyController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AgencyController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\OwnerController;
use App\Http\Controllers\Admin\CompensationEvaluationController;
use App\Http\Controllers\Admin\RentAgreementController;


Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('admin.dashboard');

    Route::resource('properties', PropertyController::class)->names('admin.properties');
    Route::put('properties/{property}/status', [PropertyController::class, 'updateStatus'])->name('admin.properties.updateStatus');
    Route::post('properties/{property}/media', [PropertyController::class, 'addMedia'])->name('admin.properties.addMedia');

    Route::resource('users', UserController::class)->names('admin.users');

    Route::get('agencies', [AgencyController::class, 'index'])->name('admin.agencies.index');
    Route::get('agencies/create', [AgencyController::class, 'create'])->name('admin.agencies.create');
    Route::get('agencies/{agency}/edit', [AgencyController::class, 'edit'])->name('admin.agencies.edit');

    Route::resource('blogs', BlogController::class)->names('admin.blogs');

    Route::resource('services', ServiceController::class)->names('admin.services');
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class)->names('admin.categories');
    Route::resource('teams', \App\Http\Controllers\Admin\TeamMemberController::class)->names('admin.teams');
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class)->names('admin.testimonials');
    Route::resource('clients', \App\Http\Controllers\Admin\ClientController::class)->names('admin.clients');

    Route::get('projects', [ProjectController::class, 'index'])->name('admin.projects.index');
    Route::get('projects/create', [ProjectController::class, 'create'])->name('admin.projects.create');
    Route::get('projects/{project}', [ProjectController::class, 'show'])->name('admin.projects.show');
    Route::get('projects/{project}/edit', [ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::post('projects', [ProjectController::class, 'store'])->name('admin.projects.store')->middleware('can:is_admin');
    Route::put('projects/{project}', [ProjectController::class, 'update'])->name('admin.projects.update')->middleware('can:is_admin');
    Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy')->middleware('can:is_admin');

    Route::get('tenants', [TenantController::class, 'index'])->name('admin.tenants.index');
    Route::get('tenants/create', [TenantController::class, 'create'])->name('admin.tenants.create');
    Route::get('tenants/{tenant}/edit', [TenantController::class, 'edit'])->name('admin.tenants.edit');

    Route::get('owners', [OwnerController::class, 'index'])->name('admin.owners.index');
    Route::get('owners/create', [OwnerController::class, 'create'])->name('admin.owners.create');
    Route::get('owners/{owner}/edit', [OwnerController::class, 'edit'])->name('admin.owners.edit');

    Route::resource('compensation-evaluations', CompensationEvaluationController::class)->names('admin.compensation-evaluations');

    Route::get('rent-agreements', [RentAgreementController::class, 'index'])->name('admin.rent-agreements.index');
    Route::get('rent-agreements/create', [RentAgreementController::class, 'create'])->name('admin.rent-agreements.create');
    Route::get('rent-agreements/{rent_agreement}/edit', [RentAgreementController::class, 'edit'])->name('admin.rent-agreements.edit');
});
