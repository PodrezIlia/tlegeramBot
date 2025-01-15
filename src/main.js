//npm run (команда)- для того что бы исользовать команду
const { Telegraf } = require("telegraf")
require("dotenv").config()

const basUrl = "https://v6.exchangerate-api.com/v6/"

const bot = new Telegraf(process.env.token)

//https://v6.exchangerate-api.com/v6/54fcbbff544064d1ba16d01f/latest/USD
bot.start((msg) => {
    msg.reply("welcom to my bot")
})

bot.help((msg) => {
    msg.reply("/start - welcom massage\n/help - list of the comands")
})


bot.command("hi", (ctx) => {
    ctx.reply(`${ctx.message.text}`)
})


bot.command("exch", async (ctx) =>{
    const [_, sum, from, to] = ctx.message.text.split(" ")
    if (!sum || !from || !to){
        ctx.reply("введіть правельне повідомлення у форматі:")
        ctx.reply("/exch 100 USD UAH")
    }
    else {
        const respons = await fetch(`${basUrl}${process.env.secretkey}/latest/${from}`)
        const curs = await respons.json()
        console.log(curs.conversion_rates)

    

        ctx.reply(sum * curs.conversion_rates[to])
    }
    
    
})


bot.on("message", (ctx) => {
    ctx.reply(ctx.botInfo)
})


bot.on("sticker", (ctx) => {
    ctx.reply("Thanks you!")
})


bot.launch(() => {
    console.log("Bot starts")
})