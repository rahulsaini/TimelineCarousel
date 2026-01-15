import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../services/event.service';

@Component({
  selector: 'app-timeline-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="timeline-carousel">
      <button class="nav-button" type="button" (click)="navigate.emit('prev')">
        ◀
      </button>
      <div class="timeline-track">
        <article class="timeline-card" *ngFor="let photo of photos">
          <div class="image-wrapper">
            <img [src]="photo.url" [alt]="photo.caption" />
          </div>
          <div class="card-footer">
            <p class="caption">{{ photo.caption }}</p>
          </div>
        </article>
      </div>
      <button class="nav-button" type="button" (click)="navigate.emit('next')">
        ▶
      </button>
    </div>
  `,
  styles: [
    `
      .timeline-carousel {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 20px;
        align-items: center;
      }

      .timeline-track {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(240px, 1fr);
        gap: 24px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 16px;
      }

      .timeline-track::-webkit-scrollbar {
        height: 8px;
      }

      .timeline-track::-webkit-scrollbar-thumb {
        background: #2a2f3a;
        border-radius: 999px;
      }

      .timeline-card {
        background: #171a21;
        border: 1px solid #24272f;
        border-radius: 20px;
        overflow: hidden;
        scroll-snap-align: start;
        min-width: 240px;
      }

      .image-wrapper {
        aspect-ratio: 4 / 3;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .card-footer {
        padding: 16px;
      }

      .caption {
        margin: 0;
        color: #e5e7eb;
        font-weight: 500;
      }

      .nav-button {
        background: #1f2430;
        border: 1px solid #2d3340;
        color: #f9fafb;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease;
      }

      .nav-button:hover {
        background: #2b3140;
        transform: translateY(-2px);
      }

      @media (max-width: 700px) {
        .timeline-carousel {
          grid-template-columns: 1fr;
        }

        .nav-button {
          justify-self: center;
        }
      }
    `
  ]
})
export class TimelineCarouselComponent {
  @Input() photos: Photo[] = [];
  @Output() navigate = new EventEmitter<'prev' | 'next'>();
}
