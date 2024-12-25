
# Pathfinder

Maze generator on using a recurisve backtracking algorithm aswell as using Dijkstra's algorithm to do the pathfinding for finding the shortest path through the maze. Also offers a canvas where you can customize the walls, create your own start and stop point, and watch it visualize how it solves finding the path. Built on React, Vite and TailwindCSS


You can view a live demo of the application here: https://pathfinder.evanschaff.com

## Features

- Maze Generation (Recursive Backtracking)
- Shortest Pathfinding (Dijkstra)

## Screenshots

![App Screenshot](/Preview.png)

## Tech Stack

**Client:** Node, React, Vite, TailwindCSS

## Installation

```bash
  npm install
  npm run preview
```

## Deployment

To deploy this project run

```bash
  docker build -t todolist-front .
  docker run -d -p 80:80 --name todolist-front-app todolist-front
```
