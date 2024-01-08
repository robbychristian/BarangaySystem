@extends('layouts.app')

@section('sidebar_content')
    <div id="ClinicPage" data-user="{{ Auth::user() }}"></div>
@endsection
