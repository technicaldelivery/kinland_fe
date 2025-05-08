const fetch = require('node-fetch');

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

  return {
    statusCode: airtableRes.ok ? 200 : 500,
    body: JSON.stringify({ ok: airtableRes.ok }),
  };
};
