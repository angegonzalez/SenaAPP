package com.example.misenaapp.rest;


import com.example.misenaapp.model.MeetingDetail;
import com.example.misenaapp.service.MeetingDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/meeting-detail/")
public class MeetingDetailREST {
    @Autowired
    private MeetingDetailService meetingDetailService;

    @PostMapping
    private ResponseEntity<MeetingDetail> createMeetingDetail (@RequestBody MeetingDetail meetingDetail) {
        MeetingDetail temp = meetingDetailService.createMeetingDetail(meetingDetail);
        try {
            return ResponseEntity.created(new URI("api/meeting-detail/" + temp.getMeetingId())).body(temp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
