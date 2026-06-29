# timing_config.py — tune CLI (Pro subprocess) / local lane pacing
# API_* settings reserved; this project uses Claude CLI + Cursor agents only.

# Simanim assigned per Claude CLI session (whole simanim, no block batches)
CLI_SIMANIM_PER_SESSION = 1

# Test run: 101 → 102 → 103 → 104, one siman per session, strictly sequential
CLI_TEST_SIMANIM = [101, 102, 103, 104]
CLI_TEST_SESSION_PAIRS = [[101], [102], [103], [104]]

# Production: assign from this siman downward (after test)
CLI_START_FROM = 100
CLI_ASSIGN_DIRECTION = "desc"  # 100, 99, 98 …

# One CLI subprocess at a time (avoids Pro rate limits)
CLI_MAX_CONCURRENT = 1

CLI_INTER_SESSION_PAUSE = 90
CLI_RATE_LIMIT_BACKOFF = 600
CLI_SESSION_TIMEOUT_SEC = 5400  # 90m per siman
# Non-interactive file edits under output/ (cwd is OC_001 root)
CLI_PERMISSION_MODE = "acceptEdits"

LOCAL_AGENT_PAUSE = 0.1
API_INTER_CALL_PAUSE = 0.3
API_BATCH_SIZE = 12

ASSIGNMENT_STRATEGY = "cli_high"
