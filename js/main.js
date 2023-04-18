/* 
    КАРКУЛЯТОР 1.2 / 18 апреля 2023 / by Serenq
    
    Основные возможности:
    - Проверка ввода.
    - Форматирование матемитического алгоритма, можно вставлять чепуху.
    - Предварительный просмотр результата.
    - Возможность не прирывать вычисление нажимая на математические операторы.
    - После нажатия кнопки (=), можно продолжать вычисления.
*/

//CALC.EXE
;(function(){
    const btn = $('.btn');
    const input = $('.display-result__input');
    const noticeVal = $('.display-result__notice');
    const placeholder = ['Каркулятор','2 + 2 * 2 = 8','Красота','Готов!','Приятный результат'];
    // Убирает лишние символы. Защита от ввода хуйни всякими ебланами.
    const reg_allowedType = /\B[^\-\d\.\s]+|[^\d\+\-\*\/\.]|(?<=\d+[\+\-\*\/\.])[\+\*\/\.]+|(?<=\d+\-)\-+|\B[\+\-\*\/][\+\-\*\/]+|\B0+[\.1-9]|(?<=\.\d+)\.|(?<=\.)\.+|(?<=\.)\-|\B\./g;
    // Проверка уже введённого для вывода подсказки БЕЗ ОШИБОК!
    const reg_formattedVal = /^\-?[0-9]+$|^(?:[0-9\.]+|\-[0-9])(?:(?:[\+\-\*\/])(?:[0-9\.]+))+$|^[0-9\.]+$/;

    let calc = {
        value: '',
        executed: false,
        placehold: function(){
            let rand = Math.floor(Math.random() * placeholder.length);
            input.attr('placeholder', placeholder[rand]);
        },
        clickToInput: function(e){
            calc.value += $(this).attr('data-btn') || '';

            // Очистить инпут по нажатию КЛЕР
            if( $(this).hasClass('btn-clr') ){ calc.clear() }

            // Если в строке уже есть выражение. Нужно вычислить
            if( $(this).hasClass('btn-execute') ){
                calc.result();
                noticeVal.text('...');
            }
            
            // Ввод данных
            input.val( calc.value ); // Ввод данных
            calc.reg_allowInput(); // Форматирование ввода
            calc.notice(); // Предварительный просмотр результата
        },
        typeToInput: function(e){
            calc.value = input.val(); // Ввод данных
            calc.reg_allowInput(); // Форматирование ввода
            calc.notice(); // Предварительный просмотр результата

            if(e.which == 32){ calc.clear() } // SPACE

            // Enter - Результат
            if(e.which == 13){ calc.result() } // ENTER
        },
        reg_allowInput: function(){
            calc.value = input.val().replace(reg_allowedType, '');
            input.val(calc.value);
        },
        reg_formatStr: function(){
            calc.value = input.val().replace(reg_allowedType, '');
            input.val(calc.value);
        },
        clear: function(){
            calc.value = '';
            calc.placehold();
            input.val(calc.value);
            noticeVal.text('...');
        },
        result: function(){
            let reg = new RegExp(/[\+\-\*\/\.]\.?$/,'gm'); // Убрать символы в конце
            calc.reg_allowInput(); // Форматирование ввода
            calc.reg_formatStr(); // Форматирование операторов от лишних символов
            calc.value = calc.value.replace(reg,''); // Убрать символы в конце
            calc.value = eval(calc.value);
            input.val( calc.value );
        },
        notice: function(){
            // Предварительный просмотр результата. Если форматированный результат верен.
            if( reg_formattedVal.test(calc.value) ){
                noticeVal.text(eval(calc.value));
            }
        }
    };

    btn.on('click', calc.clickToInput);
    input.on('keyup', calc.typeToInput);
}());//CALC.EXE