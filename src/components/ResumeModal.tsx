import { motion } from 'motion/react';
import { X, Printer, MapPin, Mail, Calendar, CreditCard, Sparkles, GraduationCap } from 'lucide-react';
import { portfolioOwner, initialEducationData, personalCoreSkills, skillsData, hobbiesData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#291100]/65 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl paper rounded-2xl p-6 sm:p-10 border border-[#291100]/20 shadow-2xl bg-[#FAF8F2] my-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Top Washi Tape */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <div className="h-6 w-36 bg-[#D7E3A4]/90 border-l-2 border-r-2 border-dashed border-[#FAF8F2]/80 shadow-xs rotate-[-1deg]" />
        </div>

        {/* Modal Controls */}
        <div className="flex items-center justify-between border-b border-[#291100]/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#657733] px-2.5 py-0.5 text-[10px] font-mono text-[#ECF5E2] uppercase font-bold tracking-wider">
              Student Profile & Academic Summary
            </span>
            <span className="font-hand text-lg text-[#657733]">· University of Cebu</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-full bg-[#ECF5E2] px-3.5 py-1.5 text-xs font-semibold text-[#657733] hover:bg-[#D7E3A4] transition-colors"
              title="Print Profile"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#ECF5E2] text-[#291100]"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Profile Body */}
        <div className="space-y-6 text-[#291100]">
          {/* Header with verified personal information */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between border-b border-[#291100]/15 pb-5">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl text-[#291100]">{portfolioOwner.fullName}</h1>
              <p className="font-hand text-2xl text-[#657733] mt-0.5">{portfolioOwner.collegeStanding} · {portfolioOwner.college}</p>
            </div>
            <div className="mt-3 sm:mt-0 text-xs font-mono space-y-1 text-[#291100]/80">
              <p className="flex items-center gap-1.5 font-bold text-[#657733]">
                <CreditCard className="h-3 w-3" /> Student ID: {portfolioOwner.studentId}
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-[#657733]" /> Birthday: {portfolioOwner.birthday}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-[#657733]" /> Hometown: {portfolioOwner.hometown}
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="h-3 w-3 text-[#657733]" /> {portfolioOwner.email}
              </p>
            </div>
          </div>

          {/* Statement */}
          <div className="lined paper rounded-xl p-4 border border-[#291100]/10 text-sm leading-relaxed text-[#291100]/85">
            {portfolioOwner.bio}
          </div>

          {/* Educational Background & Timeline */}
          <div>
            <h2 className="font-display text-xl text-[#291100] border-b border-[#291100]/10 pb-1 mb-3 flex items-center justify-between">
              <span>Educational Background & Timeline</span>
              <span className="font-hand text-sm text-[#657733]">chronological journey</span>
            </h2>
            <div className="space-y-3">
              {initialEducationData.map((edu, i) => (
                <div
                  key={edu.id}
                  className={`rounded-xl p-3.5 border ${
                    edu.isCurrent
                      ? 'bg-[#657733] text-[#ECF5E2] border-[#D4C04D]'
                      : 'bg-[#FAF8F2] border-[#291100]/10'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-1 text-sm">
                    <p className="font-bold flex items-center gap-2">
                      <span>{edu.stage}</span>
                      <span className="font-normal opacity-75">· {edu.institution}</span>
                      {edu.isCurrent && (
                        <span className="text-[10px] font-mono uppercase bg-[#D4C04D] text-[#291100] px-2 py-0.5 rounded-full font-bold">
                          Current Stage
                        </span>
                      )}
                    </p>
                    <span className="font-mono text-xs font-semibold">{edu.years}</span>
                  </div>
                  <p className="text-xs opacity-80 mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{edu.location}</span>
                  </p>
                  {edu.currentNote && (
                    <p className="text-xs font-hand text-lg mt-1 text-[#D4C04D] font-bold">
                      ✿ {edu.currentNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills */}
          <div>
            <h2 className="font-display text-xl text-[#291100] border-b border-[#291100]/10 pb-1 mb-3">
              Skills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {personalCoreSkills.map((skill) => (
                <div key={skill.name} className="rounded-lg bg-[#ECF5E2] p-2.5 border border-[#657733]/15">
                  <span className="text-base mr-1">{skill.icon}</span>
                  <p className="font-bold text-[#291100] mt-1">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div>
            <h2 className="font-display text-xl text-[#291100] border-b border-[#291100]/10 pb-1 mb-3">
              Hobbies & Interests
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {hobbiesData.map((h) => (
                <div key={h.name} className="rounded-lg bg-[#FAF8F2] p-2.5 border border-[#291100]/10 flex items-center gap-2">
                  <span className="text-xl">{h.emoji}</span>
                  <span className="font-semibold text-[#291100]">{h.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Technical Toolbox */}
          <div>
            <h2 className="font-display text-xl text-[#291100] border-b border-[#291100]/10 pb-1 mb-3">
              Technical Toolbox (from Draft)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {skillsData.map((toolbox) => (
                <div key={toolbox.group} className="rounded-lg bg-[#FAF8F2] p-2.5 border border-[#291100]/10">
                  <p className="font-bold text-[#657733] font-mono uppercase text-[10px]">{toolbox.group}</p>
                  <p className="text-[#291100]/80 mt-0.5">{toolbox.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#291100]/10 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-[#291100] px-5 py-2 text-xs font-semibold text-[#ECF5E2] hover:bg-[#657733] transition-colors"
          >
            Close Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
}
