const config = {
    title: "What type of campaign are you currently planning?",
    question: "Share more details with us in the text areas below.",
    submit: "Submit",
    thanks: "Thank you for your submission, click the “Next Video” button to proceed now.",
    celebrationImg_on: true,
    celebration_image: "https://a.storyblok.com/f/112136/205x150/12867bb205/sporting-hero.png",
    placeholder_text: [
        "Type your Goal here...",
        "Type your audience here...",
        "Type your Objective here...",
        "Type possible tactics here...",
        "Type your metrics here"
    ],
    image_on: true,
    image: "https://a.storyblok.com/f/112136/373x445/175f800354/lucia-8.png",
    selection_title: "Select your campaign type:",
    selection_options: [
        "Awareness",
        "Enablement",
        "Demand"
    ]
}

const title = document.getElementById('title');
const question = document.getElementById('question');
const submit = document.getElementById('submit');
const thanks = document.getElementById('thankYou');
const textArea = document.getElementById('textArea');
const celebration = document.getElementById('celebrationContainer');
const celebrationImg = document.getElementById('celebration');
const image = document.getElementById('image');
const headerContainer = document.getElementById('headerContainer');
const selectionArea = document.getElementById('selectionArea');
const textFields = document.getElementById('textFields');

title.textContent = config.title
question.textContent = config.question
submit.textContent = config.submit
thanks.textContent = config.thanks


let j = 0;
config.placeholder_text.forEach(element => {
    const newTextArea = document.createElement('textarea');
    newTextArea.className = 'textArea';
    newTextArea.placeholder = config.placeholder_text[j]
    textFields.appendChild(newTextArea)
    j++
});

if (config.celebrationImg_on === true) {
    celebrationImg.src = config.celebration_image
} else {
    celebrationImg.style.display = 'none';
}

if (config.image_on === true) {
    image.src = config.image
} else {
    image.style.display = "none";
}

const selectionTitleContainer = document.getElementById('selectionTitleContainer')
const selectorTitle = document.createElement("p")
selectorTitle.textContent = config.selection_title;
selectionTitleContainer.appendChild(selectorTitle)

const checkPath = document.createElementNS('http://www.w3.org/2000/svg', "path")
checkPath.setAttributeNS(null, "d", "M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z")

let i = 0;
config.selection_options.forEach(element => {
    const selectionSection = document.createElement("div");
    selectionSection.className = 'selectionSection';

    const selectionText = document.createElement("p");
    selectionText.textContent = config.selection_options[i];
    selectionText.style.marginLeft = '0.2rem';
    selectionArea.appendChild(selectionSection);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttributeNS(null, "fill", "currentColor");
    svg.setAttributeNS(null, "height", "16");
    svg.setAttributeNS(null, "width", "16");

    const boxPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
    boxPath.setAttributeNS(null, "d", "M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z");

    selectionSection.appendChild(svg);
    svg.appendChild(boxPath);
    selectionSection.appendChild(selectionText);
    i++;

    selectionSection.addEventListener('click', event => {
        if (event) {
            svg.appendChild(checkPath)
        } else {
            svg.removeChild(checkPath)
        }
    })

});

const textAreas = Array.from(document.querySelectorAll('.textArea'))
console.log(textAreas)

const finished = () => {

    let textValues = []

    textAreas.forEach(element => {
        textValues.push(element.value.length)
    });
    console.log(textValues)

    const isAboveThresHold = (value) => {
        return value > 2
    }

    if (textValues.every(isAboveThresHold)) {

        textAreas.forEach(element => {
            element.style.display = 'none'
        });

        celebration.style.display = 'flex';
        celebration.style.marginTop = '2rem';
        submit.style.display = 'none';
        headerContainer.style.opacity = '0';
        headerContainer.style.pointerEvents = 'none';
        selectionArea.style.display = 'none'
        selectionTitleContainer.style.display = 'none'
    } else {
        submit.textContent = 'Please add more detail to your answers.'
        setTimeout(() => {
            submit.textContent = config.submit
        }, 2500);
    }

}

submit.addEventListener('click', finished)