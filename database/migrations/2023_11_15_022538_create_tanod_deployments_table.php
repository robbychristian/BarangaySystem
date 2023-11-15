<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTanodDeploymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tanod_deployments', function (Blueprint $table) {
            $table->id();
            $table->string('tanod1_id');
            $table->string('tanod2_id');
            $table->string('date_time_deployment');
            $table->string('description');
            $table->string('coordinates_lat');
            $table->string('coordinates_lng');
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
        Schema::dropIfExists('tanod_deployments');
    }
}
