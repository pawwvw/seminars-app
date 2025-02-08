import { Seminar } from "./seminars"

// функция для сохранения изменений в семинаре отправляет запрос на сервер с измененным объектом семинара. Потом перезаписывает семинар в массиве семинаров

export const saveSubmit = async (editingSeminar: Seminar | null, setSeminars: React.Dispatch<React.SetStateAction<Seminar[]>>) => {
    try{
        fetch(`http://localhost:5000/seminars/${editingSeminar?.id}`, {method: "PUT", body: JSON.stringify(editingSeminar)}).then(()=>{
            // Перезаписываем данные семинара в массиве семинаров
            setSeminars((seminars) => seminars.map((seminar) => seminar.id === editingSeminar?.id ? editingSeminar : seminar));
        })
    } catch (error) {
        console.error("Ошибка при сохранении семинара", error);
    }
}