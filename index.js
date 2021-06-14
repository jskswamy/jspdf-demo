const express = require('express')
const morgan = require('morgan');
const {sendEmail} = require('./src/order');

const port = process.env.PORT || 3001;
const encoding = 'base64';
const contentType = 'data:application/pdf;base64,';
const app = express();
const logger = morgan('combined');

app.use(logger);
app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

app.listen(port, () => {
    console.log(`serving sample app, listening at http://localhost:${port}`)
});

app.post('/send', async (req, res) => {
    const {orderSummary} = req.body;
    const data = orderSummary.replace(contentType, '');
    try {
        const attachment = Buffer.from(data, encoding);
        const info = await sendEmail({
            subject: 'order summary',
            text: 'Find your order summary attached',
            attachments: [{
                filename: 'order-summary.pdf',
                content: attachment,
            }],
        });
        res.status(200).json({message: info});
    } catch (e) {
        res.status(500).json({error: e});
    }
});