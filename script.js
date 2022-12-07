let countQuestion = document.querySelector('.countQuestion')

// localStorage.clear()
if (JSON.parse(localStorage.getItem("quest"))!=null){
    countQuestion.innerHTML += JSON.parse(localStorage.getItem("quest"))
}

function number() {
    let checkInp = []
    let numCount = 0

    for (let r = 1; r <= countQuestion.childElementCount; r++) {
        let ul = document.querySelector('.question' + r)

        for (let i = 0; i < ul.childElementCount; i++) {
            if (ul.children[i].children[0].children[0].hasAttribute('data-true')) {
                numCount++
            }
            if (ul.children[i].children[0].children[0].checked) {
                checkInp.push(ul.children[i].children[0].children[0])
            }
        }
    }

    let t = 0
    let f = 0

    for (let i = 0; i < checkInp.length; i++) {
        if (checkInp[i].hasAttribute('data-true')) {
            t++
        } else {
            f++
        }
    }

    let msg = "Правільних відповідей : " + t + " ( " + (100 / numCount) * t + "% )\n" + "Невірних відповідей : " + f + "\n" + "Ви не вибрали відповідь : " + (numCount - t - f)
    alert(msg)
}

let radioQuestion = document.querySelector(".radioQuestion")

function createQues() {
    let createQuestion = document.createElement("div")
    createQuestion.className = "createQuestion"
    createQuestion.innerHTML = '<h4>Введіть питання:</h4><input type="text"><br><ul class="createQuestionReply"><li><h4>Введіть варіант відповіді</h4><div class="createQuestionRadio"><input type="text"><button onclick="questionReply(1)">Правильна відповідь</button></div><button onclick="questionConfirm(1)">Підтвердити варіант відповіді</button></li></ul><button onclick="questionCreateOption()">Створити варіант відповіді</button><button onclick="addCountQuestion()">Зберегти питання</button>'

    radioQuestion.append(createQuestion)
}
let n = 2

function questionCreateOption() {
    let createQuestionReply = document.querySelector('.createQuestionReply')
    createQuestionReply.innerHTML += '<li><h4>Введіть варіант відповіді</h4><div class="createQuestionRadio"><input type="text"><button onclick="questionReply(' + n + ')">Правильна відповідь</button></div><button onclick="questionConfirm(' + n + ')">Підтвердити варіант відповіді</button></li>'
    n++
}

function questionReply(num) {
    let createQuestionReply = document.querySelector('.createQuestionReply')
    createQuestionReply.children[num - 1].children[1].children[0].setAttribute("data-true", true)
}

let reply = []

function questionConfirm(num) {
    let createQuestionReply = document.querySelector('.createQuestionReply')
    let a = createQuestionReply.children[num - 1].children[1].children[0].value
    reply.push(createQuestionReply.children[num - 1].children[1].children[0])
    reply.push(a)

    createQuestionReply.children[num - 1].textContent = ''
    createQuestionReply.children[num - 1].innerHTML = '<h4>' + a + '</h4>'
}

function addCountQuestion() {
    let createQuestion = document.querySelector('.createQuestion')

    countQuestion.innerHTML += '<li><h4>' + createQuestion.children[1].value + '</h4><ul class="question' + (countQuestion.children.length + 1) + '"></ul></li>'
    // radioQuestion.children[4].textContent = ''
    createQuestion.remove()

    let questionAdd = document.querySelector('.question' + (countQuestion.children.length))

    for (let i = 0; i < reply.length; i += 2) {
        questionAdd.innerHTML += '<li><label>' + reply[i].outerHTML + reply[i + 1] + '</label></li>'
    }
    reply =[]

    for (let i = 0; i < questionAdd.children.length; i++) {
        questionAdd.children[i].children[0].children[0].setAttribute("type", "radio")
        questionAdd.children[i].children[0].children[0].setAttribute("name", "question" + (countQuestion.children.length) * 11)
    }
    clickAdd()
}

function clickAdd() {
    let addLast
    if (JSON.parse(localStorage.getItem("quest"))!=null){
        addLast = JSON.parse(localStorage.getItem("quest"))
    }else{
        addLast = ``
    }
    let add = `
    <li>
        <h4>` + countQuestion.children[countQuestion.children.length-1].children[0].textContent + `</h4>
        <ul class="question` + countQuestion.children.length + `">
            ${addList()}
        </ul>
    </li>`
    addLast+=add
    localStorage.setItem("quest", JSON.stringify(addLast))
}

function addList() {
    let vvod = ``
    for (let i = 0; i < countQuestion.children[countQuestion.children.length-1].children[1].childElementCount; i++) {
        vvod += `
        <li>
            <label>${countQuestion.children[countQuestion.children.length-1].children[1].children[i].children[0].children[0].outerHTML}${countQuestion.children[countQuestion.children.length-1].children[1].children[i].children[0].textContent}</label>
        </li>
        `
    }
    return vvod
}


// countQuestion.children[0].children[1].children[0].children[0].textContent

// let m = [[
//     "JavaScript це теж саме, що i Java?",
//     '<input type="radio" name="question11" data-true>',
//     'Ys'
// ]]

// let k = []

// for (let i = 0; i<m.length; i++){
//     for (let j = 0; j<m[i].length; j++){
//         k.push({
//             l: m[i][j]
//         })
//     }
// }