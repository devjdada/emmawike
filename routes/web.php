<?php



use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Public\PropertyController;
use App\Http\Controllers\Public\BlogController;
use App\Http\Controllers\Public\ServiceController;
use App\Http\Controllers\Public\ProjectController;
use App\Http\Controllers\Public\UserController;
use App\Http\Controllers\Public\AgencyController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\PublicPageController;

use App\Http\Controllers\Public\SearchController;
use App\Http\Controllers\Public\WelcomeController;



Route::get('/', function () {
    return Inertia::render('Welcome', [

]);
});

// Public Routes
Route::get('/properties', [PropertyController::class, 'publicIndex'])->name('properties.index');
Route::get('/properties/{property}', [PropertyController::class, 'publicShow'])->name('properties.show');
Route::get('/blogs', [BlogController::class, 'publicIndex'])->name('blogs.index');
Route::get('/blogs/{blog}', [BlogController::class, 'publicShow'])->name('blogs.show');
Route::get('/services', [ServiceController::class, 'publicIndex'])->name('services.index');
Route::get('/services/{service}', [ServiceController::class, 'publicShow'])->name('services.show');
Route::get('/projects', [ProjectController::class, 'publicIndex'])->name('projects.index');
Route::get('/projects/{project}', [ProjectController::class, 'publicShow'])->name('projects.show');
Route::get('/agents', [UserController::class, 'publicIndex'])->name('agents.index');
Route::get('/agencies', [AgencyController::class, 'publicIndex'])->name('agencies.index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::get('/about', [PublicPageController::class, 'about'])->name('about.index');
Route::get('/search', [SearchController::class, 'index'])->name('search');


require __DIR__ . '/admin.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';