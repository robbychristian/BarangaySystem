@extends('layouts.app')

@section('sidebar_content')
    <div id="CreateAnnouncementPage" data-auth={{ Auth::user() }}></div>
@endsection
