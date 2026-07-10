const express = require("express");

const pool = require("../db");

const router = express.Router();

router.get("/summary", async (req, res) => {
    try {
        const [healthResult, userStatsResult, sessionTableResult, recentUsersResult] = await Promise.all([
            pool.query("SELECT NOW() AS server_time"),
            pool.query(`
                SELECT
                    COUNT(*)::int AS total_users,
                    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS new_users
                FROM users
            `),
            pool.query(`
                SELECT to_regclass('public.sessions') IS NOT NULL AS exists
            `),
            pool.query(`
                SELECT username, email, created_at
                FROM users
                ORDER BY created_at DESC
                LIMIT 5
            `)
        ]);

        const stats = userStatsResult.rows[0];
        let activeSessions = 0;

        if (sessionTableResult.rows[0].exists) {
            const activeSessionsResult = await pool.query(
                "SELECT COUNT(*)::int AS active_sessions FROM sessions WHERE expires_at > NOW()"
            );
            activeSessions = activeSessionsResult.rows[0].active_sessions;
        }

        res.json({
            success: true,
            database: {
                status: "Connected",
                serverTime: healthResult.rows[0].server_time
            },
            stats: {
                totalUsers: stats.total_users,
                newUsers: stats.new_users,
                activeSessions
            },
            recentUsers: recentUsersResult.rows
        });
    } catch (error) {
        console.error("Dashboard summary error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to load dashboard data"
        });
    }
});

module.exports = router;
