<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefugeRoadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refuge_road', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('refuge_id')->unsigned();
            $table->foreign('refuge_id')->references('id')->on('refuges');
            $table->tinyInteger('road');
            $table->tinyInteger('macadam');
            $table->tinyInteger('foot');
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
        Schema::dropIfExists('refuge_road');
    }
}
