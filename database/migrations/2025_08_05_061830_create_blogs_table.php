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
        Schema::create('blogs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('content');
            $table->text('excerpt'); // New field
            $table->string('author'); // New field
            $table->string('category'); // New field
            $table->string('status')->default('draft'); // New field
            $table->timestamp('published_at')->nullable(); // New field
            $table->string('featured_image')->nullable(); // Renamed from image_url and made nullable
            $table->json('tags')->nullable(); // New field
            $table->integer('read_time')->nullable(); // New field
            $table->timestamps();
            $table->softDeletes(); // Added soft deletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};