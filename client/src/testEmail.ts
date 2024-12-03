import { sendWelcomeEmail } from './utils/emailSender'; // Adjust path if necessary

(async () => {
    const testEmail = 'rushi.200410116109@gmail.com'; // Replace with your email
    const testName = 'Test User';
    
    try {
        await sendWelcomeEmail(testEmail, testName);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
})();
