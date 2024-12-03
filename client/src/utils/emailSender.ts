import nodemailer from 'nodemailer';

export async function sendWelcomeEmail(email: string, name: string) {
    try {
        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or use SMTP server settings
            auth: {
                user: 'rushi.200410116109@gmail.com', // Replace with your email
                pass: 'Rushishah@11', // Replace with your password or app password
            },
        });

        // Email content
        const mailOptions = {
            from: '"Your Company" <rushi.200410116109@gmail.com>',
            to: email,
            subject: 'Welcome to Our Platform!',
            html: `
                <h1>Hello ${name},</h1>
                <p>Thank you for creating your website with us. We are excited to have you onboard.</p>
                <p>Best Regards,<br>The Team</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
}

// Example usage in a function when a user creates a website
async function onWebsiteCreated(userEmail: string, userName: string) {
    // Logic to save user data (already implemented)
    console.log('Website created successfully.');

    // Send welcome email
    await sendWelcomeEmail(userEmail, userName);
}

// Example call to the function
onWebsiteCreated('example@example.com', 'Example User');
