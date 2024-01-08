<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // User::create([
        //     'name' => 'Admin',
        //     'email' => "admin@barangayugong.com",
        //     'password' => Hash::make("admin"),
        //     'user_role' => 1
        // ]);

        // User::create([
        //     'name' => 'Jenel Conception',
        //     'email' => 'jconcepcion@gmail.com',
        //     'password' => Hash::make('jconcep0506'),
        //     'user_role' => 4
        // ]);
        // User::create([
        //     'name' => 'Peter Ocampus',
        //     'email' => 'campuspete@gmail.com',
        //     'password' => Hash::make('petecamps12'),
        //     'user_role' => 4
        // ]);
        // User::create([
        //     'name' => 'Pia Clover',
        //     'email' => '4leaf@gmail.com',
        //     'password' => Hash::make('4522131'),
        //     'user_role' => 4
        // ]);
        User::create([
            'name' => 'Richard Willy',
            'email' => 'richwill@gmail.com',
            'password' => Hash::make('rich1299'),
            'user_role' => 2
        ]);
        User::create([
            'name' => 'Teodoro Pacheko',
            'email' => 'teddyp@gmail.com',
            'password' => Hash::make('teddyp0567'),
            'user_role' => 2
        ]);
        User::create([
            'name' => 'Albert Angeles',
            'email' => 'bigal@gmail.com',
            'password' => Hash::make('alles1227'),
            'user_role' => 2
        ]);
        User::create([
            'name' => 'Maxine Robles',
            'email' => 'maxirob@gmail.com',
            'password' => Hash::make('max190702'),
            'user_role' => 3
        ]);
        User::create([
            'name' => 'Anna Mendes',
            'email' => 'maanne@gmail.com',
            'password' => Hash::make('maanne123'),
            'user_role' => 3
        ]);
        User::create([
            'name' => 'Jude Lin',
            'email' => 'jlaws@Gmail.com',
            'password' => Hash::make('lincinity1222'),
            'user_role' => 3
        ]);
    }
}
