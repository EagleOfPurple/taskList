(function () {
    'use strict';
    
    let taskContainer = document.querySelector('ul');
    let newTaskBtn = document.querySelector('button');
    let input = document.getElementById('text-input');
    let textarea = document.getElementById('text-det');

    newTaskBtn.addEventListener('click', addNewTask);
    taskContainer.addEventListener('click', hendleEvent);
    taskContainer.addEventListener('keydown', function (ev) {
        if (ev.code === "Enter") {
            hendleEvent(ev);
        }
    })

    function hendleEvent(ev) {
        let targetTag = ev.target.tagName;
        let taskPoint = ev.target.closest('li');

        switch (targetTag) {
            case 'SPAN':
            case 'DIV':
                deleteTask(taskPoint);
                break;
            case 'LABEL':
                markAsDone(taskPoint);
                break;
            default:
                break;
        }

        function deleteTask(target) {
            target.classList.add('task-point-animation');
            setTimeout(() => {
                taskContainer.removeChild(target)
            }, 200);
        }

        function markAsDone(target) {
            let taskCheckbox = target.querySelector('label');

            target.classList.toggle('task-done');
            taskCheckbox.classList.toggle('task-done__text');
        }
    }

    function addNewTask() {
        let errowMes = document.querySelector('.errow-mes');
        let task = input.value;
        let taskDet = textarea.value;

        if (!task.length) {
            input.classList.add('invalid-form');
            errowMes.style.display = 'inline-block';
            return;
        }

        if (input.classList.contains('invalid-form')) {
            input.classList.remove('invalid-form');
            errowMes.style.display = 'none';
        }

        let newLi = document.createElement('li');
        newLi.classList.add('task-point');
        newLi.innerHTML = '<label class="task-point__text"><input type="checkbox" class="task-checkbox"></label><div class="task-point__close" aria-label="кнопка удаления записи"><span class="task-point__close-item"></span><span class="task-point__close-item"></span></div>';

        let newLiLabel = newLi.querySelector('label');
        let newLiClose = newLi.querySelector('div');
        newLiLabel.tabIndex = taskContainer.children.length * 2 + 1;
        newLiClose.tabIndex = taskContainer.children.length * 2 + 2;
        newLiLabel.append(task);

        if (taskDet) {
            newLiLabel.insertAdjacentHTML('afterend', '<p class="task-point__det"></p>');
            let taskDetText = newLi.querySelector('p');
            taskDetText.textContent = taskDet;
        }

        taskContainer.append(newLi);
        newLi.scrollIntoView({
            behavior: "smooth"
        });

        input.value = '';
        textarea.value = '';
    }
})();
