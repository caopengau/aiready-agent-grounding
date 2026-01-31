"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Without AIReady", tokens: 100, color: "#ef4444" },
  { name: "With AIReady", tokens: 60, color: "#10b981" },
];

export default function InteractiveChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 shadow-2xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          Context Token Optimization
        </h3>
        <p className="text-slate-600 text-center mb-6">
          Save up to 40% on API costs by eliminating redundant context
        </p>
        <div className="h-80">
          {typeof window !== "undefined" ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" label={{ value: 'Tokens (k)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="tokens" radius={[8, 8, 0, 0]} animationDuration={1500}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span className="text-slate-600">Before</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-slate-600">After AIReady</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
