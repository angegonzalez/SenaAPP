package com.example.misenaapp.model;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table (name = "Meeting")
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String startDate;
    @NotNull
    private String endDate;
    @NotNull
    private String title;
    @NotNull
    private String state;
    @Lob
    @Column(length=6291456)
    private byte[] initialMemoFile;
    @Lob
    @Column(length=6291456)
    private byte[] finalMemoFile;

    private String identificationNumberLearner;
    private String emailLearner;


    public byte[] getInitialMemoFile() {
        return initialMemoFile;
    }

    public void setInitialMemoFile(byte[] initialMemoFile) {
        this.initialMemoFile = initialMemoFile;
    }

    public String getIdentificationNumberLearner() {
        return identificationNumberLearner;
    }

    public void setIdentificationNumberLearner(String identificationNumberLearner) {
        this.identificationNumberLearner = identificationNumberLearner;
    }

    public String getEmailLearner() {
        return emailLearner;
    }

    public void setEmailLearner(String emailLearner) {
        this.emailLearner = emailLearner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public byte[] getFinalMemoFile() {
        return finalMemoFile;
    }

    public void setFinalMemoFile(byte[] finalMemoFile) {
        this.finalMemoFile = finalMemoFile;
    }

    @Override
    public String toString() {
        return "Meeting{" +
                "id=" + id +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", title='" + title + '\'' +
                ", state='" + state + '\'' +
                ", initialMemoFile=" + Arrays.toString(initialMemoFile) +
                ", finalMemoFile=" + Arrays.toString(finalMemoFile) +
                ", identificationNumberLearner='" + identificationNumberLearner + '\'' +
                ", emailLearner='" + emailLearner + '\'' +
                '}';
    }
}
