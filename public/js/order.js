const email = async () => {
    const orderSummary = document.getElementById('order-summary');
    const options = {filename: 'order-summary.pdf'};
    const pdfAsString = await html2pdf().from(orderSummary).toPdf(options).output('datauristring');
    axios.post('/send', {orderSummary: pdfAsString});
};

const print = () => {
    const orderSummary = document.getElementById('order-summary');
    const options = {filename: 'order-summary.pdf'};
    html2pdf(orderSummary, options);
};