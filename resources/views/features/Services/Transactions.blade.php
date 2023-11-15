@extends('layouts.app')

@section('sidebar_content')
    <div id="TransactionsPage" data-user_role="{{ Auth::user()->user_role }}"></div>
@endsection
