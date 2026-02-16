function onFormSubmit(e) {

  // ====== GET FORM DATA ======
  var responses = e.namedValues;

  var name = responses["Name"][0];
  var email = responses["Email"][0];
  var phone = responses["Phone"][0];
  var meetingDate = responses["Meeting Date"][0];
  var meetingTime = responses["Meeting Time"][0];
  var purpose = responses["Purpose"][0];

  // ====== CONVERT DATE & TIME ======
  var startDateTime = new Date(meetingDate + " " + meetingTime);
  var endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes meeting

  // ====== CREATE GOOGLE CALENDAR EVENT ======
  var calendar = CalendarApp.getDefaultCalendar();

  var event = calendar.createEvent(
    "MCCIA Meeting with " + name,
    startDateTime,
    endDateTime,
    {
      description:
        "Meeting Details:\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Purpose: " + purpose + "\n\n" +
        "Mahratta Chamber of Commerce, Industries & Agriculture (MCCIA)\nPune",
      guests: email,
      sendInvites: true
    }
  );

  // ====== FORMAT DATE ======
  var formattedDate = Utilities.formatDate(startDateTime, "Asia/Kolkata", "dd MMMM yyyy");
  var formattedTime = Utilities.formatDate(startDateTime, "Asia/Kolkata", "hh:mm a");

  // ====== EMAIL TO APPLICANT ======
  MailApp.sendEmail({
    to: email,
    subject: "MCCIA Meeting Confirmation",
    htmlBody:
      "<p>Dear " + name + ",</p>" +
      "<p>Your meeting with <b>MCCIA</b> has been successfully scheduled.</p>" +
      "<p><b>Date:</b> " + formattedDate + "<br>" +
      "<b>Time:</b> " + formattedTime + "</p>" +
      "<p>A calendar invitation has been sent to your email. Please accept it to add the meeting to your calendar.</p>" +
      "<p>If you need to reschedule, simply reply to this email.</p>" +
      "<br><p>Regards,<br><b>MCCIA Team</b><br>Pune</p>"
  });

  // ====== EMAIL TO YOU (ADMIN) ======
  MailApp.sendEmail({
    to: "aishwarysongirkar30@gmail.com",   // ⚠️ CHANGE THIS TO YOUR EMAIL
    subject: "New Meeting Booking - " + name,
    body:
      "New meeting scheduled:\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n" +
      "Date: " + formattedDate + "\n" +
      "Time: " + formattedTime + "\n" +
      "Purpose: " + purpose
  });

  // ====== WHATSAPP MESSAGE LINK TO YOU ======
  var adminPhone = "918329115026";   // ✅ YOUR NUMBER UPDATED

  var message =
    "New MCCIA Meeting Booking:%0A%0A" +
    "Name: " + name + "%0A" +
    "Phone: " + phone + "%0A" +
    "Email: " + email + "%0A" +
    "Date: " + formattedDate + "%0A" +
    "Time: " + formattedTime + "%0A" +
    "Purpose: " + purpose;

  var whatsappLink = "https://wa.me/" + adminPhone + "?text=" + message;

  Logger.log("WhatsApp Notification Link: " + whatsappLink);
}
