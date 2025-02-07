import { useEffect, useState } from "react";
import { Seminar, fetchSeminars } from "../api/seminars";

const SeminarList = () => {
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

    return (
        <div className="flex flex-wrap gap-4 justify-around">
            {seminars.map((seminar) => (
                <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                  <img
                    src={seminar.photo}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{seminar.title}</h2>
                  <p>{seminar.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-error">Удалить</button>
                    <button className="btn btn-primary">Изменить</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
    )
}   


export default SeminarList;