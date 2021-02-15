const nodemailer = require('nodemailer');

// create transporter for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateOrderEmail({ order, total }) {
  return `
  <div>
  <h2>Your Recent order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
    <img src="${item.thumbnail}" alt="${item.name}" />
    ${item.name} - ${item.price}</li>`
      )
      .join('')}
  </ul>
  <p>Your total is ${total} </p>
  </div>`;
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // console.log(body);
  // Validate data coming is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You are missing the field ${field} field`,
        }),
      };
    }
  }
  // Send the email

  // Send the success or error message
  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick-test@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  // console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
