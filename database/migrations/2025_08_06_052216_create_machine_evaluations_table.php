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
        Schema::create('machine_evaluations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('machine_type');
            $table->string('make');
            $table->string('model');
            $table->integer('year');
            $table->string('condition');
            $table->decimal('depreciation_rate', 5, 2);
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('machine_evaluations');
    }
};
