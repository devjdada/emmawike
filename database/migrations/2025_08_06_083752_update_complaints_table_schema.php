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
        Schema::table('complaints', function (Blueprint $table) {
            // Drop foreign key constraints before dropping columns
            $table->dropForeign(['created_by']);
            $table->dropForeign(['assigned_to']);

            // Drop old columns
            $table->dropColumn(['created_by', 'assigned_to']);

            // Add new columns
            $table->string('priority', 50)->default('medium')->after('status');
            $table->timestamp('submitted_at')->useCurrent()->after('priority');
            $table->timestamp('resolved_at')->nullable()->after('submitted_at');
            $table->text('staff_notes')->nullable()->after('resolved_at');

            // Modify existing columns
            $table->text('description')->nullable(false)->change();
            $table->string('status', 50)->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('complaints', function (Blueprint $table) {
            // Revert existing columns
            $table->text('description')->nullable()->change(); // Assuming original was nullable
            $table->string('status')->default(null)->change(); // Revert to original default or nullable

            // Drop new columns
            $table->dropColumn([
                'priority',
                'submitted_at',
                'resolved_at',
                'staff_notes',
            ]);

            // Re-add old columns
            $table->uuid('created_by')->constrained('users')->onDelete('cascade');
            $table->uuid('assigned_to')->nullable()->constrained('users')->onDelete('set null');
        });
    }
};
