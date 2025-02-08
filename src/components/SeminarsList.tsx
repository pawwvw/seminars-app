import { useEffect, useState } from "react";
import { Seminar, fetchSeminars } from "../api/seminars";
import seminarDelete from "../api/seminarDelete";
import { saveSubmit } from "../api/saveseminar";

// Функция для форматирования даты для привильной подставновки в input
const formatDate = (date: string) => {
  const formattedDate = date.split('.').reverse().join('-');
  return new Date(formattedDate).toISOString().split('T')[0]
}


const SeminarList = () => {
    const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchSeminars().then((data) => {
            console.log("Полученные семинары", data);
            setSeminars(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Вывод семинаров. Использую tailwind и плагин на него daisyui
    return (
        <div className="flex flex-wrap gap-4 justify-around">
            {seminars.map((seminar) => (
                <div className="card bg-base-100 w-96 shadow-sm" key={seminar.id}>
                <figure>
                  <img
                    src={seminar.photo}
                    alt={seminar.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{seminar.title}</h2>
                  <p>{seminar.description}</p>
                    <p>{seminar.date} {seminar.time}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-error" onClick={() => seminarDelete(seminar.id, setSeminars, seminars)}>Удалить</button>
                    <button className="btn btn-primary" onClick={() => (document.getElementById(`my_modal_${seminar.id}`) as HTMLDialogElement)?.showModal()}>Изменить</button>
                    <dialog id={`my_modal_${seminar.id}`} className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Изменить семинар</h3>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Название</legend>
                          <input type="text" className="input" placeholder="Название" defaultValue={seminar.title} onChange={(e) => setEditingSeminar({...seminar, title: e.target.value})}/>
                        </fieldset>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Описание</legend>
                          <input type="text" className="input" placeholder="Описание" defaultValue={seminar.description}/>
                        </fieldset>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Дата</legend>
                          <input type="date" className="input" placeholder="Дата" defaultValue={formatDate(seminar.date)}/>
                        </fieldset>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Время</legend>
                          <input type="text" className="input" placeholder="Время" defaultValue={seminar.time}/>
                        </fieldset>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend">Фото</legend>
                          <input type="text" className="input" placeholder="Фото" defaultValue={seminar.photo}/>
                        </fieldset>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn btn-success" onClick={() => saveSubmit(editingSeminar, setSeminars)}>Save</button>
                          </form>
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            ))}
        </div>
    )
}   


export default SeminarList;