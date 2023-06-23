const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();
process.env.TZ = "Asia/Kolkata";

async function mailer(receiverEmail,title,time) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NodeMailer_email,
      pass: process.env.NodeMailer_password,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: "Ojinn",
      to: receiverEmail,
      subject: "Reminder",
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
      
          .image_block img+div {
            display: none;
          }
      
          .menu_block.desktop_hide .menu-links span {
            mso-hide: all;
          }
      
          @media (max-width:700px) {
      
            .desktop_hide table.icons-inner,
            .row-11 .column-1 .block-1.image_block img,
            .row-12 .column-1 .block-1.image_block img,
            .row-13 .column-1 .block-1.image_block img,
            .row-14 .column-1 .block-1.image_block img,
            .social_block.desktop_hide .social-table {
              display: inline-block !important;
            }
      
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .image_block img.big,
            .row-content {
              width: 100% !important;
            }
      
            .mobile_hide {
              display: none;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
      
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
      
            .row-2 .column-2 .block-1.menu_block td.pad {
              padding: 30px 10px 10px !important;
            }
      
            .row-2 .column-2 .block-1.menu_block .menu-links a,
            .row-2 .column-2 .block-1.menu_block .menu-links span {
              font-size: 16px !important;
            }
      
            .row-13 .column-1 .block-1.image_block td.pad,
            .row-3 .column-1 .block-4.paragraph_block td.pad,
            .row-8 .column-1 .block-1.image_block td.pad {
              padding: 0 20px !important;
            }
      
            .row-3 .column-1 .block-3.heading_block td.pad,
            .row-8 .column-1 .block-2.heading_block td.pad,
            .row-8 .column-1 .block-4.button_block td.pad {
              padding: 10px 20px !important;
            }
      
            .row-3 .column-1 .block-3.heading_block h1 {
              font-size: 35px !important;
            }
      
            .row-3 .column-1 .block-2.image_block td.pad {
              padding: 20px 20px 0 !important;
            }
      
            .row-9 .column-1 .block-2.image_block td.pad {
              padding: 50px 20px 0 !important;
            }
      
            .row-8 .column-1 .block-4.button_block a span,
            .row-8 .column-1 .block-4.button_block div,
            .row-8 .column-1 .block-4.button_block div span {
              line-height: 2 !important;
            }
      
            .row-10 .column-1 .block-2.heading_block td.pad {
              padding: 20px 10px 0 !important;
            }
      
            .row-10 .column-1 .block-2.heading_block h1 {
              font-size: 32px !important;
            }
      
            .row-11 .column-2 .block-1.heading_block td.pad,
            .row-12 .column-2 .block-1.heading_block td.pad {
              padding: 10px 20px 0 !important;
            }
      
            .row-11 .column-2 .block-1.heading_block h1,
            .row-12 .column-2 .block-1.heading_block h1,
            .row-13 .column-2 .block-1.heading_block h1,
            .row-14 .column-2 .block-1.heading_block h1 {
              font-size: 25px !important;
            }
      
            .row-8 .column-1 .block-2.heading_block h1 {
              text-align: center !important;
              font-size: 32px !important;
            }
      
            .row-11 .column-1 .block-1.image_block .alignment,
            .row-12 .column-1 .block-1.image_block .alignment,
            .row-13 .column-1 .block-1.image_block .alignment,
            .row-14 .column-1 .block-1.image_block .alignment,
            .row-8 .column-1 .block-3.paragraph_block td.pad>div {
              text-align: left !important;
            }
      
            .row-14 .column-2 .block-2.paragraph_block td.pad,
            .row-8 .column-1 .block-3.paragraph_block td.pad {
              padding: 0 20px 10px !important;
            }
      
            .row-14 .column-1 .block-1.image_block td.pad {
              padding: 0 0 0 20px !important;
            }
      
            .row-14 .column-2 .block-1.heading_block td.pad {
              padding: 5px 20px 0 !important;
            }
      
            .row-11 .column-1 .block-1.image_block td.pad {
              padding: 40px 0 0 20px !important;
            }
      
            .row-12 .column-1 .block-1.image_block td.pad {
              padding: 0 0 5px 20px !important;
            }
      
            .row-11 .column-1 {
              padding: 5px 0 0 !important;
            }
      
            .row-11 .column-2,
            .row-12 .column-2,
            .row-13 .column-2,
            .row-14 .column-2 {
              padding: 0 !important;
            }
      
            .row-12 .column-1,
            .row-13 .column-1,
            .row-14 .column-1 {
              padding: 30px 0 0 !important;
            }
          }
        </style>
      </head>
      
      <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="41.666666666666664%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-left:20px;padding-right:20px;width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://d7f7b45036.imgdist.com/public/users/Integrators/BeeProAgency/1007583_992438/logo.png" style="display: block; height: auto; border: 0; width: 71px; max-width: 100%;" width="71" alt="Placeholder Logo" title="Placeholder Logo"></a></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="58.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="menu_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td class="alignment" style="text-align:center;font-size:0px;">
                                            <div class="menu-links"><!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style=""><tr style="text-align:center;"><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px"><![endif]--><a href="www.example.com" target="_self" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;display:inline-block;color:#142a4b;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-decoration:none;letter-spacing:normal;">HOME</a><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px"><![endif]--><a href="www.example.com" target="_self" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;display:inline-block;color:#142a4b;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-decoration:none;letter-spacing:normal;">EVENTS</a><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1 mobile_hide" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                                <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7976/hero-memorial-day.png" style="display: block; height: auto; border: 0; width: 510px; max-width: 100%;" width="510" alt="Hero Image" title="Hero Image"></div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #5774cd; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 50px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Ojinn Reminder for <br>Task<br></span></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-left:60px;padding-right:60px;">
                                      <div style="color:#142a4b;direction:ltr;font-family:Lato, Tahoma, Verdana, Segoe, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:27px;">
                                        <p style="margin: 0; margin-bottom: 16px;">Dear User,</p>
                                        <p style="margin: 0;">You have ${title} scheduled at ${time} and if you have deleted this task ignore this email.</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <div class="spacer_block block-5" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #142a4b; border-left: 16px solid #D2DDEC; border-radius: 0; border-right: 16px solid #D2DDEC; border-top: 20px solid #D2DDEC; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #142a4b; border-left: 16px solid #D2DDEC; border-radius: 0; border-right: 16px solid #D2DDEC; border-top: 0 solid #FFF0E9; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5e6eaf; border-left: 16px solid #D2DDEC; border-radius: 0; border-right: 16px solid #D2DDEC; color: #000000; border-top: 30px solid #D2DDEC; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5e6eaf; border-left: 16px solid #D2DDEC; border-radius: 0; border-right: 16px solid #D2DDEC; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7976/Group_1.png" style="display: block; height: auto; border: 0; width: 356px; max-width: 100%;" width="356" alt="Woman Illustration" title="Woman Illustration"></div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:30px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #142a4b; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 40px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">Big Things Are Happening</span></strong></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;">
                                      <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:27px;">
                                        <p style="margin: 0;">We are thrilled to announce the launch of our new product line! 📣Our team has been hard at work developing innovative solutions that meet the evolving needs of our customers. We can't wait for you to try them out and see the difference for yourself.&nbsp;</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="button_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:46px;width:168px;v-text-anchor:middle;" arcsize="66%" strokeweight="2.25pt" strokecolor="#A1C181" fillcolor="#a1c181"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#142a4b; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]--><a href="www.example.com" target="_blank" style="text-decoration:none;display:inline-block;color:#142a4b;background-color:#a1c181;border-radius:30px;width:auto;border-top:3px solid #A1C181;font-weight:700;border-right:3px solid #A1C181;border-bottom:3px solid #A1C181;border-left:3px solid #A1C181;padding-top:5px;padding-bottom:5px;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">READ MORE</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                                    </td>
                                  </tr>
                                </table>
                                <div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #d2ddec; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1 mobile_hide" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                                <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7976/_Layer_.png" style="display: block; height: auto; border: 0; width: 476px; max-width: 100%;" width="476" alt="Woman Illustration" title="Woman Illustration"></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #a1c181; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1 mobile_hide" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
                                <table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #142a4b; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">Reminders:</span></strong></h1>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-11" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a1c181; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7976/Group_5_2.png" style="display: block; height: auto; border: 0; width: 91px; max-width: 100%;" width="91" alt="Growth Icon" title="Growth Icon"></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #142a4b; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 150%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Mark Your Calendars 🔔</span></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;">
                                      <div style="color:#142a4b;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                        <p style="margin: 0;">Don't forget to mark your calendar for our upcoming event! It's sure to be a great time, and we can't wait to see you there.</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-12" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a1c181; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:20px;width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7976/Group_6_2.png" style="display: block; height: auto; border: 0; width: 68px; max-width: 100%;" width="68" alt="Tone of Voice Icon" title="Tone of Voice Icon"></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #142a4b; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 150%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Deadline approaching! 🔔</span></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;">
                                      <div style="color:#142a4b;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                        <p style="margin: 0;">Just a friendly reminder to submit your application before the deadline on next friday. This is a great opportunity, so don't miss out!</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-13" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a1c181; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:20px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7976/Group_7_2.png" style="display: block; height: auto; border: 0; width: 91px; max-width: 100%;" width="91" alt="Testimonials Icon" title="Testimonials Icon"></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #142a4b; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 150%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Your feedback matters 🔔</span></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;">
                                      <div style="color:#142a4b;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                        <p style="margin: 0;">A quick reminder to complete your survey before it closes. Your feedback is valuable to us, and we appreciate your participation.</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-14" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a1c181; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:20px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7976/Group_8_2.png" style="display: block; height: auto; border: 0; width: 79px; max-width: 100%;" width="79" alt="Social Media Icon" title="Social Media Icon"></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #142a4b; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 150%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Stay up-to-date 🔔</span></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;">
                                      <div style="color:#142a4b;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                        <p style="margin: 0;">This is a friendly reminder to renew your subscription before it expires. We value your continued support and don't want you to miss out on any upcoming content.</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-15" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #a1c181; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-16" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-17" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #142a4b; border-radius: 0; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
                                <table class="social_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:center;">
                                      <div class="alignment" align="center">
                                        <table class="social-table" width="208px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                          <tr>
                                            <td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" width="32" height="32" alt="facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 10px 0 10px;"><a href="https://www.twitter.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/twitter@2x.png" width="32" height="32" alt="twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 10px 0 10px;"><a href="https://www.linkedin.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/linkedin@2x.png" width="32" height="32" alt="linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" width="32" height="32" alt="instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0;">Ojinn|Varanasi, India</h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:21px;"></div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                        <p style="margin: 0;">Questions? Emails us at Ojinn.dev@gmail.com<br>Questions relating to privacy and the protection of your personal <br>information should be sent to Ojinn.dev@gmail.com</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                        <p style="margin: 0;"><a href="http://www.example.com" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener">Unsubscribe</a></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                      <div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                        <p style="margin: 0;">Company | Varanasi, India</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-18" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                            <!--[if !vml]><!-->
                                            <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
                                              <tr>
                                                <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="https://www.designedwithbee.com/?utm_source=editor&utm_medium=bee_pro&utm_campaign=free_footer_link" target="_blank" style="text-decoration: none;"><img class="icon" alt="Designed with BEE" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/bee.png" height="32" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                                <td style="font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 15px; color: #9d9d9d; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="https://www.designedwithbee.com/?utm_source=editor&utm_medium=bee_pro&utm_campaign=free_footer_link" target="_blank" style="color: #9d9d9d; text-decoration: none;">Designed with BEE</a></td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>
      
      </html>`,
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

router.post('/schedule', (req, res) => {
  const { email, title,time, schedule } = req.body;
  console.log(email,title,time ,schedule);

  cron.schedule(schedule, async () => {
    console.log("Called");
    await mailer(email,title,time);
  });

  res.json({ message: 'Notification scheduled successfully' });
});

module.exports = router;
