const fs = require("fs");
const pdf = require("html-pdf");

const generatePDF = async (userData) => {
  return new Promise((resolve, reject) => {
    // Calculate total price
    let totalPrice = userData.cartItems.reduce((total, product) => {
      return total + product.qty * product.rate;
    }, 0);

    // Create HTML markup for the products list
    let htmlContent = `
  <html>
    <head>

    <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100vw;
        height: 100vh;
        font-family: "Roboto", sans-serif;
        padding: 3.25rem 4rem;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerTitle h2 {
        letter-spacing: .5px;
    }

    .headerTitle p {
        margin-top: .15rem;
        font-size: .85rem;
        color: #909090;
        margin-left: 5px;
    }

    .company-title {
        font-size: 1.25rem;
        color: rgb(91, 88, 88);
        letter-spacing: .5px;

    }

    .company-sector {
        margin-top: .25rem;
        font-size: .7rem;
        color: rgb(91, 88, 88);
        letter-spacing: .5px;
    }

    .tableContainer {
        margin-top: 3rem;
    }

    table {
        width: 100%;
        text-align: start;
    }

    tr:first-child,
    tr:last-child {
        border-bottom: 1px solid #ccc;
    }

    table,
    th,
    td {
        text-align: start;
        border-collapse: collapse;
    }

    tr {
        font-size: .95rem;
    }

    th,
    td {
        padding: 1.15rem 1rem;
    }

    .qtyCol {
        color: #0866ff;
    }

    .totalContainer {
        margin-top: 2rem;
    }
    
    .totalContainer ul {
        margin-left: auto;
        margin-right: 1rem;
        list-style: none;
        width: 15rem;
    }

    .totalContainer li {
        padding: .7rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .totalContainer li h5 {
        font-size: .9rem;
    }

    .totalContainer li p {
        font-size: .85rem;
    }

    .gstPrice {
        color: grey;
    }

    .grandTotal {
        letter-spacing: .2px;
        font-weight: bold;
        border-top: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
    }

    .grandTotal p {
        color: #0866ff;
    }

    .expireDate{
        margin-top: 4rem;
        color: #777272;
        font-size: .9rem;
    }
      </style>
    </head>
        
     <body style="margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto', sans-serif; width: 100vw; height: 100vh; padding: 3.25rem 4rem;">

      <div class="header" style="display: flex; align-items: center; justify-content: space-between;">
          <div class="headerTitle">
              <h2 style="letter-spacing: 0.5px;">INVOICE GENERATOR</h2>
              <p style="margin-top: .15rem; font-size: .85rem; color: #909090; margin-left: 5px;">Sample Output should be this</p>
          </div>

          <div class="companyLog">
              <img src="" alt="">
              <div>
                  <p class="company-title" style="font-size: 1.25rem; color: rgb(91, 88, 88); letter-spacing: .5px;">levitation</p>
                  <p class="company-sector" style="margin-top: .25rem; font-size: .7rem; color: rgb(91, 88, 88); letter-spacing: .5px;">infotech</p>
              </div>
          </div>
      </div>

      <div class="tableContainer" style="margin-top: 3rem;">
        <table style="width: 100%; text-align: start;">
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
            </tr>

    `;

    userData.cartItems.forEach((product, index) => {
      htmlContent += `
            <tr ${(key = index)}>
              <td>${product.productName}</td>
              <td class="qtyCol">${product.qty}</td>
              <td>${product.rate}</td>
              <td>INR ${product.qty * product.rate}</td>
            </tr>    
      `;
    });

    htmlContent += `
        <table>
      </div>
      
      <div class="totalContainer">
        <ul>
            <li class="wtGstprice">
                <h5>Total</h5>
                <p>INR ${totalPrice}</p>
            </li>
            <li class="gstPrice">
                <h5>GST</h5>
                <p>18 %</p>
            </li>
            <li class="grandTotal">
                <h5>GRAND Total</h5>
                <p>${totalPrice + totalPrice * 0.18}</p>
            </li>
        </ul>
      </div>

      <p class="expireDate">Valid until : <strong>12/04/23</strong></p>
      </body>
      
      </html>
          `;

    const options = { format: "Letter" };

    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};

module.exports = generatePDF;
