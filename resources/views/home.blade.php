@extends('layouts.app')

@section('sidebar_content')
    <div id="HomePage" data-userid="{{ Auth::user()->id }}"></div>
@endsection
