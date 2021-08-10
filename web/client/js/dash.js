const $post = async (endpoint, payload) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data
    } catch (error) {
        return null
    }
}

const $get = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data
    } catch (error) {
        return null
    }
}


function generate_command_item(twitch, minecraft) {
    console.log(minecraft);
    minecraft = minecraft.join('<span class="text-red-500 mx-1 pointer-events-none">|</span>')
    return `<div class="w-full mb-2 bg-gray-300 dark:bg-gray-700 dark:text-white gap-4 flex rounded pl-2 cursor-pointer" data-target="${twitch}" data-command="edit">
<span class="font-bold py-2 min-w-[120px] pointer-events-none">${twitch}</span>
<p class="py-2 pointer-events-none">${minecraft}</p>
<div class="ml-auto flex pointer-events-none">
    <div class="p-2 bg-red-500 dark:bg-red-700 hover:bg-red-600 font-bold rounded-tr rounded-br pointer-events-auto" data-target="${twitch}" data-command="delete">Delete</div>
</div>
</div>`
}

const commandlist = document.getElementById('commandlist')

async function refresh_ui() {
    const commands = await $get('/list')
    const twitchnames = Object.keys(commands)
    commandlist.innerHTML = ""
    for (let i = 0; i < twitchnames.length; i++) {
        const cmd = twitchnames[i]
        commandlist.innerHTML += generate_command_item(cmd, commands[cmd].commands)
    }
}

async function clickhandler(e) {
    const target = e.target.dataset['target']
    const command = e.target.dataset['command']
    console.log(target, command);
}

commandlist.addEventListener('click', clickhandler)

refresh_ui()