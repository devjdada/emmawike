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
        Schema::create('crop_evaluations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('crop_type');
            $table->decimal('area_acres', 10, 2);
            $table->decimal('yield_per_acre', 10, 2);
            $table->decimal('market_price_per_unit', 10, 2);
            $table->decimal('damage_percentage', 5, 2)->nullable();
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
        Schema::dropIfExists('crop_evaluations');
    }
};
