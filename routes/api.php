<?php

use App\Http\Controllers\Crud\AnnouncementsController;
use App\Http\Controllers\Crud\ReportsController;
use App\Http\Controllers\Crud\ServicesController;
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

Route::get("/announcements/getallannouncements", [AnnouncementsController::class, 'getAllAnnouncements']);
Route::get("/announcements/getallnews", [AnnouncementsController::class, 'getAllNews']);
Route::get("/announcements/getallevents", [AnnouncementsController::class, 'getAllEvents']);
Route::post('/announcements/createannouncement', [AnnouncementsController::class, 'addAnnouncement']);
Route::post('/announcements/createnews', [AnnouncementsController::class, 'addNews']);
Route::post('/announcements/createevent', [AnnouncementsController::class, 'addEvent']);

Route::get('/reports/getallblotterreports', [ReportsController::class, 'getAllBlotterReports']);

Auth::routes();
