package com.example.timelinecarousel.controller;

import com.example.timelinecarousel.model.Event;
import com.example.timelinecarousel.model.UploadEventRequest;
import com.example.timelinecarousel.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/event/upload")
    public ResponseEntity<Event> uploadEvent(@RequestBody UploadEventRequest request) {
        return ResponseEntity.ok(eventService.uploadEvent(request));
    }

    @GetMapping("/event")
    public ResponseEntity<Event> getEvent(@RequestParam("id") String id) {
        return ResponseEntity.ok(eventService.fetchEventTimeline(id));
    }
}
