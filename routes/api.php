<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Crud\AnnouncementsController;
use App\Http\Controllers\Crud\ReportsController;
use App\Http\Controllers\Crud\ServicesController;
use App\Http\Controllers\Crud\UserManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/services/getallresidents', [ServicesController::class, 'getAllResidents']);
Route::get('/services/getalldocuments', [ServicesController::class, 'getAllDocuments']);
Route::post('/services/createdocument', [ServicesController::class, 'addDocument']);
Route::post('/services/createblotter', [ServicesController::class, 'addBlotterReport']);
Route::post('/services/createreservation', [ServicesController::class, 'addReservation']);
Route::post('/services/getallunpaidtransactions', [ServicesController::class, 'getAllUnpaidTransactions']);

Route::get("/announcements/getallannouncements", [AnnouncementsController::class, 'getAllAnnouncements']);
Route::get("/announcements/getlastestannouncement", [AnnouncementsController::class, 'getLatestAnnouncement']);
Route::get("/announcements/getallnews", [AnnouncementsController::class, 'getAllNews']);
Route::get("/announcements/getallevents", [AnnouncementsController::class, 'getAllEvents']);
Route::get("/announcements/getpastevents", [AnnouncementsController::class, 'getPastEvents']);
Route::post('/announcements/createannouncement', [AnnouncementsController::class, 'addAnnouncement']);
Route::post('/announcements/createnews', [AnnouncementsController::class, 'addNews']);
Route::post('/announcements/createevent', [AnnouncementsController::class, 'addEvent']);

Route::get('/reports/getallblotterreports', [ReportsController::class, 'getAllBlotterReports']);

Route::get('/usermanagement/getallusers', [UserManagement::class, 'getAllUsers']);
Route::post('/usermanagement/createuser', [UserManagement::class, 'addUser']);
Route::post('/usermanagement/promoteuser', [UserManagement::class, 'promoteUser']);
Route::post('/usermanagement/demoteuser', [UserManagement::class, 'demoteUser']);

Auth::routes();
Route::post("/mobilelogin", [UserManagement::class, 'mobileLogin']);
