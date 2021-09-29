package com.example.misenaapp.service;

import com.example.misenaapp.model.Meeting;
import fr.opensagres.poi.xwpf.converter.pdf.PdfConverter;
import fr.opensagres.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class FileConverter {

    public byte[] convertToPDF(Meeting meeting) {

        try {
            InputStream is = new ByteArrayInputStream(meeting.getFinalMemoFile());
            XWPFDocument document = new XWPFDocument(is);
            PdfOptions options = PdfOptions.create();
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfConverter.getInstance().convert(document, out, options);
            System.out.println(out);
            return out.toByteArray();
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }

        return null;
    }
}