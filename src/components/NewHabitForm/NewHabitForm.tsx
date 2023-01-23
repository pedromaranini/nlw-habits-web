import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState, useContext } from 'react';
import { Check, CheckCircle } from "phosphor-react";
import { api } from '../../lib/axios';
import { ToastifyContext } from '../../contexts/openToastify';
import { toast } from 'react-toastify';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabitForm() {
  const { openToastify, setOpenToastify } = useContext(ToastifyContext);
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays,
    })

    setTitle('');
    setWeekDays([]);
    setOpenToastify(false);

    toast('Hábito criado com sucesso', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      icon: <CheckCircle size={24} className="text-zinc-100" />,
      role: 'Seu hábito foi criado com sucesso!',
      className: "bg-violet-600 text-zinc-100 font-bold"
    })
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      // Mantem no array somente o dia que for diferente
      // ou seja, se selecionar o mesmo dia (0 e 0), ele remove e mantém os dias diferentes de 0 somente
      // retornando um novo array a partir do filter
      const weekDaysRemoved = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDaysRemoved);
    } else {
      // Pego todos os dias que ja existiam no array (...weekDays) e, adiciono um novo dia
      const weekDaysAdded = [...weekDays, weekDay]

      setWeekDays(weekDaysAdded);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>
      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              className="flex items-center gap-3 group focus:outline-none"
              key={weekDay}
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        })}

      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} />
        Confirmar
      </button>

    </form>
  );
}