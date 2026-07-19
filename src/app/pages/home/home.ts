import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeVisual } from './home-visual';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HomeVisual],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
