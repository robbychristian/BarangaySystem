<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlotterReportIncidentNarrativesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blotter_report_incident_narratives', function (Blueprint $table) {
            $table->id();
            $table->string('blotter_id');
            $table->string('place_of_incident')->nullable();
            $table->string('date_time_incident')->nullable();
            $table->string('narrative')->nullable();
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
        Schema::dropIfExists('blotter_report_incident_narratives');
    }
}
