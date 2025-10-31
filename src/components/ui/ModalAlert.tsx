import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export type ModalType = "error" | "warning" | "info";

interface ModalAlertProps {
  show: boolean;
  type?: ModalType;
  message: string;
  onClose: () => void;
}

type Style = {
  color: string;
  title: string;
  Icon: React.ElementType;
  iconBg: string;
  iconRing: string;
  iconTint: string;
};

const STYLE_MAP: Record<ModalType, Style> = {
  error: {
    color: "bg-red-500",
    title: "Terjadi Kesalahan",
    Icon: XCircleIcon,
    iconBg: "bg-red-500/10",
    iconRing: "ring-red-400/30",
    iconTint: "text-red-400",
  },
  warning: {
    color: "bg-yellow-500",
    title: "Akun Belum Terdaftar",
    Icon: ExclamationTriangleIcon,
    iconBg: "bg-yellow-500/10",
    iconRing: "ring-yellow-400/30",
    iconTint: "text-yellow-400",
  },
  info: {
    color: "bg-blue-500",
    title: "Informasi",
    Icon: InformationCircleIcon,
    iconBg: "bg-blue-500/10",
    iconRing: "ring-blue-400/30",
    iconTint: "text-blue-400",
  },
};

export default function ModalAlert({
  show,
  type = "error",
  message,
  onClose,
}: ModalAlertProps) {
  const modalStyles = STYLE_MAP[type];
  const { Icon } = modalStyles;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8 w-[90%] max-w-sm text-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Glow lembut */}
            <div
              className={`absolute inset-0 blur-3xl opacity-20 ${modalStyles.color} pointer-events-none`}
            ></div>

            {/* Konten utama */}
            <div className="relative z-10">
              <div className="flex justify-center mb-5">
                <motion.div
                  key={type}
                  initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`
                    relative inline-flex items-center justify-center
                    w-24 h-24 rounded-full ${modalStyles.iconBg}
                    ring-8 ${modalStyles.iconRing} shadow-lg
                  `}
                >
                  <Icon className={`w-12 h-12 ${modalStyles.iconTint}`} />
                  {/* Halo glow kecil */}
                  <span
                    className={`absolute -z-10 inset-0 rounded-full ${modalStyles.color} blur-2xl opacity-20`}
                  />
                </motion.div>
              </div>

              <h3 id="modal-title" className="text-xl font-bold text-white mb-2">
                {modalStyles.title}
              </h3>

              <p className="text-gray-300 mb-6">{message}</p>

              <div className="flex justify-center gap-3">
                {type === "warning" && (
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-2 px-6 rounded-md transition"
                  >
                    Daftar Sekarang
                  </Link>
                )}
                <button
                  onClick={onClose}
                  className={`${modalStyles.color} hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md transition`}
                >
                  {type === "warning" ? "Tutup" : "Mengerti"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}