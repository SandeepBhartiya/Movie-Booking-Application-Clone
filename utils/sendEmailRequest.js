const sendEmail=require('./notification');
const notificationConfig=require('../configs/notification.config')

exports.successfulTicketPayment=(userEmail,payment)=>{
    sendEmail(
        `Movie Booking Payment Successful`,
        `The Payment of Movie booking for amount ${payment.amount} has been Successful`,
        `${userEmail}`,
        `Movie Booking App`
    );
}

exports.failedTicketPayment=(userEmail,payment)=>{
    sendEmail(
        `Movie Booking Payment Failed`,
        `The Payment of Movie booking for amount ${payment.amount} has been Failed`,
        `${userEmail}`,
        `Movie Booking App`
    );
}


exports.bookingCancelled=(userEmail,payment)=>{
    sendEmail(
        `Movie Booking Payment Cancelled`,
        `The Payment of Movie booking for amount ${payment.amount} has been Cancelled at your Request.`,
        `${userEmail}`,
        `Movie Booking App`
    );
}

exports.bookingPaymentTimeout=(userEmail,payment)=>{
    sendEmail(
        `Movie Booking Payment Timeout`,
        `The Payment of Movie booking for amount ${payment.amount} has been cancelled because you were not able to complete payment in time`,
        `${userEmail}`,
        `Movie Booking App`
    );
}