import React from 'react';

export default function TermsPage() {
    return (
        <div className="bg-surface min-h-screen pt-40 privacy-section">
            <div className="container-custom section-padding">
                <h1 className="mb-8">Terms & Conditions</h1>
                <p className="mb-8">Last Updated: December 31, 2025</p>
                <p className="mb-8">
                    Welcome to AJX Technologies. By accessing or using our website ajxtechnologies.com 
                    and services, you agree to the following terms and conditions.
                </p>

                <div className="space-y-8 max-w-4xl">
                    <section>
                        <h2 className="mb-4">1. Use of Our Website</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>You agree to use our website only for lawful purposes.</li>
                            <li>You must not attempt to disrupt or gain unauthorized access to our site or services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">2. Intellectual Property</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>
                                All content on this website (designs, text, graphics, logos, etc.) is owned 
                                by <strong>AJX Technologies</strong>.
                            </li>
                            <li>You may not copy, modify, or reuse our content without written permission.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">3. Services</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>
                                We aim to provide accurate and reliable information about our services, 
                                but we do not guarantee error-free or uninterrupted access.
                            </li>
                            <li>Project terms, deliverables, and pricing will be agreed upon separately with clients.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">4. Limitations of Liability</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>
                                <strong>AJX Technologies</strong> is not liable for any indirect or consequential 
                                damages arising from the use of our website or services.
                            </li>
                            <li>Users are responsible for how they use the information and services we provide.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">5. Third-Party Links</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>
                                Our website may contain links to external websites. We are not responsible 
                                for the content or policies of third-party sites.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-4">6. Changes to Terms</h2>
                        <ul className="list-disc pl-6 space-y-2 text-muted">
                            <li>
                                We may update these Terms & Conditions at any time. Continued use of our 
                                website means you accept the updated terms.
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}