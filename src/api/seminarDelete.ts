import { Seminar } from "./seminars";


const seminarDelete = async (id: number, setSeminars: React.Dispatch<React.SetStateAction<Seminar[]>>, seminars: Seminar[]) => {
    const confirmWindow = window.confirm("Вы уверены, что хотите удалить семинар?");
    if (confirmWindow) {
        try {
            await fetch(`http://localhost:5000/seminars/${id}`, {
                method: "DELETE"
            }).then(()=>{
                setSeminars(seminars.filter((seminar) => seminar.id !== id));
            })
        } catch (error) {    
            console.error("Ошибка при удалении семинара", error);
        }

    }
};

export default seminarDelete;