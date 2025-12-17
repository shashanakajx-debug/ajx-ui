'use client';

import { useState } from 'react';
import Input from '@/components/atoms/Input/Input';
import Textarea from '@/components/atoms/Textarea/Textarea';
import Button from '@/components/atoms/Button/Button';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    subject: '',
                    message: '',
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-darkmode-primary">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-primary to-accent text-white dark:from-darkmode-primary dark:to-darkmode-secondary">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-glacial font-bold mb-6 leading-tight">
                            Let&apos;s Build <br />
                            Something Amazing Together
                        </h1>
                        <p className="text-lg md:text-xl text-white leading-relaxed opacity-90">
                            Have a project in mind? We&apos;d love to hear about it. Send us a message and we&apos;ll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="section-padding bg-white dark:bg-darkmode-primary">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-glacial font-bold mb-6 text-secondary dark:text-darkmode-highlight">
                                Get in Touch
                            </h2>
                            <p className="text-lg text-text-muted dark:text-text-dark-muted mb-8 leading-relaxed">
                                We&apos;re here to help and answer any questions you might have. We look forward to hearing from you!
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-glacial font-bold text-secondary dark:text-darkmode-highlight mb-1">Email</h3>
                                        <p className="text-text-muted dark:text-text-dark-muted">shashanakajx@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-glacial font-bold text-secondary dark:text-darkmode-highlight mb-1">Phone</h3>
                                        <p className="text-text-muted dark:text-text-dark-muted">+91 8269669862</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-glacial font-bold text-secondary dark:text-darkmode-highlight mb-1">Address</h3>
                                        <p className="text-text-muted dark:text-text-dark-muted">Skye Privilon, 117, Tulsi Nagar, Nipania, Indore, Madhya Pradesh 452010</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-soft-gray dark:bg-darkmode-secondary rounded-xl">
                                <h3 className="font-glacial font-bold text-secondary dark:text-darkmode-highlight mb-3">Business Hours</h3>
                                <div className="space-y-2 text-text-muted dark:text-text-dark-muted">
                                    <p>Monday - Saturday: 10:00 AM - 07:00 PM</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="card">
                            <h3 className="text-2xl font-glacial font-bold mb-6 text-secondary dark:text-darkmode-highlight">
                                Send Us a Message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Name *"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your full name"
                                />
                                <Input
                                    label="Email *"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                />
                                <Input
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your phone number"
                                />
                                <Input
                                    label="Company"
                                    name="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Your company name"
                                />
                                <Input
                                    label="Subject *"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What is this about?"
                                />
                                <Textarea
                                    label="Message *"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us about your project..."
                                />

                                {submitStatus === 'success' && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                                        Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                                        Oops! Something went wrong. Please try again later.
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}