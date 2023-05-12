#!/bin/bash
if tmux capture-pane -p -t $(tmux list-panes -F '#S:#P' | head -1) | grep -q "Initialization Sequence Completed"; then
  echo "1"
else
  echo "0"
fi