<?php

namespace App\Http\Controllers\Crud;

use App\Http\Controllers\Controller;
use App\Mail\AnnouncementEmail;
use App\Models\Announcements;
use App\Models\BarangayNews;
use App\Models\Events;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class AnnouncementsController extends Controller
{
    public function getAllAnnouncements()
    {
        return Announcements::get();
    }

    public function getLatestAnnouncement()
    {
        return Announcements::latest()->first();
    }

    public function getAllNews()
    {
        return BarangayNews::all();
    }
    
    public function getLatestNews()
    {
        return BarangayNews::latest()->first();
    }

    public function getAllEvents()
    {
        $dateToday = Carbon::now();
        $events = Events::all();
        $availableEvents = [];
        foreach ($events as $event) {
            if (Carbon::now()->lessThan($event->event_start)) {
                array_push($availableEvents, $event);
            }
        }
        return $availableEvents;
    }

    public function getPastEvents()
    {
        $dateToday = Carbon::now();
        $events = Events::all();
        $availableEvents = [];
        foreach ($events as $event) {
            if (Carbon::now()->greaterThan($event->event_start)) {
                array_push($availableEvents, $event);
            }
        }
        return $availableEvents;
    }

    public function addAnnouncement(Request $request)
    {
        $announcement = Announcements::create([
            'user_id' => $request->user_id,
            'announcement_title' => $request->announcement_title,
            'announcement_description' => $request->announcement_description,
        ]);
        
        $allUsers = User::all()->pluck('email');

        // foreach($allUsers as $user) {
        //     Mail::to($user->email)->send(new AnnouncementEmail());
        // }

        // return $allUsers;
        
        Mail::to($allUsers)->send(new AnnouncementEmail($announcement));

        // return $allUsers;
    }

    public function addNews(Request $request)
    {
        if ($request->hasFile('news_image')) {
            $newImageName = $request->news_title . '.' . $request->news_image->getClientOriginalName();
            $news = BarangayNews::create([
                'user_id' => $request->user_id,
                'news_title' => $request->news_title,
                'news_description' => $request->news_description,
                'news_image' => $newImageName,
            ]);
            $file = $request->news_image->move(public_path('image/news'), $newImageName);
        } else {
            // return 'no';
        }
    }

    public function addEvent(Request $request)
    {
        Events::create([
            'user_id' => $request->user_id,
            'event_title' => $request->event_title,
            'event_description' => $request->event_description,
            'event_start' => $request->event_start,
            'event_end' => $request->event_end,
        ]);
    }
}
