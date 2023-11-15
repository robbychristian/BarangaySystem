@extends('layouts.app')

@section('sidebar_content')
    <div id="AnnouncementPage" data-user_role="{{ Auth::user()->user_role }}"></div>
@endsection
