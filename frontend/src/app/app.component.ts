import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineCarouselComponent } from './timeline-carousel/timeline-carousel.component';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimelineCarouselComponent],
  template: `
    <main class="app-shell">
      <header class="hero">
        <div>
          <p class="eyebrow">Timeline Carousel</p>
          <h1>Explore memories across connected events.</h1>
          <p class="subtitle">
            The carousel blends photos from related events using a Neo4j GraphQL timeline.
          </p>
        </div>
        <div class="hero-card">
          <p class="card-label">Active Event</p>
          <p class="card-value">{{ activeEventTitle }}</p>
          <p class="card-meta">{{ activeEventDate }}</p>
        </div>
      </header>
      <section class="carousel-section">
        <app-timeline-carousel
          [photos]="photos"
          (navigate)="handleNavigate($event)"
        ></app-timeline-carousel>
      </section>
    </main>
  `,
  styles: [
    `
      .app-shell {
        padding: 40px 64px 80px;
        display: flex;
        flex-direction: column;
        gap: 40px;
      }

      .hero {
        display: flex;
        justify-content: space-between;
        gap: 32px;
        align-items: center;
      }

      .hero h1 {
        margin: 8px 0 12px;
        font-size: clamp(2rem, 3vw, 3.25rem);
      }

      .subtitle {
        max-width: 520px;
        color: #a1a1aa;
        line-height: 1.6;
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.75rem;
        color: #6ee7b7;
        margin: 0;
      }

      .hero-card {
        background: #171a21;
        border: 1px solid #24272f;
        border-radius: 16px;
        padding: 20px 24px;
        min-width: 220px;
      }

      .card-label {
        font-size: 0.75rem;
        color: #a1a1aa;
        margin: 0 0 6px;
      }

      .card-value {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 8px;
      }

      .card-meta {
        margin: 0;
        color: #6b7280;
      }

      .carousel-section {
        background: #10131a;
        border-radius: 24px;
        padding: 32px;
      }

      @media (max-width: 900px) {
        .app-shell {
          padding: 24px;
        }

        .hero {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `
  ]
})
export class AppComponent implements OnInit {
  photos = [];
  activeEventTitle = 'Loading…';
  activeEventDate = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvent('timeline-demo').subscribe((event) => {
      this.activeEventTitle = event.title;
      this.activeEventDate = new Date(event.eventDate).toLocaleDateString();
      this.photos = event.photos;
    });
  }

  handleNavigate(direction: 'prev' | 'next') {
    console.log(`Navigate ${direction} timeline`);
  }
}
