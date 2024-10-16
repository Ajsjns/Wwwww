import axios from 'axios';
import *as cheerio from 'cheerio';



let handler = async (m, { conn, args, usedPrefix, text, command }) => {

    let lister = [
        "ecole",
        "niveau",
        "section",
        "sujet",
        "cours",
        "pdfdl"
    ];

    if (text == "ecole" || !text) {
        let sections = [
            {
                title: "الإبتدائي",
                rows: [
                    { title: "الأول ابتدائي", id: `.alloschool sujet|category/first-primary` },
                    { title: "الثاني ابتدائي", id: `.alloschool sujet|category/second-primary` },
                    { title: "الثالث ابتدائي", id: `.alloschool sujet|category/third-primary` },
                    { title: "الرابع ابتدائي", id: `.alloschool sujet|category/fourth-primary` },
                    { title: "الخامس ابتدائي", id: `.alloschool sujet|category/fifth-primary` },
                    { title: "السادس ابتدائي", id: `.alloschool sujet|category/sixth-primary` },
                ],
            },
            {
                title: "الإعدادي",
                rows: [
                    { title: "السنة الأولى إعدادي", id: `.alloschool sujet|category/1st-year` },
                    { title: "السنة الثانية إعدادي", id: `.alloschool sujet|category/2nd-year` },
                    { title: "السنة الثالثة إعدادي", id: `.alloschool sujet|category/3rd-year` },
                ],
            },
            {
                title: "الثانوي",
                rows: [
                    { title: "الجذع المشترك", id: `.alloschool niveau|category/common-core?hl=ar` },
                    { title: "الجذع المشترك – خيار فرنسية", id: `.alloschool niveau|category/common-core?hl=fr` },
                    { title: "الأولى باكالوريا", id: `.alloschool niveau|category/1st-degree?hl=ar` },
                    { title: "الأولى باكالوريا – خيار فرنسية", id: `.alloschool niveau|category/1st-degree?hl=fr` },
                    { title: "الثانية باكالوريا", id: `.alloschool niveau|category/2nd-degree?hl=ar` },
                    { title: "الثانية باكالوريا – خيار فرنسية", id: `.alloschool niveau|category/2nd-degree?hl=fr` },
                ],
            }
        ];

        let listMessage = {
            text: "اختر المستوى الذي تريد تحميل مواده:",
            footer: 'AlloSchool',
            title: 'قائمة المدارس',
            buttonText: 'إختر المدرسة',
            sections
        };

       // await conn.sendMessage(m.chat, listMessage, { quoted: m });
       await conn.sendList(
            m.chat,
            '≡ *ألو سكول* 🏫',
            'حدد المستوى الدراسي',
            'انقر لتحديد',
            'https://i.ibb.co/4KQFFsv/laptop.jpg',
            sections,
            m
        );
        return;
    }

    let [feature, inputs] = text.split("|");

    if (!lister.includes(feature)) return m.reply(`*هذا الامر خاص بتحميل الدروس والتمارين والامتحانات لكل المستويات* 

لتبدأ التنزيل ، قم بكتابة :
\`\`\`.alloschool ecole\`\`\`

ثم اختر الروابط التي تريد`);

    if (lister.includes(feature)) {
        if (feature == "niveau") {
            let res = await fetchCategories(inputs);
            let sections = [
                {
                    title: "اختر القسم",
                    rows: res.map((item, index) => ({
                        title: item.category,
                        id: `.alloschool sujet|${item.link.replace("https://www.alloschool.com/", "")}`
                    }))
                }
            ];
            let listMessage = {
                text: "اختر القسم:",
                footer: 'AlloSchool',
                title: 'قائمة الأقسام',
                buttonText: 'إختر القسم',
                sections
            };
           // await conn.sendMessage(m.chat, listMessage, { quoted: m });
           await conn.sendList(
            m.chat,
            '≡ *ألو سكول* 🏫',
            //`\n Results for: *${inputs}*`,
            `\nاختر تخصصك\n`,
            'انقر لتحديد',
          //  data[0].icon,
            null,
            sections,
            m
        );
        }

        if (feature == "sujet") {
            let res = await fetchCourses(inputs + '?hl=ar');
            let sections = [
                {
                    title: "اختر الدرس",
                    rows: res.map((item, index) => ({
                        title: item.title,
                        id: `.alloschool cours|${item.link.replace("https://www.alloschool.com/", "")}`
                    }))
                }
            ];
            let listMessage = {
                text: "اختر الدرس:",
                footer: 'AlloSchool',
                title: 'قائمة الدروس',
                buttonText: 'إختر الدرس',
                sections
            };
           // await conn.sendMessage(m.chat, listMessage, { quoted: m });
           await conn.sendList(
            m.chat,
            '≡ *ألو سكول* 🏫',
            `\nقائمة المواد\n`,
            'انقر لتحديد',
          //  data[0].icon,
            null,
            sections,
            m
        );
        }

        if (feature == "cours") {
            let data = await fetchPDF(inputs, 999);
            let sections = [
                {
                    title: "اختر الدرس/التمرين",
                    rows: data.map((item, index) => ({
                        title: `${item.pdfTitle}`,
                        id: `.alloschool pdfdl|${item.pdfLink.replace("https://www.alloschool.com/", "")}`
                    }))
                }
            ];
            let listMessage = {
                text: "اختر ملف PDF لتحميله:",
                footer: 'AlloSchool',
                title: 'قائمة ملفات PDF',
                buttonText: 'إختر الملف',
                sections
            };
            const dtlist = await fetchDoros(inputs)
            //await conn.sendMessage(m.chat, listMessage, { quoted: m });
           await conn.sendList(
            m.chat,
            '≡ *ألو سكول* 🏫',
            `\nقائمة الدرس/التمرين\n`,
            'انقر لتحديد',
          //  data[0].icon,
            null,
               dtlist,
            m
        );
        }

        if (feature == "pdfdl") {
            let { title, pdfLink, ytLink } = await searchPDFLinkdownload(inputs);
          if (!pdfLink) {
              // ( -_-)
              if (ytLink) {
                  await conn.sendButton2(
                m.chat,
                'تم العثور على الفيديو',
                'انقر أدناه لتنزيل الفيديو',
                '',
                [['تنزيل', '.ytmp4 '+ ytLink]],
                null,
                null,
                m
            );
                  }
              return 
          }
            conn.sendFile(m.chat, pdfLink, title + '.pdf', "DONE", m, null, {
                mimetype: 'application/pdf',
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            });
        }
    }
};

handler.help = ["alloschool"];
handler.tags = ["moutamadris"];
handler.command = /^(alloschool)$/i;

export default handler;

async function fetchCategories(url) {
    try {
        const response = await axios.get("https://www.alloschool.com/"+url);
        const $ = cheerio.load(response.data);

        let result = [];
        const anchors = $('a.t[title][href^="https://www.alloschool.com/category/"]');

        anchors.each((index, element) => {
            result.push({
                category: $(element).attr('title'),
                link: $(element).attr('href')
            });
        });

        return result;
    } catch (error) {
        return 'Error fetching data: ' + error.message;
    }
}

async function fetchCourses(url) {
    try {
        const response = await axios.get("https://www.alloschool.com/"+url);
        const $ = cheerio.load(response.data);

        let result = [];
        const anchors = $('a.t[title][href^="https://www.alloschool.com/course/"]');

        anchors.each((index, element) => {
            result.push({
                title: $(element).attr('title'),
                link: $(element).attr('href')
            });
        });

        return result;
    } catch (error) {
        return 'Error fetching data: ' + error.message;
    }
}

async function fetchPDF(url, maxResults) {
    try {
        const response = await axios.get("https://www.alloschool.com/"+url);
        const $ = cheerio.load(response.data);

        let result = [];
        const listItems = $('li.element[style="display:none;"]');

        listItems.each((index, element) => {
            if (index >= maxResults) {
                return false;
            }

            const pdfLinkElement = $(element).find('a.er');
            const pdfLink = pdfLinkElement.attr('href');
            const pdfTitle = pdfLinkElement.text().trim();

            result.push({ pdfTitle, pdfLink });
        });

        return result;
    } catch (error) {
        return 'Error fetching data: ' + error.message;
    }
}

async function searchPDFLinkdownload(url) {
    try {
        const response = await axios.get("https://www.alloschool.com/"+url);
        const $ = cheerio.load(response.data);

        const title = $('title').text().trim();
        const pdfLink = $('a.btn.btn-lg.btn-primary').attr('href');
        const ytLink = $('iframe').attr('src');

        return { title, pdfLink, ytLink };
    } catch (error) {
        return 'Error fetching data: ' + error.message;
    }
}



async function fetchDoros(url) {
    try {
        const { data } = await axios.get("https://www.alloschool.com/"+url);

        const $ = cheerio.load(data);

        let result = [];

        $('.t-b ul li.accordeon-head').each(function () {
            let section = {};
            section.title = $(this).find('strong').text().trim();
            section.rows = [];

            $(this).nextUntil('.accordeon-head').find('a.er').each(function () {
                const row = {
                    title: $(this).text().trim(),
                    id: ".alloschool pdfdl|" + $(this).attr('href').replace("https://www.alloschool.com/", "")
                };
                section.rows.push(row);
            });

            result.push(section);
        });

        return result;
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
        }

async function getBuffer(url, options) {
  try {
    options ? options : {};
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });

    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};