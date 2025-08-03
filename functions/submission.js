const fetch = require('node-fetch');
const { Resend } = require('resend');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const data = {
    "fields": {
      "Email Address": body.email,
      "First Name": body.firstName,
      "Last Name": body.lastName,
      "Phone": body.phone,
      "Enquiry Type": body.enquiryType,
      "Message": body.message,
      "Marketing Consent": body.consent,
    }
  };

  const airtableRes = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Submissions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log(data);
  console.log(airtableRes);

  // Send email notification if submission was successful
  if (airtableRes.ok) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailData = {
        from: 'noreply@resend.a2dev.space',
        replyTo: 'info@thisiskinland.com',
        // to: [
        //   'katia@thisiskinland.com',
        //   'nick@thisiskinland.com',
        //   'alex@thisiskinland.com',
        // ],
        to: [
          'yusri@technicaldelivery.co',
          'yusrimathews@gmail.com',
        ],
        subject: 'New Form Submission',
        html: `
          <h2>New Form Submission</h2>
          <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Enquiry Type:</strong> ${body.enquiryType}</p>
          <p><strong>Marketing Consent:</strong> ${body.consent ? 'Yes' : 'No'}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message}</p>
          <br />
          <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
        `
      };

      const emailRes = await resend.emails.send(emailData);

      if (emailRes.error) {
        console.error('Failed to send email notification:', emailRes.error);
      } else {
        console.log('Email notification sent successfully:', emailRes.data);
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
    }
  }

  return {
    statusCode: airtableRes.ok ? 200 : 500,
    body: JSON.stringify({ ok: airtableRes.ok }),
  };
};
