package com.example.livepoll.controller;

import com.example.livepoll.dto.PollRequest;
import com.example.livepoll.dto.PollResponse;
import com.example.livepoll.service.PollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@RequiredArgsConstructor
public class PollController {

    private final PollService pollService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<PollResponse>> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PollResponse> createPoll(@RequestBody PollRequest request) {
        return ResponseEntity.ok(pollService.createPoll(request));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PollResponse> getPoll(@PathVariable Long id) {
        return ResponseEntity.ok(pollService.getPollById(id));
    }

    // Add more endpoints for options, votes...
}

