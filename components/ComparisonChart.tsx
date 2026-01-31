"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", without: 100, with: 100 },
  { month: "Feb", without: 105, with: 98 },
  { month: "Mar", without: 112, with: 85 },
  { month: "Apr", without: 125, with: 78 },
  { month: "May", without: 140, with: 72 },
  { month: "Jun", without: 158, with: 65 },
];

export default function ComparisonChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-3xl" />
      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 shadow-2xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          Technical Debt Growth Over Time
        </h3>
        <p className="text-slate-600 text-center mb-6">
          AIReady helps you maintain code quality as your project scales
        </p>
        <div className="h-80">
           {typeof window !== "undefined" && (
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" label={{ value: 'Issues', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="without"
                stroke="#ef4444"
                strokeWidth={3}
                name="Without AIReady"
                dot={{ fill: "#ef4444", r: 5 }}
                animationDuration={2000}
              />
              <Line
                type="monotone"
                dataKey="with"
                stroke="#10b981"
                strokeWidth={3}
                name="With AIReady"
                dot={{ fill: "#10b981", r: 5 }}
                animationDuration={2000}
              />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </motion.div>
  );
}
