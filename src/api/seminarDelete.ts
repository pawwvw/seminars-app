import { Seminar } from "./seminars";

// функция для удаления семинара. После удаления перезаписывает массив семинаров

const seminarDelete = async (id: number, setSeminars: React.Dispatch<React.SetStateAction<Seminar[]>>, seminars: Seminar[]) => {
    const confirmWindow = window.confirm("Вы уверены, что хотите удалить семинар?");
    if (confirmWindow) {
        try {
            await fetch(`http://localhost:5000/seminars/${id}`, {
                method: "DELETE"
            }).then(()=>{
                // Оставляем все семинары кроме удаленного
                setSeminars(seminars.filter((seminar) => seminar.id !== id));
            })
        } catch (error) {    
            console.error("Ошибка при удалении семинара", error);
        }

    }
};

export default seminarDelete;