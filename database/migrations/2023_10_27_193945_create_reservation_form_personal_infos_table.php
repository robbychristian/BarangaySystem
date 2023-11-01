<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationFormPersonalInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation_form_personal_infos', function (Blueprint $table) {
            $table->id();
            $table->string('reservation_id');
            $table->string('name');
            $table->string('birth_date');
            $table->string('age');
            $table->string('gender');
            $table->string('civil_status');
            $table->string('address');
            $table->string('email');
            $table->string('phone_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservation_form_personal_infos');
    }
}
