import { Component, ElementRef, HostListener, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly isMenuOpen = signal(false);
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected closeMenuWithEscape(): void {
    if (!this.isMenuOpen()) {
      return;
    }

    this.closeMenu();
    this.menuToggle()?.nativeElement.focus();
  }

  @HostListener('window:resize', ['$event'])
  protected closeMenuOnDesktop(event: Event): void {
    const viewport = event.target;

    if (viewport instanceof Window && viewport.innerWidth >= 960) {
      this.closeMenu();
    }
  }
}
