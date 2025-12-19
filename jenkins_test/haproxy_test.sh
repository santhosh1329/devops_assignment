#!/usr/bin/env bash
set -e

HAPROXY_IMAGE="haproxy:2.8"
HAPROXY_CFG_PATTERN="haproxy/haproxy.cfg"

echo "=== Checking if haproxy.cfg was modified in this commit ==="

# Show changed files (useful for debugging)
git show --name-only --pretty="" HEAD

if git show --name-only --pretty="" HEAD | grep -q "$HAPROXY_CFG_PATTERN"; then
    echo "haproxy.cfg detected in commit — running HAProxy validation"

    # Find the exact path of haproxy.cfg
    HAPROXY_CFG_PATH=$(git show --name-only --pretty="" HEAD | grep "$HAPROXY_CFG_PATTERN" | head -n1)
    HAPROXY_DIR=$(dirname "$HAPROXY_CFG_PATH")

    echo "Config path: $HAPROXY_CFG_PATH"
    echo "Config directory: $HAPROXY_DIR"

    docker pull "$HAPROXY_IMAGE"

    docker run --rm \
      -v "$PWD/$HAPROXY_DIR:/usr/local/etc/haproxy:ro" \
      "$HAPROXY_IMAGE" \
      haproxy -c -V -f /usr/local/etc/haproxy/$(basename "$HAPROXY_CFG_PATH")

    echo "✅ HAProxy config validation PASSED"

else
    echo "No haproxy.cfg changes detected — skipping HAProxy validation"
fi
