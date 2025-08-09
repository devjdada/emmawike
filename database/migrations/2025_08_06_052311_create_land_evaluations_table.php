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
        Schema::create('land_evaluations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('land_use_type');
            $table->decimal('area_sqft', 15, 2);
            $table->string('location_description');
            $table->text('zoning_regulations')->nullable();
            $table->string('soil_quality')->nullable();
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
        Schema::dropIfExists('land_evaluations');
    }
};
