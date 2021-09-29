package com.example.misenaapp.service;

import com.example.misenaapp.model.MeetingDetail;
import com.example.misenaapp.repository.MeetingDetailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingDetailService {
    @Autowired
    MeetingDetailRepository meetingDetailRepository;

    public MeetingDetail createMeetingDetail(MeetingDetail meetingDetail) {
        return meetingDetailRepository.save(meetingDetail);
    }
}
