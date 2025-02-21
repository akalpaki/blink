# Blink

Blink is a TUI that provides an http client to use for API testing.
Blink was created because I wanted to use an API testing tool within my terminal, 
and teach myself Node.js at the same time.

Goals:
- Create an API testing tool for the terminal
- Provide full test suite of each feature; continue to improve it.
- Provide multiple ways of controlling the application to accommodate different preferences.
- Provide easy way to create collections of test requests which can be shared 
    -- Blink uses Sqlite, so it should be as simple as moving the generated database folder to copy all
    your collections over.
- Make extensive usage of clipboards for both ease of input and ease of sharing output.
- Experiment with more ways of providing input.
- Allow not just simple HTTP calls, but SSE/WS/socket.io (maybe provide clients for lower level internet protocols?)

Dependencies:
- https://github.com/chjj/blessed
- https://github.com/WiseLibs/better-sqlite3
