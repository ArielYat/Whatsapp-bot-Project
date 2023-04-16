#!/bin/bash
# entrypoint.sh

set -eu
tmux new-session -s foo -d && tmux list-sessions && tmux send-keys -t foo "openvpn --config /app/$(ls -a /app | grep .ovpn) --auth-user-pass /app/proton.txt" Enter && sleep 60 && tmux capture-pane -pS foo
exec "$@"