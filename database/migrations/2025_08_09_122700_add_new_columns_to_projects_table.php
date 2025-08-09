<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('budget')->nullable();
            $table->string('location')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('progress')->default(0);
            $table->date('date_added')->nullable();
            $table->integer('team_size')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['budget', 'location', 'is_featured', 'progress', 'date_added', 'team_size']);
        });
    }
};