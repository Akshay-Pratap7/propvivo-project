'use client';

import { useSession } from '@/context/SessionContext';
import { Search, Bell, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { graphql } from '@/graphql/generated';

const CREATE_ATTENDANCE = graphql(`
  mutation TopbarCreateAttendance($request: CreateAttendanceRequestInput!) {
    createAttendance(request: $request) {
      data {
        attendanceId
      }
    }
  }
`);

export function Topbar() {
  const { user } = useSession();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createAttendance] = useMutation(CREATE_ATTENDANCE);

  const handleToggleAttendance = async () => {
    if (!user?.id || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      
      await createAttendance({
        variables: {
          request: {
            requestParam: {
              employeeId: user.id,
              date: now.toISOString(),
              clockInTime: !isCheckedIn ? now.toISOString() : null,
              clockOutTime: isCheckedIn ? now.toISOString() : null,
              status: "Present"
            }
          }
        }
      });
      setIsCheckedIn(!isCheckedIn);
    } catch (error) {
      console.error("Failed to register attendance:", error);
      alert("Failed to register attendance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Left: Breadcrumb / Title */}
      <div className="flex items-center text-sm font-medium text-slate-500">
        <span className="text-slate-900">Dashboard</span>
        <span className="mx-2">/</span>
        <span>Overview</span>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full text-slate-500 focus-within:text-slate-700">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all"
            placeholder="Search employees, documents, or projects..."
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleAttendance}
          disabled={isSubmitting}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isCheckedIn
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
              : 'bg-[#FF5A5F] text-white hover:bg-[#ff474d] shadow-sm'
          } disabled:opacity-50`}
        >
          <Clock size={16} />
          <span>{isSubmitting ? 'Wait...' : (isCheckedIn ? 'Check Out' : 'Check In')}</span>
        </button>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF5A5F] rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <button className="flex items-center space-x-3 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-700 leading-none">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500 mt-1">Admin</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
