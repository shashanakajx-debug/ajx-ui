"use client";
import { type ContactFormData, contactSchema } from "@/schemas";
import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@formspree/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedButton from "@/components/animation/AnimatedButton";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isHookSubmitting },
  } = useHookForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  // Formspree submit hook
  const [fsState, fsSubmit] = useForm<ContactFormData>("meoljlry");

  const onSubmit = async (data: ContactFormData) => {
    try {
      await fsSubmit(data); // submit to Formspree
      reset(); // reset form fields
      toast.success("Message sent — thanks!");
    } catch {
      toast.error("Submission failed — please try again later.");
    }
  };

  const isSubmitting = isHookSubmitting || fsState.submitting;

  return (
    <>
      <div className="mxd-section mxd-section-inner-form padding-default">
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-2 mxd-grid-item no-margin" />
                <div className="col-12 col-xl-8">
                  <div className="mxd-block__content contact">
                    <div className="mxd-block__inner-form loading__fade">
                      <div className="form-container">
                        <h3 className="mb-4 reveal-type anim-uni-in-up">
                          Send Us a Message
                        </h3>

                        {/* Contact Form */}
                        <form
                          className="form contact-form"
                          id="contact-form"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          {/* Hidden Field for Subject override if needed by Formspree */}
                          <input
                            type="hidden"
                            name="subject"
                            value="New Contact Form Submission"
                          />

                          <div className="container-fluid p-0">
                            <div className="row gx-0">
                              {/* Name */}
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <input
                                  type="text"
                                  placeholder="Your name *"
                                  {...register("name")}
                                />
                                {errors.name && (
                                  <p className="error-message">
                                    {errors.name.message}
                                  </p>
                                )}
                              </div>

                              {/* Email */}
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <input
                                  type="email"
                                  placeholder="Email *"
                                  {...register("email")}
                                />
                                {errors.email && (
                                  <p className="error-message">
                                    {errors.email.message}
                                  </p>
                                )}
                              </div>

                              {/* Phone */}
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <input
                                  type="tel"
                                  placeholder="Phone"
                                  {...register("phone")}
                                />
                                {errors.phone && (
                                  <p className="error-message">
                                    {errors.phone.message}
                                  </p>
                                )}
                              </div>

                              {/* Company */}
                              <div className="col-12 col-md-6 mxd-grid-item anim-uni-in-up">
                                <input
                                  type="text"
                                  placeholder="Company name"
                                  {...register("company")}
                                />
                              </div>

                              {/* Subject */}
                              <div className="col-12 mxd-grid-item anim-uni-in-up">
                                <input
                                  type="text"
                                  placeholder="What is this about? *"
                                  {...register("subject")}
                                />
                                {errors.subject && (
                                  <p className="error-message">
                                    {errors.subject.message}
                                  </p>
                                )}
                              </div>

                              {/* Message */}
                              <div className="col-12 mxd-grid-item anim-uni-in-up">
                                <textarea
                                  placeholder="Tell us about your project... *"
                                  {...register("message")}
                                />
                                {errors.message && (
                                  <p className="error-message">
                                    {errors.message.message}
                                  </p>
                                )}
                              </div>

                              {/* Submit Button */}
                              <div className="col-12 mxd-grid-item anim-uni-in-up">
                                <AnimatedButton
                                  text={isSubmitting ? "Sending..." : "Send Message"}
                                  position={"next"}
                                  as={"button"}
                                  className="btn btn-anim btn-default btn-large btn-opposite slide-right-up"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  <i className="ph-bold ph-arrow-up-right" />
                                </AnimatedButton>
                              </div>
                            </div>
                          </div>
                        </form>
                        {/* End Contact Form */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
