const fetch = require('node-fetch');
const base64 = require('base-64');
exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const errorGen = msg => {
    return { statusCode: 500, body: msg };
  };
  try {
    const { email, firstName, secondName } = JSON.parse(event.body);
    if (!email) {
      return errorGen('Missing Email');
    }
    const subscriber = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName
      }
    };
    const creds = `any:${process.env.MAILCHIMP_API_KEY}`;
    const response = await fetch(
      `https://${process.env.MAILCHIMP_ZONE}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/`,
      {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64.encode(creds)}`,
        },
        body: JSON.stringify(subscriber)
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { statusCode: data.status, title: data.title, body: data.detail };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "Your interests have been updated!",
        detail: data,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
