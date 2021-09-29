package com.example.misenaapp.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "MeetingDetail")
public class MeetingDetail {
    @Id
    private Long meetingId;
    @NotNull
    private String moment;
    @NotNull
    private Date initialDatePS;
    @NotNull
    private Date finalDatePS;
    @NotNull
    private String alternativePS;
    @NotNull
    private String companyName;
    @NotNull
    private String companyAddress;
    @NotNull
    private String companyId;
    @NotNull
    private String companyArea;
    @NotNull
    private String managerName;
    @NotNull
    private String managerMail;
    @NotNull
    private String managerPhone;
    @NotNull
    private String managerPosition;
    @NotNull
    private String arl;
    @NotNull
    private String riskType;
    @NotNull
    private String eps;
    @NotNull
    private String workingArea;

    public String getManagerPhone() {
        return managerPhone;
    }

    public void setManagerPhone(String managerPhone) {
        this.managerPhone = managerPhone;
    }

    public Long getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Long meetingId) {
        this.meetingId = meetingId;
    }

    public String getMoment() {
        return moment;
    }

    public void setMoment(String moment) {
        this.moment = moment;
    }

    public Date getInitialDatePS() {
        return initialDatePS;
    }

    public void setInitialDatePS(Date initialDatePS) {
        this.initialDatePS = initialDatePS;
    }

    public Date getFinalDatePS() {
        return finalDatePS;
    }

    public void setFinalDatePS(Date finalDatePS) {
        this.finalDatePS = finalDatePS;
    }

    public String getAlternativePS() {
        return alternativePS;
    }

    public void setAlternativePS(String alternativePS) {
        this.alternativePS = alternativePS;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCompanyArea() {
        return companyArea;
    }

    public void setCompanyArea(String companyArea) {
        this.companyArea = companyArea;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerMail() {
        return managerMail;
    }

    public void setManagerMail(String managerMail) {
        this.managerMail = managerMail;
    }

    public String getManagerPosition() {
        return managerPosition;
    }

    public void setManagerPosition(String managerPosition) {
        this.managerPosition = managerPosition;
    }

    public String getArl() {
        return arl;
    }

    public void setArl(String arl) {
        this.arl = arl;
    }

    public String getRiskType() {
        return riskType;
    }

    public void setRiskType(String riskType) {
        this.riskType = riskType;
    }

    public String getEps() {
        return eps;
    }

    public void setEps(String eps) {
        this.eps = eps;
    }

    public String getWorkingArea() {
        return workingArea;
    }

    public void setWorkingArea(String workingArea) {
        this.workingArea = workingArea;
    }
}


