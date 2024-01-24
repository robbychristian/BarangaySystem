@extends('layouts.emails')

@section('content')
    <tr>
        <td style="background-color: #fff; padding: 30px 30px 0px; ">
            <img src="{{ $message->embed('images/barnagayugong.png') }}" alt="Email Icon" srcset=""
                style="display: block; margin-left: auto; margin-right: auto; max-width: 200px">
        </td>
    </tr>
    <tr>
        <td style="background-color: #fff; padding: 10px 30px 0px; ">
            <p
                style=" font-size: 16px; margin-top:15px; color: #6c757d; font-weight:400; margin-right:auto; margin-left:auto; text-align:justify;">
                This is an announcement from Barangay Ugong 
                <br> <br> Should you have any questions, please contact us at <a
                    href="mailto:admin@barangayugong.com">admin@barangayugong.com</a>
            </p>
            <p
                style=" font-size: 16px; margin-top:15px; color: #6c757d; font-weight:400; margin-right:auto; margin-left:auto; text-align:justify;">
                {{ $announcement['announcement_title'] }}
                <br>
                {{ $announcement['announcement_description'] }}
            </p>
        </td>
    </tr>
    <tr>
        <td style="background-color: #fff; padding: 10px 30px 0px; ">
            <p
                style=" font-size: 16px; margin-top:15px; color: #6c757d; font-weight:400; margin-right:auto; margin-left:auto; text-align:justify;">
                Barangay Ugong Management
            </p>
        </td>
    </tr>
@endsection