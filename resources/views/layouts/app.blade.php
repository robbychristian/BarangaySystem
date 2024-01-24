<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Barangay Ugong</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <header class="antialiased">
            <nav
                class="bg-slate-900 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 fixed w-full z-20 top-0 left-0">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="flex justify-start items-center">

                        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                            aria-controls="default-sidebar" type="button"
                            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg class="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                            <span class="sr-only">Toggle sidebar</span>
                        </button>
                        <a href="{{ route('home') }}" class="flex mr-4">
                            <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Barangay
                                Ugong</span>
                        </a>
                    </div>
                    <div class="flex items-center lg:order-2">
                        @guest
                            <a href="{{ route('login') }}" class="flex mr-4">
                                <span class="self-center text-md whitespace-nowrap text-white">Login</span>
                            </a>
                        @endguest
                        @auth

                            <button type="button"
                                class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                                <span class="sr-only">Open user menu</span>
                                <img class="w-8 h-8 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
                            </button>
                            <!-- Dropdown menu -->
                            <div class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                id="dropdown">
                                <div class="py-3 px-4">
                                    <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                                        {{ Auth::user()->name }}
                                    </span>
                                    <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
                                        {{ Auth::user()->email }}
                                    </span>
                                </div>
                                <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                    <li>
                                        <a href="/editprofile"
                                            class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My
                                            profile</a>
                                    </li>
                                <ul class="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                    <li>
                                        <a href="#"
                                            class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <form action="{{ route('logout') }}" method="POST">
                                                @csrf

                                                <button type="submit" class="w-full">Logout</button>
                                            </form>
                                        </a>
                                    </li>
                                    
                                @endauth
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        @auth

            @extends('layouts.sidebar')
        @endauth

        <main>
            @yield('content')
        </main>
    </div>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
</body>

</html>
