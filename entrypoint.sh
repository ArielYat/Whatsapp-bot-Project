#!/bin/bash
# entrypoint.sh

set -eu
tmux new-session -s foo -d && tmux list-sessions && tmux send-keys -t foo "openvpn --config /app/jp-free-04.protonvpn.net.udp.ovpn --auth-user-pass /app/test.txt" Enter && sleep 60 && tmux capture-pane -pS foo
exec "$@"