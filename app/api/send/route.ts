import { NextResponse } from "next/server";
import nodeHtmlToImage from "node-html-to-image";
import puppeteer from "puppeteer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      date, 
      customer, 
      session,
      manager,
      employeeName = "Ephrem Awulachew", 
      branch = "Head Office", 
      address = "Addis Ababa", 
      reason = "System Support", 
      approvedBy = manager || "Hawariat Tenu",
      time = session === "FULLDAY" ? "Full Day" : session === "HALFDAY_MORNING" ? "Half Day (Morning)" : session === "HALFDAY_AFTERNOON" ? "Half Day (Afternoon)" : session || "Full Day",
      companyName = "Red Cloud ICT Solutions PLC", 
      documentNo = "OF/RED/HRM/001" 
    } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Missing API configuration tokens." }, { status: 500 });
    }

    // 1. Generate updated blueprint layout mirroring the Red Cloud form (image_ec8ae9.png)
    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; width: 900px; padding: 15px; background-color: #fff; color: #000; margin: 0; }
          .border-box { border: 1px solid #444; padding: 0px; }
          
          /* Header Layout */
          .header-table { width: 100%; border-collapse: collapse; }
          .header-table td { border: 1px solid #444; padding: 6px 12px; vertical-align: top; }
          .logo-box { text-align: center; vertical-align: middle !important; width: 12%; }
          .logo-text-red { color: #b30000; font-weight: bold; font-size: 18px; margin: 0; line-height: 1; }
          .logo-subtext { font-size: 9px; color: #555; }
          .meta-label { font-size: 10px; color: #666; display: block; margin-bottom: 2px; }
          .meta-value { font-size: 12px; font-weight: bold; }
          
          /* Industry Layout Grid with stacked right-side columns */
          .industry-container { display: flex; padding: 15px; font-size: 11px; border-bottom: 1px solid #444; }
          .industry-left { width: 85%; }
          .industry-right { width: 15%; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; }
          .industry-title { font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 10px; width: 100%; }
          .industry-row { display: flex; justify-content: space-between; margin-bottom: 10px; padding-right: 20px; }
          .industry-item { width: 48%; display: flex; justify-content: space-between; align-items: center; }
          
          /* Red Cloud Box Indicators styling */
          .indicator-box { width: 45px; height: 22px; border: 1px solid #444; border-radius: 6px; background: linear-gradient(to bottom, #f2f2f2, #d9d9d9); box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 4px; }
          .indicator-box.active { background: #b30000; border-color: #b30000; }
          .checkbox-square { width: 24px; height: 18px; border: 1px solid #444; border-radius: 4px; background: linear-gradient(to bottom, #f9f9f9, #e6e6e6); display: inline-block; }
          
          /* Section Labels */
          .section-heading { font-weight: bold; font-size: 12px; padding: 12px 15px 4px 15px; }
          .date-line { padding: 0px 15px 15px 15px; font-size: 12px; border-bottom: 1px solid #444; }
          .underline-span { border-bottom: 1px solid #000; padding: 0 40px; font-weight: bold; }

          /* Main Manifest Table Data Grid */
          .data-table { width: 100%; border-collapse: collapse; }
          .data-table th { background-color: #b30000; color: white; font-size: 11px; font-weight: bold; padding: 8px; border: 1px solid #444; text-align: left; }
          .data-table td { padding: 10px 8px; border: 1px solid #444; font-size: 12px; color: #111; }
          
          /* Footer block signatures styling */
          .footer-signatures { display: flex; justify-content: space-between; padding: 30px 60px 15px 60px; font-size: 12px; }
          .signature-section { width: 250px; }
          .sig-title { font-weight: bold; text-decoration: underline; display: block; margin-bottom: 8px; }
          .sig-input-line { border-bottom: 1px solid #000; margin-top: 12px; height: 18px; width: 180px; }
        </style>
      </head>
      <body>
        <div class="border-box">
          <!-- Header Structure Matrix Layout -->
          <table class="header-table">
            <tr>
              <td class="logo-box" rowspan="2">
                <p class="logo-text-red">RED Cloud</p>
                <span class="logo-subtext">ICT Solutions</span>
              </td>
              <td style="width: 58%;">
                <span class="meta-label">Company Name:</span>
                <div style="font-size: 16px; font-weight: bold; text-align: center; margin-top: 2px;">${companyName}</div>
              </td>
              <td style="width: 30%;">
                <span class="meta-label">Document No.:</span>
                <div class="meta-value">${documentNo}</div>
              </td>
            </tr>
            <tr>
              <td>
                <span class="meta-label">Title:</span>
                <div style="font-size: 14px; font-weight: bold; text-align: center; padding: 2px 0;">Project Implementation Expert’s Office Exit Request & Approval Form</div>
              </td>
              <td>
                <table style="width: 100%; border-collapse: collapse; margin: -6px -12px;">
                  <tr>
                    <td style="border: none; border-right: 1px solid #444; border-bottom: 1px solid #444; padding: 4px 6px; font-size: 10px; width: 50%;">Issue No.<br><b>001</b></td>
                    <td style="border: none; border-bottom: 1px solid #444; padding: 4px 6px; font-size: 10px; width: 50%;">Page No.<br><b>Page 1 of 1</b></td>
                  </tr>
                  <tr>
                    <td style="border: none; padding: 4px 6px; font-size: 10px;" colspan="2">Rev. No:<br><b>001</b></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- 1. Industry Name Categorization layout framework -->
          <div class="industry-title" style="margin-top: 10px;">1. Industry Name:</div>
          <div class="industry-container">
            <div class="industry-left">
              <div class="industry-row">
                <div class="industry-item"><span><b>1.1.</b> Food & Entertainment Projects Management Division</span> <span class="checkbox-square"></span></div>
                <div class="industry-item"><span><b>1.2.</b> Health Care & Other Projects Management Division</span> <span class="checkbox-square"></span></div>
              </div>
              <div class="industry-row">
                <div class="industry-item"><span><b>1.3.</b> Hospitality Projects Management Division</span> <span class="checkbox-square"></span></div>
                <div class="industry-item"><span><b>1.4.</b> Manufacturing Projects Management Division</span> <span class="checkbox-square"></span></div>
              </div>
              <div class="industry-row">
                <div class="industry-item"><span><b>1.5.</b> FMCG projects Management Division</span> <span class="checkbox-square"></span></div>
                <div class="industry-item"><span><b>1.6.</b> Merchandizing Projects Management Division</span> <span class="checkbox-square"></span></div>
              </div>
            </div>
            <!-- Stacked Status Alert Blocks matching right sidebar from image_ec8ae9.png -->
            <div class="industry-right">
              <div class="indicator-box active"></div>
              <div class="indicator-box"></div>
              <div class="indicator-box"></div>
            </div>
          </div>

          <!-- 2. Office Exit Section Parameters -->
          <div class="section-heading">2. Office Exit:</div>
          <div class="date-line">
            <b>2.1.1.</b> Date: <span class="underline-span">&nbsp;&nbsp;${date}&nbsp;&nbsp;</span>
          </div>

          <!-- Main Manifest Dynamic Grid -->
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 6%; text-align: center;">S/NO</th>
                <th style="width: 18%;">Employee name</th>
                <th style="width: 24%;">Customer /project name</th>
                <th style="width: 16%;">Address</th>
                <th style="width: 12%;">Branch</th>
                <th style="width: 14%;">Reason for the employee's exit</th>
                <th style="width: 10%;">Time taken</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: center;">1</td>
                <td><b>${employeeName}</b></td>
                <td>${customer}</td>
                <td>${address}</td>
                <td>${branch}</td>
                <td>${reason}</td>
                <td>${time}</td>
              </tr>
            </tbody>
          </table>

          <!-- Signatures Footer -->
          <div class="footer-signatures">
            <div class="signature-section">
              <span class="sig-title">Requested By (Employee)</span>
              <div style="margin-top: 10px;">Name: <b>${employeeName}</b></div>
              <div class="sig-input-line">Signature: </div>
            </div>
            <div class="signature-section">
              <span class="sig-title">Approved By (Project Manager)</span>
              <div style="margin-top: 10px;">Name: <b>${approvedBy}</b></div>
              <div class="sig-input-line">Signature: </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;

    // 2. Render HTML directly into binary buffer via Puppeteer instance hook
    const imageBuffer = (await nodeHtmlToImage({
      html: htmlContent,
      type: "png",
      puppeteer: puppeteer, 
      puppeteerArgs: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    })) as Buffer;

    // 3. Dispatch payload out to Telegram API configuration endpoints
    const formData = new FormData();
    formData.append("chat_id", chatId);
    
    const blob = new Blob([new Uint8Array(imageBuffer)], { type: "image/png" });
    formData.append("photo", blob, "exit-request.png");

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      body: formData, 
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram Endpoint Warning:", errorData);
      return NextResponse.json({ error: "Failed delivering form image to Telegram." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server Execution Error:", error);
    return NextResponse.json({ error: "Internal server generation failure." }, { status: 500 });
  }
}