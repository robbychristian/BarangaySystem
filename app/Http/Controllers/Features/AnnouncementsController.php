<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnnouncementsController extends Controller
{
    public function index()
    {
        return view('features.Announcements.Announcements');
    }
    public function barangayNews()
    {
        return view("features.Announcements.BarangayNews.BarangayNews");
    }
    public function createAnnouncement()
    {
        return view('features.Announcements.CreateAnnouncement');
    }
    public function upcomingEvents()
    {
        return view('features.Announcements.UpcomingEvents');
    }
}
