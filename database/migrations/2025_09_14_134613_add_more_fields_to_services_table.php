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
        Schema::table('services', function (Blueprint $table) {
            $table->string('category')->after('description');
            $table->string('duration')->after('price');
            $table->string('image_url')->nullable()->after('duration');
            $table->boolean('featured')->default(false)->after('image_url');
            $table->string('status')->default('active')->after('featured');
            $table->text('features')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            //
        });
    }
};
