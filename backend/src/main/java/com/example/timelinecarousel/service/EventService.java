package com.example.timelinecarousel.service;

import com.example.timelinecarousel.model.Event;
import com.example.timelinecarousel.model.Photo;
import com.example.timelinecarousel.model.UploadEventRequest;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.graphql.client.GraphQlClient;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    private final GraphQlClient graphQlClient;

    public EventService(GraphQlClient graphQlClient) {
        this.graphQlClient = graphQlClient;
    }

    public Event uploadEvent(UploadEventRequest request) {
        String eventId = UUID.randomUUID().toString();
        Instant eventDate = request.eventDate() != null ? request.eventDate() : Instant.now();
        List<Photo> photos = request.photos() == null ? List.of() : request.photos();

        String mutation = """
            mutation CreateEvent($id: ID!, $title: String!, $eventDate: DateTime!, $photos: [PhotoInput!]!, $linked: [ID!]!) {
              createEvents(input: [{ id: $id, title: $title, eventDate: $eventDate, photos: $photos, linkedEventIds: $linked }]) {
                events { id }
              }
            }
            """;

        graphQlClient.document(mutation)
            .variable("id", eventId)
            .variable("title", request.title())
            .variable("eventDate", eventDate.toString())
            .variable("photos", photos)
            .variable("linked", request.linkedEventIds() == null ? List.of() : request.linkedEventIds())
            .retrieve("createEvents.events")
            .toEntityList(Object.class)
            .block();

        return new Event(eventId, request.title(), eventDate, photos);
    }

    public Event fetchEventTimeline(String eventId) {
        String query = """
            query EventTimeline($id: ID!) {
              eventTimeline(id: $id) {
                id
                title
                eventDate
                photos { id url caption }
                linkedEvents { id title eventDate photos { id url caption } }
              }
            }
            """;

        EventTimelineResponse response = graphQlClient.document(query)
            .variable("id", eventId)
            .retrieve("eventTimeline")
            .toEntity(EventTimelineResponse.class)
            .block();

        if (response == null) {
            return new Event(eventId, "Unknown event", Instant.now(), List.of());
        }

        List<Photo> timelinePhotos = new ArrayList<>(response.photos());
        response.linkedEvents().forEach(linkedEvent -> timelinePhotos.addAll(linkedEvent.photos()));
        return new Event(response.id(), response.title(), response.eventDate(), timelinePhotos);
    }

    public record EventTimelineResponse(
        String id,
        String title,
        Instant eventDate,
        List<Photo> photos,
        List<LinkedEvent> linkedEvents
    ) {
    }

    public record LinkedEvent(String id, String title, Instant eventDate, List<Photo> photos) {
    }
}
