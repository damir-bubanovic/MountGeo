<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefugeInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('refuge_information', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('refuge_id')->unsigned();
            $table->foreign('refuge_id')->references('id')->on('refuges');
            $table->time('open');
            $table->time('close');
            $table->tinyInteger('water');
            $table->tinyInteger('food');
            $table->tinyInteger('beds');
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
        Schema::dropIfExists('refuge_information');
    }
}
