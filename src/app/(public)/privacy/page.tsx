import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="bg-surface min-h-screen pt-40 privacy-section">
            <div className="container-custom section-padding">
                <h1 className="mb-8">Privacy Policy</h1>
                <p className=" mb-8">Last Updated: December 31, 2025</p>
                <p className="mb-8">
                    At <strong>AJX Technologies</strong>, we respect your privacy and are committed 
                    to protecting your personal data. This policy explains how we handle your information 
                    when you visit <strong>ajxtechnologies.com</strong> or use our services.
                </p>

                <div className="space-y-8 max-w-4xl">
                    <section>
                        <h2 className="mb-4">1. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>Personal details you provide (name, email, phone, company info).</li>
                            <li>Non-personal details (IP address, device type, browser data, site usage).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">2. How We Use Your Information</h2>
                        <p className=" mb-4">We use the information to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>Provide and improve our services.</li>
                            <li>Respond to your inquiries.</li>
                            <li>Send important updates or marketing (you can opt out anytime).</li>
                            <li>Analyze website usage for a better experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">3. Cookies</h2>
                        <p className="">
                            Our site uses cookies to improve functionality and track usage. You can 
                            disable cookies in your browser, but some features may not work properly.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4">4. Sharing of Information</h2>
                        <p className="">
                            We do not sell your information. We may share data with trusted service 
                            providers or if required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4">5. Data Security</h2>
                        <p className="">
                            We implement appropriate security measures to protect your information from 
                            unauthorized access, alteration, or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4">6. Your Rights</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>Request access to your personal data.</li>
                            <li>Request correction or deletion of your data.</li>
                            <li>Opt out of marketing communications at any time.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">7. Changes to This Policy</h2>
                        <p className="">
                            We may update this Privacy Policy periodically. Any changes will be posted 
                            on this page with an updated revision date.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}