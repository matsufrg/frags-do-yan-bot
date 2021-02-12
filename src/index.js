const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
require('dotenv/config');

const client = new Discord.Client({ disableMentions: "everyone" });

client.on('ready', () => {
    db.defaults({ count: 0 })
        .write()
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

client.on("message", async function (message) {

    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const commandBody = message.content.slice(process.env.PREFIX.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    let vitor = message.guild.ownerID;

    if (command == "gado") {

        db.update('count', n => n + 1)
            .write()

        const count = db.get('count')
            .write()

        message.channel.send(`<@${vitor}> O VITOR FOI GADO ${count} VEZES`);
    }

    if (command == "adauto") {
        message.channel.send("", { files: ["./img/adauto.jpeg"] });
    }

    if (command == "beto") {
        message.channel.send("", { files: ["https://centermedical.vteximg.com.br/arquivos/ids/157447-1000-1000/bola-ginastica-supermedy-vermelha-45cm.jpg?v=635441271481930000"] })
    }

    if (command == "commands") {
        message.channel.send(`!beto\n!adauto\n!yan\n!yan add {link}\n!gado`)
    }

    if (command == "yan") {
        const cmd = commandBody.split(" ");
        if (cmd[1] && cmd[1] == "add") {
            db.get('frags').push(cmd[2]).write();

            message.channel.send("Frag adicionado com sucesso! Os moderadores analisarão o frag, e, se estiver errado, as devidas punições serão aplicadas. Obrigado por contribuir");
        } else {
            const frags = shuffle(db.get("frags").value());
            message.channel.send("", { files: [frags[0]] });
        }
    }

    if (command == "augusto") {
        const cmd = commandBody.split(" ");
        if (cmd[1] && cmd[1] == "add") {
            db.get('augusto').push(cmd[2]).write();

            message.channel.send("Imagem adicionada!");
        } else {
            const frags = shuffle(db.get("augusto").value());
            message.channel.send("", { files: [frags[0]] });
        }
    }

});

client.login(process.env.TOKEN);
