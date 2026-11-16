// TOP SMM API Provider Adapter
const fetch = require('node-fetch'); // यदि node-fetch इंस्टॉल न हो तो सुनिश्चित करें

async function submitOrder(order) {
    const API_URL = 'https://topsmm.in/api/v2; // यहाँ अपने SMM पैनल का API URL डालें
    const API_KEY = process.env.TOP_SMM_API_KEY || 'd1d5e03eb40b48da8a2a5f0a9289d8af73799b64'; // Render के Environment Variables से API Key ले सकते हैं

    const params = new URLSearchParams({
        key: API_KEY,
        action: 'add',
        service: order.serviceId,
        link: order.link,
        quantity: order.quantity
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: params
        });

        const data = await response.json();

        if (data.order) {
            // ऑर्डर सफल होने पर SMM पैनल की आर्डर आईडी रिटर्न करें
            return {
                accepted: true,
                provider: 'topsmm',
                externalId: data.order,
                orderId: order.id
            };
        } else {
            // अगर API से कोई एरर आए
            throw new Error(data.error || 'Unknown API Error');
        }
    } catch (error) {
        console.error('API Error:', error.message);
        return {
            accepted: false,
            error: error.message
        };
    }
}

module.exports = { submitOrder };

