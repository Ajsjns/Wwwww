import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

/*
Setting
*/
global.setting = {
 clearSesi: false, // جلسات تنظيف القمامة
 clearTmp: true, // منظف القمامة tmp
 addReply: true, // إنشاء مع الصورة المصغرة في الرسالة
 idgc: '' // معرف gc للانضمام فقط
 }

global.info = {
 nomerbot : '994409631263',
 pairingNumber : '994409631263',
 figlet: 'Aero', // buat tampilan konsole start
 nomorwa : '994409631263',
 nameown : 'Hardy',
 nomerown : '212660131536',
 packname : 'sticker by ',
 author : 'A E R O - M D',
 namebot : 'Aero - Bot - MD',
 wm : 'Copyright © 2024 • Aero - MD.',
 stickpack : 'Whatsapp',
 stickauth : 'Bot - MD',
 jid: '@s.whatsapp.net'
}

// Thumbnail 
global.media = {
 ppKosong : 'https://i.ibb.co/3Fh9V6p/avatar-contact.png',
 didyou : 'https://telegra.ph/file/fdc1a8b08fe63520f4339.jpg',
 rulesBot : 'https://telegra.ph/file/afcfa712bd09f4fcf027a.jpg',
 thumbnail : 'https://i.ibb.co/StsCwgd/20241015-234507.jpg',
  
 //thumbnail : fs.readFileSync('./src/img/thumbnail.jpg'),
 thumb : 'https://i.ibb.co/StsCwgd/20241015-234507.jpg',
 logo : 'https://i.ibb.co/4ZdCbHh/20241016-163812.webp',
 //logo : fs.readFileSync('./src/img/logo.jpg'),
 unReg : 'https://telegra.ph/file/ef02d1fdd59082d05f08d.jpg',
 registrasi : 'https://telegra.ph/file/0169f000c9ddc7c3315ff.jpg',
 confess : 'https://telegra.ph/file/03cabea082a122abfa5be.jpg',
 access : 'https://telegra.ph/file/5c35d4a180b9074a9f11b.jpg',
 tqto : 'https://telegra.ph/file/221aba241e6ededad0fd5.jpg',
 spotify : 'https://telegra.ph/file/d888041549c7444f1212b.jpg',
 weather : 'https://telegra.ph/file/5b35ba4babe5e31595516.jpg',
 gempaUrl : 'https://telegra.ph/file/03e70dd45a9dc628d84c9.jpg',
 akses : 'https://telegra.ph/file/6c7b9ffbdfb0096e1db3e.jpg',
 wel : 'https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4',
 good : 'https://telegra.ph/file/1c05b8c019fa525567d01.mp4',
 sound: 'https://pomf2.lain.la/f/ymca9u8.opus'
}
// Sosmed
global.url = {
 sig: 'https://instagram.com/hg_hardy',
 sgh:  'https://github.com/GX004',
 sgc: 'https://chat.whatsapp.com/HOq3Er0tqddCnvf5aaPaGh'
}
// Donate
global.payment = {
 psaweria: '',
 ptrakterr: '-',
 pdana: '',
 paypal: 'https://paypal.me/tzaym1'
}
// Info Wait
global.msg = {
 wait: '⏱️ *يرجى الانتظار قليلا...*!',
 eror: '🤖 *Information Bot*\n\> نأسف للإزعاج في استخدام *Aero Bot*. حدث خطأ في النظام أثناء تنفيذ الأمر.'
}
 
// api_id web suntik
global.apiId = {
 smm: '4524',
 lapak: '300672'
}

// Apikey
global.api = {
 user: '-', // api_id antinsfw 
 screet: '-', // api_screet nsfw klo abis ganti sendiri 
 uptime: '-',
 xyro: '-',
 lol: 'GataDios',
 smm: '-',
 lapak: '-',
 prodia: '-',
 bing: '1-HLkal9xPklSXn8H_NYBhugb9UnCJKJEzQp4Rk_PxP4xxBCqtm_Os-93cXF8mtFeqde_ZGjnx2C1MM4PCS0gH8mzdX5tJ5aoaDC4G0VruZATWvvOQlHs2UBDNID5PR4MtskWzX69idiBidGDqVwfNBNZYgqb3cgqkLbyEeZnWHxxrhO3es3O8YOI5wd8Y0a31_OiLKTAzwS1ba-wvcBP9khAHrUkuQpzXuoybpwfwpQ'

}
global.APIs = {
    xyro: "https://api.xyroinee.xyz",
    nightTeam: "https://api.tioxy.my.id",
    lol: "https://api.lolhumaan.xyz",
    smm: "https://smmnusantara.id",
    lapak: "https://panel.lapaksosmed.com"
}

//Apikey
global.APIKeys = {
    "https://api.xyroinee.xyz": "vRFLiyLPWu",
    "https://api.lolhumaan.xyz": "GataDios"
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
