<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('routes', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name', 60);
            $table->text('description')->nullable();
            $table->integer('difficulty')->nullable();
            $table->integer('duration')->nullable();
            $table->integer('distance')->nullable();
            $table->integer('mountain_id')->unsigned();
            $table->foreign('mountain_id')->references('id')->on('mountains')->onDelete('cascade');
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
        Schema::dropIfExists('routes');
    }
}
