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
        Schema::create('property_media', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('property_id')->constrained()->onDelete('cascade');
            $table->string('path');
            $table->string('type')->default('image'); // 'image' or 'video'
            $table->string('label')->nullable(); // e.g., 'floor_plan', 'property_image'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_media');
    }
};