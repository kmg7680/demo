# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page Korean to-do list app in plain HTML/CSS/vanilla JS. There is no build step, package manager, linter, or test suite. To run it, open `index.html` in a browser (or serve the directory, e.g. `python3 -m http.server`).

## Architecture

- `index.html` defines the static shell. `app.js` looks up elements by ID (`todo-form`, `todo-input`, `todo-list`, `count`), so renaming an ID in the HTML requires updating `app.js` and the `#id` selectors in `style.css`.
- `app.js` keeps all state in the in-memory `todos` array (with a `nextId` counter) and re-renders the whole list from scratch via `render()` after every mutation (`addTodo`, `toggleTodo`, `deleteTodo`). New UI behavior should go through that state → `render()` flow rather than patching the DOM directly.
- State is not persisted; a page reload clears all todos.
- UI strings are Korean (`lang="ko"`), including the remaining-count text rendered in `render()`.
