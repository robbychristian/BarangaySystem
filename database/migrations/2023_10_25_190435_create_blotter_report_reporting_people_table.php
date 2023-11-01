<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlotterReportReportingPeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blotter_report_reporting_people', function (Blueprint $table) {
            $table->id();
            $table->string('blotter_id');
            $table->string('name');
            $table->string('date_time_report');
            $table->string('age');
            $table->string('gender');
            $table->string('date_time_incident');
            $table->string('address');
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
        Schema::dropIfExists('blotter_report_reporting_people');
    }
}
