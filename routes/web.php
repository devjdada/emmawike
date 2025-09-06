<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public Routes
Route::get('/properties', [PropertyController::class, 'publicIndex'])->name('public.properties.index');
Route::get('/properties/{property}', [PropertyController::class, 'publicShow'])->name('public.properties.show');
Route::get('/blogs', [BlogController::class, 'publicIndex'])->name('public.blogs.index');
Route::get('/blogs/{blog}', [BlogController::class, 'publicShow'])->name('public.blogs.show');
Route::get('/services', [ServiceController::class, 'publicIndex'])->name('public.services.index');
Route::get('/projects', [ProjectController::class, 'publicIndex'])->name('public.projects.index');
Route::get('/agents', [UserController::class, 'publicIndex'])->name('public.agents.index');
Route::get('/agencies', [AgencyController::class, 'publicIndex'])->name('public.agencies.index');



require __DIR__ . '/admin.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
