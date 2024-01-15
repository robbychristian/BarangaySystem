<?php

use App\Http\Controllers\Features\AnalyticsController;
use App\Http\Controllers\Features\AnnouncementsController;
use App\Http\Controllers\features\AuditTrailController;
use App\Http\Controllers\Features\ReportsController;
use App\Http\Controllers\Features\ServicesController;
use App\Http\Controllers\Features\TanodDeployment;
use App\Http\Controllers\Features\UserManagement;
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
    return view('auth.login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/services', [ServicesController::class, "index"]);
Route::get('/services/documentsubmission', [ServicesController::class, "documentsubmission"]);
Route::get('/services/blotterreport', [ServicesController::class, "blotterReport"]);
Route::get('/services/reservation', [ServicesController::class, "reservation"]);
Route::get('/services/transactions', [ServicesController::class, "transactions"]);
Route::get('/services/clinic', [ServicesController::class, "clinic"]);

Route::get('/announcements', [AnnouncementsController::class, 'index']);
Route::get('/announcements/barangaynews', [AnnouncementsController::class, 'barangayNews']);
Route::get('/announcements/createannouncement', [AnnouncementsController::class, 'createAnnouncement']);
Route::get('/announcements/upcomingevents', [AnnouncementsController::class, 'upcomingEvents']);
Route::get('/announcements/pastevents', [AnnouncementsController::class, 'pastEvents']);

Route::get('/reports', [ReportsController::class, 'index']);
Route::get('/reports/barangayreports', [ReportsController::class, 'barangayReports']);
Route::get('/reports/residentrecords', [ReportsController::class, 'residentRecords']);
Route::get('/reports/incidentreports', [ReportsController::class, 'incidentReports']);
Route::get('/reports/transactionreports', [ReportsController::class, 'transactionReports']);

Route::get('/usermanagement', [UserManagement::class, 'index']);
Route::get('/usermanagement/adduser', [UserManagement::class, 'addUser']);

Route::get('/tanoddeployment', [TanodDeployment::class, 'index']);
Route::get('/tanoddeployment/map', [TanodDeployment::class, 'map']);

Route::get('/audittrail', [AuditTrailController::class, 'index']);

Route::get('/analytics', [AnalyticsController::class, 'index']);

Route::get('/editprofile', [UserManagement::class, 'editProfile']);