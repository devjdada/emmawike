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
            // Rename columns
            $table->renameColumn('name', 'title');

            // Add new columns
            $table->string('type', 100)->nullable()->after('description');
            $table->string('status', 50)->default('planning')->after('type');
            $table->date('start_date')->nullable()->after('status');
            $table->date('end_date')->nullable()->after('start_date');

            // Modify existing columns
            $table->text('description')->nullable(false)->change();
            $table->string('image_url', 500)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Drop foreign key constraint
            $table->dropForeign(['posted_by_staff_id']);

            // Rename columns back
            $table->renameColumn('title', 'name');

            // Drop new columns
            $table->dropColumn([
                'type',
                'status',
                'start_date',
                'end_date',
            ]);

            // Revert existing columns
            $table->text('description')->change(); // Assuming original was nullable
            $table->string('image_url')->change(); // Assuming original was default length
        });
    }
};
