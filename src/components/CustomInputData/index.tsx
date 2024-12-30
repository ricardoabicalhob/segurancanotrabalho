import { Calendar, Calendar1Icon, LucideCalendar } from 'lucide-react';
import React, { useState } from 'react';

export default function CustomInputData() {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateClick = (date :Date) => {
    setSelectedDate(date);
  };

  return (
    <div className='flex items-center justify-between w-full h-9 px-3 rounded-md border-[1px] border-gray-700'>
      <div className={`select-none text-sm ${!selectedDate && 'text-gray-500'}`}>{selectedDate ? selectedDate.toLocaleDateString() : 'Selecione a data'}</div>
      <button onClick={() => {/* Função para abrir o calendário */}}>
        <Calendar className='w-[13px] h-[13px]' />
      </button>
      {/* Aqui você renderizaria o calendário quando o botão for clicado */}
    </div>
  );
}