import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Photo {
  id: string;
  url: string;
  caption: string;
}

export interface EventTimeline {
  id: string;
  title: string;
  eventDate: string;
  photos: Photo[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getEvent(eventId: string): Observable<EventTimeline> {
    if (!eventId) {
      return of(this.fallbackTimeline());
    }

    return this.http.get<EventTimeline>(`${this.baseUrl}/event`, {
      params: { id: eventId }
    });
  }

  private fallbackTimeline(): EventTimeline {
    return {
      id: 'timeline-demo',
      title: 'Golden Hour Moments',
      eventDate: new Date().toISOString(),
      photos: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop',
          caption: 'Sunrise over the ridge'
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&auto=format&fit=crop',
          caption: 'River path stroll'
        },
        {
          id: '3',
          url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&auto=format&fit=crop',
          caption: 'Golden city glow'
        },
        {
          id: '4',
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&auto=format&fit=crop',
          caption: 'Forest reflections'
        }
      ]
    };
  }
}
