const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Utility to inject {{placeholders}} in HTML
const injectTemplate = (template, data = {}) => {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data[key] || "");
};

/**
 * @param {Object} options
 * @param {string} options.to - Receiver's email
 * @param {string} options.subject - Subject line
 * @param {string} [options.text] - Optional plain text fallback
 * @param {string} [options.templateName] - HTML template file name (without .html)
 * @param {Object} [options.data] - Key-value pairs to replace in HTML
 */
const sendMail = async ({ to, subject, text, templateName, data = {} }) => {
  let html = null;

  if (templateName) {
    const templatePath = path.join(__dirname, "..", "templates", `${templateName}.html`);
    try {
      const rawHtml = fs.readFileSync(templatePath, "utf-8");
      html = injectTemplate(rawHtml, data);
    } catch (err) {
      console.error("Failed to load HTML template:", err.message);
      throw new Error("Failed to load email template");
    }
  }

  const msg = {
    to,
    subject,
    text: text || undefined,
    html: html || undefined,
    from: "devanshio2h@gmail.com",
  };

  await sgMail.send(msg);
};

module.exports = sendMail;
