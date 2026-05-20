document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlist-form');
    const emailInput = document.getElementById('email-input');
    const formMessage = document.getElementById('form-message');
    const companyId = "a50e6644-2530-4f87-82b0-c1e50d61265b"; // FlavorFix company ID

    waitlistForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        formMessage.textContent = 'Joining...';
        formMessage.style.color = '#000000';

        const email = emailInput.value;

        if (!email) {
            formMessage.textContent = 'Please enter your email.';
            formMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('https://app.baget.ai/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyId: companyId,
                    email: email,
                    source: 'FlavorFix Landing Page Waitlist'
                }),
            });

            if (response.ok) {
                formMessage.textContent = 'Thanks for joining! We'll be in touch soon.';
                formMessage.style.color = 'var(--brand-secondary)'; // Green for success
                emailInput.value = '';
            } else {
                const errorData = await response.json();
                formMessage.textContent = `Error: ${errorData.message || 'Something went wrong.'}`;
                formMessage.style.color = 'red';
            }
        } catch (error) {
            formMessage.textContent = 'Network error. Please try again later.';
            formMessage.style.color = 'red';
            console.error('Waitlist form submission error:', error);
        }
    });
});
