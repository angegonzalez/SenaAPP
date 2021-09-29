package com.example.misenaapp.rest;

import com.example.misenaapp.model.Meeting;
import com.example.misenaapp.service.FileConverter;
import com.example.misenaapp.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.OutputStream;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/meeting/")
public class MeetingREST {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private FileConverter fileConverter;

    @GetMapping
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        return ResponseEntity.ok(meetingService.getAllMeetings());
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Optional<Meeting>> findMeetingByID(@PathVariable("id") Long id) {
        return ResponseEntity.ok(meetingService.findMeetingByID(id));
    }


    @GetMapping("/{id}/finalFile")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> getFinalFile(@PathVariable Long id) {
        Meeting meeting = meetingService.findMeetingByID(id).orElseThrow();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + meeting.getId() + "\"")
                .body(meeting.getFinalMemoFile());
    }

    @GetMapping("/{id}/finalFilePDF")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> getFinalFilePDF(@PathVariable Long id) {
        Meeting meeting = meetingService.findMeetingByID(id).orElseThrow();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + meeting.getId() + "_pdf\"")
                .body(fileConverter.convertToPDF(meeting));
    }


    @GetMapping("/{id}/initialFile")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        System.out.println("hoaspdasd");
        Meeting meeting = meetingService.findMeetingByID(id).orElseThrow();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + meeting.getId() + "\"")
                .body(meeting.getInitialMemoFile());
    }


    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        Meeting temp = meetingService.createMeeting(meeting);
        try {
            return ResponseEntity.created(new URI("api/meeting" + temp.getId())).body(temp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping(value = "{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Meeting> resetMeeting(@PathVariable("id") Long id) {
        return ResponseEntity.ok(meetingService.resetMeeting(id));
    }

    @PutMapping(value = "{id}")
//    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Meeting> reserveMeeting(@RequestPart Meeting newMeeting, @RequestPart MultipartFile initialFile, @PathVariable Long id) {
        return ResponseEntity.ok(meetingService.reserveMeeting(newMeeting, initialFile, id));
    }

    @PutMapping(value = "{id}/finish")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Meeting> finishMeeting(@RequestPart Meeting newMeeting, @RequestPart MultipartFile finalFile, @PathVariable Long id) {
        return ResponseEntity.ok(meetingService.finishMeeting(newMeeting, finalFile, id));
    }


}
