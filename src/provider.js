// TOP SMM API Provider Adapter
const fetch = require('node-fetch');

// सर्विस मॉपिंग: अपने पैनल की सर्विस आईडी को Top SMM की आईडी (जैसे 566) से मैप करें
const SERVICE_MAP = {
     '5': '566' 
};

async function submitOrder(order) {
    const API_URL = 'https://topsmm.in/api/v2';
    const API_KEY = process.env.TOP_SMM_API_KEY || 'd1d5e03eb40b48da8a2a5f0a9289d8af73799b64';

    // अगर मैपिंग मौजूद है तो उसे इस्तेमाल करें, वरना जो ऑर्डर में है उसे भेजें
    const serviceIdToUse = SERVICE_MAP[order.serviceId] || order.serviceId;

    const params = new URLSearchParams({
        key: API_KEY,
        action: 'add',
        service: serviceIdToUse,
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
            return {
                accepted: true,
                provider: 'topsmm',
                externalId: data.order,
                orderId: order.id
            };
        } else {
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


