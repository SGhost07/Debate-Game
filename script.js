document.addEventListener('DOMContentLoaded', () => {
    const debateButton = document.getElementById('debate-button');
    const yunjinChat = document.getElementById('yunjin-chat');
    const ruolanChat = document.getElementById('ruolan-chat');
    const healthBar = document.getElementById('health-bar');
    const defeatMessage = document.getElementById('defeat-message');

    const dialogues = [
        { character: 'ruolan', text: 'I was jealous of my younger sister.' },
        { character: 'yunjin', text: 'She was your younger sister!' },
        { character: 'ruolan', text: 'She has everything in her life! She has talent and a good man that loves her, yet she is still ungrateful!' },
        { character: 'yunjin', text: 'This does not justify your actions towards her! This is wrong!' },
        { character: 'ruolan', text: 'That is obviously mine too. If I can\'t have him, neither can she!' },
        { character: 'yunjin', text: 'There are better solutions to deal with this! You resorted to harming her!' }
    ];

    let currentDialogueIndex = 0;
    let healthPercentage = 100; // Initial health percentage

    const yunjinInteractions = dialogues.filter(d => d.character === 'yunjin').length;
    const healthDecrement = 100 / yunjinInteractions; // Calculate decrement per Yun Jin interaction

    function updateChat() {
        yunjinChat.style.display = 'none';
        ruolanChat.style.display = 'none';

        if (currentDialogueIndex < dialogues.length) {
            const dialogue = dialogues[currentDialogueIndex];
            if (dialogue.character === 'yunjin') {
                yunjinChat.textContent = dialogue.text;
                yunjinChat.style.display = 'block';
                decreaseHealth(healthDecrement); // Decrease health by calculated amount
            } else if (dialogue.character === 'ruolan') {
                ruolanChat.textContent = dialogue.text;
                ruolanChat.style.display = 'block';
            }
        } else {
            changeToEndButton(); // Change to End button when all dialogues are shown
        }
    }

    function decreaseHealth(amount) {
        healthPercentage = Math.max(0, healthPercentage - amount); // Ensure health doesn't go below 0
        setHealth(healthPercentage);
    }

    function setHealth(percentage) {
        healthBar.style.width = percentage + '%';
    }

    function changeToEndButton() {
        debateButton.textContent = 'End'; // Change the button text to "End"
        debateButton.removeEventListener('click', handleDebateClick);
        debateButton.addEventListener('click', showDefeatMessage); // Attach the showDefeatMessage function to the button click event
    }

    function showDefeatMessage() {
        defeatMessage.textContent = "Ruolan has been defeated!";
        defeatMessage.style.display = 'block'; // Show the defeat message
        debateButton.disabled = true; // Disable the debate button to end the interaction
    }

    function handleDebateClick() {
        currentDialogueIndex++;
        updateChat();
    }

    debateButton.addEventListener('click', handleDebateClick);

    // Initialize first dialogue
    updateChat();
});

