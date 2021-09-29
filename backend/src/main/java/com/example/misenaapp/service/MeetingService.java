package com.example.misenaapp.service;

import com.example.misenaapp.model.Meeting;
import com.example.misenaapp.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;
    @Autowired
    private MailSenderService mailSender;

    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> findMeetingByID(Long id) {
        return meetingRepository.findById(id);
    }

    public Meeting reserveMeeting(Meeting newMeeting, MultipartFile initialFile, Long id) {
        mailSender.sendEmail(newMeeting);
        return meetingRepository.findById(id).map(meeting -> {
            meeting.setEmailLearner(newMeeting.getEmailLearner());
            meeting.setIdentificationNumberLearner(newMeeting.getIdentificationNumberLearner());
            meeting.setState(newMeeting.getState());
            try {
                meeting.setInitialMemoFile(initialFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            return meetingRepository.save(meeting);
        }).orElseGet(() -> meetingRepository.save(newMeeting));
    }

    public Meeting finishMeeting(Meeting newMeeting, MultipartFile endFile, Long id) {
        return meetingRepository.findById(id).map(meeting -> {
            meeting.setState(newMeeting.getState());
            try {
                meeting.setFinalMemoFile(endFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            return meetingRepository.save(meeting);
        }).orElseGet(() -> meetingRepository.save(newMeeting));
    }

    public Meeting resetMeeting(Long id) {
        Meeting meeting = this.findMeetingByID(id).orElseThrow();
        meeting.setState("available");
        meeting.setIdentificationNumberLearner(null);
        meeting.setEmailLearner(null);
        meeting.setInitialMemoFile(null);
        meeting.setFinalMemoFile(null);
        return meetingRepository.save(meeting);
    }

}
