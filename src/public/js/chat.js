const socket = io();

socket.on('msgBack', (data) => {
    let msgsFormateados = ''
    data.forEach(message => {
        let div = `
        <div style='border: 1px solid black;'>
        <p> ${message.userName}: ${message.msg}</p>
        </div>
        `
        msgsFormateados = div + msgsFormateados
    });
    const divMsgs = document.getElementById('div-msgs')
    divMsgs.innerHTML = msgsFormateados

})


let user = ''

let productForm = document.getElementById("chat_form");
const chatBox = document.getElementById('mensaje')
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit("msgFront", {
        userName: user,
        msg: chatBox.value
    })
    chatBox.value = ''
})


async function getName() {
    const { value: userName } = await Swal.fire({
        title: 'enter your name',
        input: 'text',
        inputLeable: 'your name',
        inputValue: '',
        showCancelButton: false,
        inputValidator: (value) => {
            if (!value) {
                return 'you need to write something'
            }
        }
    })

    if (userName) {
        user = userName
    }
}

getName()