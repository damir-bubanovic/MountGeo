<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRefugeContactsTable extends Migration
{
    /**
     * Run the migrations.
     * > check the length of phone in the database & phone input you receive from user
     * @return void
     */
    public function up()
    {
        Schema::create('refuge_contacts', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('refuge_id')->unsigned();
            $table->foreign('refuge_id')->references('id')->on('refuges')->onDelete('cascade');
            $table->string('person', 70);
            $table->string('email');
            $table->char('phone', 20);
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
        Schema::dropIfExists('refuge_contacts');
    }
}
