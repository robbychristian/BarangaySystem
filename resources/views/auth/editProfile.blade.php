@extends('layouts.app')

@section('sidebar_content')
    <div id="profilePage" data-user="{{ Auth::user() }}"></div>
@endsection