// home-designer/process/ProcessStepper.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Clock, Check, ArrowRight, Layers } from "lucide-react";
import { processSteps } from "./processSteps";
import SectionHeader from "../SectionHeader";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ProcessStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = processSteps[activeStep];
  const Icon = currentStep.icon;
const progress = ((activeStep + 1) / processSteps.length) * 100;

  return (
      <section className=" our-experties container_ser lg:pt-10 lg:pb-[70px] pt-10 pb-[40px]">
         <SectionHeader
            subtitle="PROCESS STEPPER"
            title="Step by Step"
            description="Excellence"
            buttonText="View More"
            buttonLink="/industries"
            className="col-12"
          />
       <div className="mxd-container"> 
        <div className="mx-auto row gx-0">
         
        <div className="grid lg:grid-cols-[320px,1fr] gap-8">
          {/* Steps sidebar */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border rounded-full overflow-hidden">
  <motion.div
    className="w-full bg-gradient-to-b-border rounded-full"
    animate={{ height: `${progress}%` }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  />
</div>

            <div className="space-y-2 relative">
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  data-magnetic
                  data-tooltip={`Step ${step.id}: ${step.title}`}
                  className={cn(
                    "w-full flex items-center relative gap-4 p-8 rounded-2xl text-left transition-all duration-300",
                    index === activeStep
                      ? "bg-card border border-accent/50 bg-[#fff] text-whiteshadow-card"
                      : "hover:bg-card/50",
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className={cn(
                      "relative bg-border z-10 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300",
                      index === activeStep
                        ? " bg-[#119000]"
                        : index < activeStep
                          ? "bg-step-complete"
                          : " bg-border",
                    )}
                    animate={index === activeStep ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {index < activeStep ? (
                      <Check className="w-8 h-8 text-accent-foreground" />
                    ) : (
                      <step.icon
                        className={cn(
                          "w-8 h-8 transition-colors",
                          index === activeStep
                            ? "text-accent-foreground text-white"
                            : "text-muted-foreground ",
                        )}
                      />
                    )}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={cn(
                        "font-semibold tracking-wider",
                        index === activeStep
                          ? "text-[#108a00]"
                          : "text-muted-foreground",
                      )}
                    >
                      STEP {step.id}
                    </span>
                    <h4
                      className={cn(
                        "text-[18px] truncate transition-colors",
                        index === activeStep
                          ? "text-foreground text-black"
                          : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </h4>
                  </div>
                  {index === activeStep && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 rounded-full bg-[#119000]"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content panel */}
          <div className="relative min-h-[600px] md:pl-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-card bg-[#fff] border border-border rounded-3xl md:p-[40px] p-[20px]  md:p-14shadow-elevated"
              >
                {/* Header with 3D icon */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                  <motion.div
                    className="relative"
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <div className="w-24 h-24 rounded-2xl text-white via-primary bg-[#119000] flex items-center justify-center shadow-elevated relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                      <Icon className="w-12 h-12 text-accent-foreground relative z-10" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-accent/30 blur-xl -z-10" />
                  </motion.div>
                  <div>
                    <motion.span
                      className="inline-block px-3 py-1 rounded-full bg-[#119000]/10 font-bold mb-2 text-black"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Phase {currentStep.id} of {processSteps.length}
                    </motion.span>
                    <motion.h3
                      className=" font-bold text-foreground text-black"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {currentStep.title}
                    </motion.h3>
                    <motion.div
                      className="flex items-center gap-2 mt-2 text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Clock className="w-4 h-4 text-black" />
                      <span>Duration: {currentStep.details.duration}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  className="text-muted-foreground leading-relaxed md:text-[20px] mb-12  p-6 rounded-2xl border border-border text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  {currentStep.fullDescription}
                </motion.p>

                {/* Two column layout */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl  flex items-center justify-center">
                        <Layers className="w-6 h-6 text-black" />
                      </div>
                      <h4 className="font-bold text-foreground text-black">
                        Key Activities
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {currentStep.details.activities.map((activity, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3 p-3 text-black bg-[#faf7f6] rounded-xl"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 + i * 0.05 }}
                        >
                          <ArrowRight className="w-6 h-6 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {activity}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-step-complete/20 flex items-center justify-center">
                        <Check className="w-6 h-6 text-step-complete text-black" />
                      </div>
                      <h4 className="font-bold text-foreground text-black">
                        Deliverables
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {currentStep.details.deliverables.map(
                        (deliverable, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-3 p-3 text-black bg-[#faf7f6] rounded-xl"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 + i * 0.05 }}
                          >
                            <Check className="w-6 h-6 text-step-complete mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {deliverable}
                            </span>
                          </motion.li>
                        ),
                      )}
                    </ul>
                  </motion.div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-border text">
                  <motion.button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className={cn(
                      "btn",
                      activeStep === 0
                        ? "opacity-50 cursor-not-allowed"
                        : " md:text-[16px] text-[12px]",
                    )}
                    data-magnetic
                    data-tooltip="Previous Step"
                    whileHover={activeStep > 0 ? { x: -5 } : {}}
                  >
                    <ArrowRight className="w-6 h-6 rotate-180" />
                    <span>Previous</span>
                  </motion.button>

                  <div className="flex items-center md:gap-2 gap-1">
                    {processSteps.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveStep(index)}
                        className={cn(
                          "w-4 h-4 rounded-full transition-all bg-[#faf7f6]",
                          index === activeStep
                            ? "md:w-10 w-6 bg-[#119000]"
                            : index < activeStep
                              ? "bg-step-complete bg-[#faf7f6]"
                              : "bg-[#faf7f6]",
                        )}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={() =>
                      setActiveStep(
                        Math.min(processSteps.length - 1, activeStep + 1),
                      )
                    }
                    disabled={activeStep === processSteps.length - 1}
                    className={cn(
                      "btn ",
                      activeStep === processSteps.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : "text-accent-foreground bg-[#119000] md:text-[16px] text-[12px] text-white md:px-8 md:py-3 px-6 py-2",
                    )}
                    data-magnetic
                    data-tooltip="Next Step"
                    whileHover={
                      activeStep < processSteps.length - 1 ? { x: 5 } : {}
                    }
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-6 h-6"/>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};