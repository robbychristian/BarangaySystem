<?php

use App\Http\Controllers\Features\AnnouncementsController;
use App\Http\Controllers\Features\ReportsController;
use App\Http\Controllers\Features\ServicesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/services', [ServicesController::class, "index"]);
Route::get('/services/documentsubmission', [ServicesController::class, "documentsubmission"]);
Route::get('/services/blotterreport', [ServicesController::class, "blotterReport"]);
Route::get('/services/reservation', [ServicesController::class, "reservation"]);

Route::get('/announcements', [AnnouncementsController::class, 'index']);
Route::get('/announcements/barangaynews', [AnnouncementsController::class, 'barangayNews']);
Route::get('/announcements/createannouncement', [AnnouncementsController::class, 'createAnnouncement']);
Route::get('/announcements/upcomingevents', [AnnouncementsController::class, 'upcomingEvents']);

Route::get('/reports', [ReportsController::class, 'index']);
Route::get('/reports/barangayreports', [ReportsController::class, 'barangayReports']);
Route::get('/reports/residentrecords', [ReportsController::class, 'residentRecords']);
Route::get('/reports/incidentreports', [ReportsController::class, 'incidentReports']);
