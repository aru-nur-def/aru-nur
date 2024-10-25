document.getElementById('calculate').addEventListener('click', () => {
    // Получение данных из формы
    let name = document.getElementById('name').value;
    let price = Number(document.getElementById('starting_bid').value); // Начальная ставка (starting bid)
    
    // Проверяем, что имя и начальная ставка не пусты
    if (name && price) {
        // 1. Образование
        const education = Number(document.getElementById('education').value);
        price *= education; // Умножаем цену на коэффициент образования

        // 2. Состояние семьи
        const netWorth = Number(document.getElementById('net_worth').value);
        price *= netWorth; // Умножаем цену на коэффициент состояния семьи

        // 3. Каста
        const caste = Number(document.getElementById('caste').value);
        price += caste; // Добавляем фиксированное значение на основе касты

        // 4. Навыки (используем filterReduce для добавления бонусов)
        const skills = [...document.getElementsByClassName('skills')]; // Получаем все навыки
        const skillBonus = skills.filter(skill => skill.checked) // Фильтруем выбранные навыки
                                 .reduce((acc, skill) => acc + Number(skill.value), 0); // Суммируем бонусы
        price += skillBonus; // Добавляем бонус за навыки

        // 5. Возраст (используем forEach для применения коэффициента)
        const age = [...document.getElementsByName('age')];
        age.forEach(ageOption => {
            if (ageOption.checked) {
                price *= Number(ageOption.value); // Умножаем цену на коэффициент возраста
            }
        });

        // 6. Репутация (используем for loop для применения коэффициентов)
        const reputation = [...document.getElementsByClassName('reputation')];
        for (let i = 0; i < reputation.length; i++) {
            if (reputation[i].checked) {
                price *= Number(reputation[i].value); // Умножаем на коэффициенты за репутацию
            }
        }

        // 7. Письмо
        const loveLetter = document.getElementById('love_letter').value; // Получаем текст письма

        // 8. Создание объекта с результатами
        let person = {
            groom_name: name,
            groom_price: price.toFixed(2), // Округляем цену до 2 знаков после запятой
            letter_to_groom: loveLetter
        };

        // 9. Вывод результата на страницу
        let result = `The price for ${person.groom_name} is $${person.groom_price}.`;
        result += `<br>Your love letter: ${person.letter_to_groom}`;
        document.getElementById('result').innerHTML = result; // Вставляем результат на страницу

    } else {
        // Предупреждение, если имя или начальная ставка не заполнены
        alert("Please fill out both the groom's name and starting bid.");
    }
});
