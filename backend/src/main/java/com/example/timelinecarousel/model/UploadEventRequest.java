package com.example.timelinecarousel.model;

import java.time.Instant;
import java.util.List;

public record UploadEventRequest(String title, Instant eventDate, List<Photo> photos, List<String> linkedEventIds) {
}
