import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public airPortName: string = '';
  public destinationLoc: string = '';
  public foundConnections: Array<string> = [];
  public airports: Array<string> =
    'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');
  public routes: Array<string>[] = [
    ['PHX', 'LAX'],
    ['PHX', 'JFK'],
    ['JFK', 'OKC'],
    ['JFK', 'HEL'],
    ['JFK', 'LOS'],
    ['MEX', 'LAX'],
    ['MEX', 'BKK'],
    ['MEX', 'LIM'],
    ['MEX', 'EZE'],
    ['LIM', 'BKK'],
  ];
  public adjacencyList: any;
  public logList: any | undefined | null;
  public title: string | undefined;
  ngOnInit(): void {
    this.adjacencyList = new Map();
    this.airports.forEach((airport: string) => {
      this.addNode(airport);
    });
    this.routes.forEach((route: any) => {
      if (route) {
        this.addEdge(route[0], route[1]);
      }
    });
  }
  public addNode(airport: string): void {
    this.adjacencyList.set(airport, []);
    this.logList = this.adjacencyList;
  }
  public addEdge(origin: any, destination: any): void {
    this.adjacencyList.get(origin).push(destination);
    this.adjacencyList.get(destination).push(origin);
  }

  public bfs(): void {
    this.title = 'Breath First Search';
    this.foundConnections = [];
    const visted = new Set();
    const queue = [this.airPortName];
    while (queue.length > 0) {
      const airport = queue.shift();
      const destinations = this.adjacencyList.get(airport);
      for (const destination of destinations) {
        if (destination === this.destinationLoc) {
          console.log('found connection');
          this.foundConnections.push(destination);
        }
        if (!visted.has(destination)) {
          visted.add(destination);
          queue.push(destination);
          console.log(destination);
        }
      }
    }
  }

  public dfs(start: any, visted = new Set()): void {
    this.title = 'Depth First Search';
    if (this.foundConnections.length > 1) {
      this.foundConnections = [];
    }
    visted.add(start);
    const destinations = this.adjacencyList.get(start);
    for (const destination of destinations) {
      if (destination === this.destinationLoc) {
        console.log('found connection');
        if (this.foundConnections.length === 0) {
          this.foundConnections.push(destination);
        }
        return;
      }
      if (!visted.has(destination)) {
        console.log(destination);
        this.dfs(destination, visted);
      }
    }
  }
}
