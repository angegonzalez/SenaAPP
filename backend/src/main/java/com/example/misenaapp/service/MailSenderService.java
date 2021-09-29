package com.example.misenaapp.service;

import com.example.misenaapp.model.Meeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Service
public class MailSenderService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(Meeting meeting) {
        System.out.println(meeting.getEmailLearner());
        MimeMessage msg = javaMailSender.createMimeMessage();

        try {
            Date initialDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(meeting.getStartDate());
            Date finalDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(meeting.getEndDate());
            DateFormat dateFormat = new SimpleDateFormat("EEEE, dd MMMM yyyy", new Locale("ES", "CO"));
            DateFormat hourFormat = new SimpleDateFormat("HH:mm");

            String emailContent = "<!DOCTYPE html>\n" +
                    "<!-- Set the language of your main document. This helps screenreaders use the proper language profile, pronunciation, and accent. -->\n" +
                    "<html lang=\"es\">\n" +
                    "  <head>\n" +
                    "    <!-- The title is useful for screenreaders reading a document. Use your sender name or subject line. -->\n" +
                    "   " +
                    "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
                    "    <!-- Never disable zoom behavior! Fine to set the initial width and scale, but allow users to set their own zoom preferences. -->\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
                    "    <style type=\"text/css\">\n" +
                    "        /* CLIENT-SPECIFIC STYLES */\n" +
                    "        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\n" +
                    "        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\n" +
                    "        img { -ms-interpolation-mode: bicubic; }\n" +
                    "\n" +
                    "        /* RESET STYLES */\n" +
                    "        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }\n" +
                    "        table { border-collapse: collapse !important; }\n" +
                    "        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }\n" +
                    "\n" +
                    "        /* iOS BLUE LINKS */\n" +
                    "        a[x-apple-data-detectors] {\n" +
                    "            color: inherit !important;\n" +
                    "            text-decoration: none !important;\n" +
                    "            font-size: inherit !important;\n" +
                    "            font-family: inherit !important;\n" +
                    "            font-weight: inherit !important;\n" +
                    "            line-height: inherit !important;\n" +
                    "        }\n" +
                    "\n" +
                    "        /* GMAIL BLUE LINKS */\n" +
                    "        u + #body a {\n" +
                    "            color: inherit;\n" +
                    "            text-decoration: none;\n" +
                    "            font-size: inherit;\n" +
                    "            font-family: inherit;\n" +
                    "            font-weight: inherit;\n" +
                    "            line-height: inherit;\n" +
                    "        }\n" +
                    "\n" +
                    "        /* SAMSUNG MAIL BLUE LINKS */\n" +
                    "        #MessageViewBody a {\n" +
                    "            color: inherit;\n" +
                    "            text-decoration: none;\n" +
                    "            font-size: inherit;\n" +
                    "            font-family: inherit;\n" +
                    "            font-weight: inherit;\n" +
                    "            line-height: inherit;\n" +
                    "        }\n" +
                    "\n" +
                    "        /* These rules set the link and hover states, making it clear that links are, in fact, links. */\n" +
                    "        /* Embrace established conventions like underlines on links to keep emails accessible. */\n" +
                    "        a { color: #B200FD; font-weight: 600; text-decoration: underline; }\n" +
                    "        a:hover { color: #000000 !important; text-decoration: none !important; }\n" +
                    "\n" +
                    "        /* These rules adjust styles for desktop devices, keeping the email responsive for users. */\n" +
                    "        /* Some email clients don't properly apply media query-based styles, which is why we go mobile-first. */\n" +
                    "        @media screen and (min-width:600px) {\n" +
                    "            h1 { font-size: 48px !important; line-height: 48px !important; }\n" +
                    "            .intro { font-size: 24px !important; line-height: 36px !important; }\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "  </head>\n" +
                    "  <body style=\"margin: 0 !important; padding: 0 !important;\">\n" +
                    "\n" +
                    "    <!-- Some preview text. -->\n" +
                    "    <div style=\"display: none; max-height: 0; overflow: hidden;\">\n" +
                    "            \n" +
                    "    </div>\n" +
                    "    <!-- Get rid of unwanted preview text. -->\n" +
                    "    <div style=\"display: none; max-height: 0px; overflow: hidden;\">\n" +
                    "    &nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\u200C&nbsp;\n" +
                    "    </div>\n" +
                    "    <div role=\"article\" aria-label=\"An email from Your Brand Name\" lang=\"en\" style=\"background-color: white; color: #2b2b2b; font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 18px; font-weight: 400; line-height: 28px; margin: 0 auto; max-width: 600px; padding: 40px 20px 40px 20px; height:auto: max-height: 300px\">\n" +
                    "\n" +
                    "        <header>\n" +
                    "            <h1 style=\"color: #000000; font-size: 32px; font-weight: 800; line-height: 32px; margin: 48px 0; text-align: center;\">\n" +
                    "                Tu cita ha sido agendada con éxito\n" +
                    "            </h1>\n" +
                    "        </header>\n" +
                    "        <main>\n" +
                    "            <div style=\"background-color: ghostwhite; border-radius: 4px; padding: 24px 48px;\">\n" +
                    "                <p>\n" +
                    "                    Hola " + meeting.getEmailLearner() + " con número de identificación " + meeting.getIdentificationNumberLearner() + " tu visita para seguimiento ha sido agendada con éxito para el dia <b>" + dateFormat.format(initialDate) + "</b> de " + hourFormat.format(initialDate) + " a " + hourFormat.format(finalDate) + "\n" +
                    "                </p>\n" +
                    "            </div>\n" +
                    "            \n" +
                    "        </main>\n" +
                    "    </div>\n" +
                    "\n" +
                    "  </body>\n" +
                    "</html>";

            msg.setSubject("Agendamiento para visita de seguimiento");
            msg.setContent(emailContent, "text/html ; charset=utf-8");
            msg.setRecipient(Message.RecipientType.TO, new InternetAddress(meeting.getEmailLearner()));

        } catch (ParseException | MessagingException e) {
            e.printStackTrace();
        }

        javaMailSender.send(msg);
    }
}
