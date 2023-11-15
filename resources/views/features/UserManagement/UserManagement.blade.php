@extends('layouts.app')

@section('sidebar_content')
    <div id="UserManagementPage" data-user_role="{{ Auth::user()->user_role }}"></div>
@endsection
